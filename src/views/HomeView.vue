<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import { computed, reactive, ref } from 'vue';

import ScheduleView from '@/components/ScheduleView.vue';
import { Dosage, DosageOptions } from '@/enums/Dosage';
import { Frequency, FrequencyOptions } from '@/enums/Frequency';
import { MedicationDescriptions, MedicationNames } from '@/enums/MedicationNames';

const visible = ref(false);

const schedule = reactive({
  startDate: '2024-08-28',
  endDate: '2024-09-28',
  medications: {
    [MedicationNames.CLOSTILBEGIT]: {
      dosage: Dosage.FULL,
      frequency: Frequency.DAILY
    },
    [MedicationNames.ANASTROZOLE]: {
      dosage: Dosage.FULL,
      frequency: Frequency.DAILY
    },
    [MedicationNames.DOSTINEX]: {
      dosage: Dosage.FULL,
      frequency: Frequency.DAILY
    }
  }
});

function generateTableData() {
  const startDate = dayjs(schedule.startDate);
  const endDate = dayjs(schedule.endDate);
  const weeks = [];

  let currentWeek = [];
  let currentDate = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    const dayOfWeek = currentDate.format('dd'); // 'Пн', 'Вт', и т.д.
    const dayDate = currentDate.format('D');

    // Получаем данные о медикаментах для текущего дня
    const medicationsForDay = Object.entries(schedule.medications).map(
      ([medicationName, { dosage, frequency }]) => {
        const doseDay = isDoseDay(startDate, currentDate, frequency);
        return {
          name: MedicationDescriptions[medicationName as MedicationNames],
          weekday: dayOfWeek,
          date: dayDate,
          dosage: doseDay ? getDosageString(dosage) : '-'
        };
      }
    );

    currentWeek.push({
      medications: medicationsForDay
    });

    if (currentWeek.length === 7 || currentDate.isSame(endDate, 'day')) {
      weeks.push({ weekDays: currentWeek });
      currentWeek = [];
    }

    currentDate = currentDate.add(1, 'day');
  }

  return weeks;
}

const tableData = computed(() => {
  return generateTableData();
});

function isDoseDay(startDate, currentDate, frequency: Frequency) {
  const dayDifference = currentDate.diff(startDate, 'day');
  switch (frequency) {
    case Frequency.DAILY:
      return true;
    case Frequency.EVERY_OTHER_DAY:
      return dayDifference % 2 === 0;
    case Frequency.EVERY_THREE_DAYS:
      return dayDifference % 3 === 0;
    case Frequency.WEEKLY:
      return dayDifference % 7 === 0;
    case Frequency.EVERY_TEN_DAYS:
      return dayDifference % 10 === 0;
    case Frequency.EVERY_TWO_WEEKS:
      return dayDifference % 14 === 0;
    default:
      return false;
  }
}

function getDosageString(dosage: Dosage) {
  switch (dosage) {
    case Dosage.QUARTER:
      return '1/4';
    case Dosage.HALF:
      return '1/2';
    case Dosage.TWO_THIRDS:
      return '2/3';
    case Dosage.FULL:
      return '1';
    default:
      return '-';
  }
}
</script>

<template>
  <main>
    <div class="bg-white p-6 rounded-lg border border-gray-200">
      <div class="mb-4 flex space-x-3 items-end">
        <div class="flex flex-col basis-1/4 flex-grow-0 flex-shrink-0 gap-2">
          <label>{{ MedicationDescriptions[MedicationNames.CLOSTILBEGIT] }}</label>
          <Select
            v-model="schedule.medications.CLOSTILBEGIT.frequency"
            option-label="label"
            option-value="value"
            :options="FrequencyOptions"
            placeholder="Частота приема"
          />
        </div>
        <div class="basis-1/4 flex-grow-0 flex-shrink-0">
          <Select
            v-model="schedule.medications.CLOSTILBEGIT.dosage"
            option-label="label"
            option-value="value"
            :options="DosageOptions"
            placeholder="Дозировка"
          />
        </div>
      </div>
      <div class="mb-4 flex space-x-3 items-end">
        <div class="flex flex-col basis-1/4 flex-grow-0 flex-shrink-0 gap-2">
          <label>{{ MedicationDescriptions[MedicationNames.ANASTROZOLE] }}</label>
          <Select
            v-model="schedule.medications.ANASTROZOLE.frequency"
            option-label="label"
            option-value="value"
            :options="FrequencyOptions"
            placeholder="Частота приема"
          />
        </div>
        <div class="basis-1/4 flex-grow-0 flex-shrink-0">
          <Select
            v-model="schedule.medications.ANASTROZOLE.dosage"
            option-label="label"
            option-value="value"
            :options="DosageOptions"
            placeholder="Дозировка"
          />
        </div>
      </div>
      <div class="mb-6 flex space-x-3 items-end">
        <div class="flex flex-col basis-1/4 flex-grow-0 flex-shrink-0 gap-2">
          <label>{{ MedicationDescriptions[MedicationNames.DOSTINEX] }}</label>
          <Select
            v-model="schedule.medications.DOSTINEX.frequency"
            option-label="label"
            option-value="value"
            :options="FrequencyOptions"
            placeholder="Частота приема"
          />
        </div>
        <div class="basis-1/4 flex-grow-0 flex-shrink-0">
          <Select
            v-model="schedule.medications.DOSTINEX.dosage"
            option-label="label"
            option-value="value"
            :options="DosageOptions"
            placeholder="Дозировка"
          />
        </div>
      </div>
      <div class="flex space-x-3">
        <DatePicker v-model="schedule.startDate" date-format="yy-mm-dd" placeholder="Дата начала" />
        <DatePicker
          v-model="schedule.endDate"
          date-format="yy-mm-dd"
          placeholder="Дата завершения"
        />
        <Button label="Генерировать расписание" @click="visible = true" />
      </div>
    </div>

    <Dialog v-model:visible="visible" maximizable modal>
      <ScheduleView :table-data="tableData" />
    </Dialog>
  </main>
</template>
