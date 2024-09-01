<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required, numeric, minValue } from '@vuelidate/validators';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import { computed, reactive, ref } from 'vue';

import LineChart from '@/components/LineChart.vue';
import { Hormones, HormoneNames } from '@/enums/Hormones';

const checkups = reactive({
  [Hormones.LH]: {
    name: HormoneNames[Hormones.LH],
    target: 0,
    initial: 0,
    monthlyReadings: {} as Record<string, number>
  },
  [Hormones.TESTOSTERONE]: {
    name: HormoneNames[Hormones.TESTOSTERONE],
    target: 0,
    initial: 0,
    monthlyReadings: {} as Record<string, number>
  },
  [Hormones.ESTRADIOL]: {
    name: HormoneNames[Hormones.ESTRADIOL],
    target: 0,
    initial: 0,
    monthlyReadings: {} as Record<string, number>
  },
  [Hormones.PROLACTIN]: {
    name: HormoneNames[Hormones.PROLACTIN],
    target: 0,
    initial: 0,
    monthlyReadings: {} as Record<string, number>
  },
  [Hormones.SHBG]: {
    name: HormoneNames[Hormones.SHBG],
    target: 0,
    initial: 0,
    monthlyReadings: {} as Record<string, number>
  }
});

/*
const newMonthlyValue = reactive<Record<Hormones, number | null>>({
  [Hormones.LH]: null,
  [Hormones.TESTOSTERONE]: null,
  [Hormones.ESTRADIOL]: null,
  [Hormones.PROLACTIN]: null,
  [Hormones.SHBG]: null
});

const selectedDate = reactive<Record<Hormones, string>>({
  [Hormones.LH]: '',
  [Hormones.TESTOSTERONE]: '',
  [Hormones.ESTRADIOL]: '',
  [Hormones.PROLACTIN]: '',
  [Hormones.SHBG]: ''
});
*/
const globalDate = ref('');
const newMonthlyValues = reactive({});
const formError = ref(false);

// Настройка Vuelidate для валидации
const rules = {
  globalDate: { required },
  newMonthlyValues: {
    [Hormones.LH]: { required, numeric, minValue: minValue(0) },
    [Hormones.TESTOSTERONE]: { required, numeric, minValue: minValue(0) },
    [Hormones.ESTRADIOL]: { required, numeric, minValue: minValue(0) },
    [Hormones.PROLACTIN]: { required, numeric, minValue: minValue(0) },
    [Hormones.SHBG]: { required, numeric, minValue: minValue(0) }
  }
};

const v$ = useVuelidate(rules, { globalDate, newMonthlyValues });

function submitMonthlyValues() {
  v$.value.$touch();

  if (v$.value.$invalid || !globalDate.value) {
    formError.value = true;
    return;
  }

  formError.value = false;
  for (const hormone in newMonthlyValues) {
    checkups[hormone].monthlyReadings[globalDate.value] = newMonthlyValues[hormone];
  }

  // Сброс значений после добавления
  for (const hormone in newMonthlyValues) {
    newMonthlyValues[hormone] = null;
  }
  v$.value.$reset();
  globalDate.value = '';
}

function generateTableData(checkups) {
  const tableData = [];
  let maxMonths = 0;

  // Определяем максимальное количество месячных значений
  for (const hormoneKey of Object.keys(checkups)) {
    const monthlyReadings = checkups[hormoneKey].monthlyReadings || {};
    const numMonths = Object.keys(monthlyReadings).length;
    if (numMonths > maxMonths) {
      maxMonths = numMonths;
    }
  }

  // Генерация данных для таблицы
  for (const hormoneKey of Object.keys(checkups)) {
    const hormone = checkups[hormoneKey];
    const row = {
      name: hormone.name || 'N/A',
      target: hormone.target || 0,
      initial: hormone.initial || 0
    };

    const monthlyReadings = hormone.monthlyReadings || {};
    const months = Object.keys(monthlyReadings);

    // Заполняем имеющиеся месячные значения
    months.forEach((month, index) => {
      row[`month${index + 1}`] = monthlyReadings[month];
    });

    // Добавляем недостающие месячные значения с нулевыми значениями
    for (let i = months.length; i < maxMonths; i++) {
      row[`month${i + 1}`] = 0;
    }

    tableData.push(row);
  }

  return tableData;
}
const maxMonths = computed(() => {
  return Math.max(
    ...tableData.value.map(
      (row) => Object.keys(row).filter((key) => key.startsWith('month')).length
    )
  );
});
const tableData = computed(() => {
  return generateTableData(checkups);
});
</script>

<template>
  <div class="bg-white mb-6 p-6 rounded-lg border border-gray-200">
    <h3 class="text-md font-medium mb-3">Целевые и начальные значения</h3>
    <div v-for="hormone in Object.keys(checkups)" :key="hormone" class="mb-4">
      <label :for="hormone" class="block text-sm font-medium text-gray-700 mb-1">
        {{ checkups[hormone].name }}
      </label>

      <div class="flex space-x-4">
        <!-- Поле ввода целевого значения -->
        <input
          :id="`${hormone}-target`"
          v-model="checkups[hormone].target"
          type="number"
          class="block w-1/2 p-2 border border-gray-300 rounded-md"
          placeholder="Введите целевое значение"
        />

        <!-- Поле ввода начального значения -->
        <input
          :id="`${hormone}-initial`"
          v-model="checkups[hormone].initial"
          type="number"
          class="block w-1/2 p-2 border border-gray-300 rounded-md"
          placeholder="Введите начальное значение"
        />
      </div>
    </div>
  </div>
  <div class="bg-white mb-6 p-6 rounded-lg border border-gray-200">
    <h3 class="text-md font-medium mb-3">Ежемесячные значения</h3>

    <div class="flex space-x-4 items-center mb-4">
      <label class="block text-sm font-medium text-gray-700"> Дата сдачи анализов: </label>
      <DatePicker
        id="global-monthly-date"
        v-model="globalDate"
        date-format="yy-mm-dd"
        placeholder="Дата"
        :invalid="v$.globalDate.$error"
      />
    </div>

    <div v-for="hormone in Object.keys(checkups)" :key="hormone" class="mb-4">
      <label :for="hormone" class="block text-sm font-medium text-gray-700">
        {{ checkups[hormone].name }} (Значение)
      </label>
      <InputNumber
        :id="hormone"
        v-model="newMonthlyValues[hormone]"
        class="w-full"
        :invalid="v$.newMonthlyValues[hormone].$error"
      />
      <small v-if="v$.newMonthlyValues[hormone].$error" class="text-red-500">
        Значение должно быть числом и больше или равно 0.</small
      >
    </div>
    <Button label="Добавить" @click="submitMonthlyValues"></Button>
    <!--    <button class="mt-4 block p-2 bg-blue-500 text-white rounded-md" @click="submitMonthlyValues">
      Добавить
    </button>-->
    <div v-if="formError" class="text-red-500 text-sm mt-2">
      Пожалуйста, заполните все значения и укажите дату.
    </div>
  </div>
  <div class="bg-white mb-6 p-6 rounded-lg border border-gray-200">
    <DataTable :value="tableData" table-style="min-width: 50rem">
      <Column field="name" header="Название"></Column>
      <Column field="target" header="Цель"></Column>
      <Column field="initial" header="Изначально"></Column>
      <Column
        v-for="(month, index) in maxMonths"
        :key="index"
        :field="`month${index + 1}`"
        :header="`Месяц ${index + 1}`"
      ></Column>
      <!-- остальные месяца -->
    </DataTable>
  </div>
  <div class="bg-white mb-6 p-6 rounded-lg border border-gray-200">
    <div class="grid grid-cols-2 gap-4">
      <LineChart
        :checkups="checkups"
        hormone-a="LH"
        hormone-b="TESTOSTERONE"
        hormone-a-label="LH"
        hormone-b-label="TESTOSTERONE"
      />
      <!--      <LineChart
        :checkups="checkups"
        hormone-a="ESTRADIOL"
        hormone-b="PROLACTIN"
        hormone-a-label="ESTRADIOL"
        hormone-b-label="PROLACTIN"
      />-->
    </div>
  </div>
</template>
