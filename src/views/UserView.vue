<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';
import dayjs from 'dayjs';
import html2pdf from 'html2pdf.js';
import Breadcrumb from 'primevue/breadcrumb';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import { computed, onMounted, ref } from 'vue';

import LineChart from '@/components/LineChart.vue';
import ScheduleView from '@/components/ScheduleView.vue';
import useCheckups from '@/composables/useCheckups';
import useMedication from '@/composables/useMedication';
import { DosageOptions } from '@/enums/Dosage';
import { FrequencyOptions } from '@/enums/Frequency';
import { MedicationDescriptions, MedicationNames } from '@/enums/MedicationNames';
const userId = useRouteParams('id');
const items = computed(() => {
  return [{ label: 'Все пользователи', route: { name: 'users' } }, { label: userId }];
});

const { schedule, medicationData, getMedications, updateMedications } = useMedication();
const {
  v$,
  checkups,
  newMonthlyValues,
  globalDate,
  formError,
  checkupsData,
  maxMonths,
  getCheckups,
  submitMonthlyValues,
  updateCheckups
} = useCheckups();
onMounted(() => {
  getCheckups(userId.value);
  getMedications(userId.value);
});

const tabs = ref([
  { title: 'Прием препаратов', value: '0' },
  { title: 'Анализы', value: '1' },
  { title: 'Просмотр', value: '2' }
]);

const generatePDF = () => {
  const element = document.getElementById('preview-data'); // Ссылка на элемент с таблицей
  const options = {
    margin: 1,
    filename: 'preview.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all', before: '#page2el' }
  };

  html2pdf().from(element).set(options).save();
};
</script>

<template>
  <Card style="overflow: hidden">
    <template #header> <Breadcrumb :model="items"></Breadcrumb> </template>
    <template #content> </template>
  </Card>
  <hr class="my-6" />

  <div class="card mb-4">
    <Tabs value="0">
      <TabList>
        <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
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
            <DatePicker
              v-model="schedule.startDate"
              date-format="yy-mm-dd"
              placeholder="Дата начала"
            />
            <DatePicker
              v-model="schedule.endDate"
              date-format="yy-mm-dd"
              placeholder="Дата завершения"
            />
            <Button type="button" label="Сохранить" @click="updateMedications(userId, schedule)" />
          </div>
        </TabPanel>
        <TabPanel value="1">
          <DataTable :value="checkupsData" table-style="min-width: 50rem" class="mb-6">
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

          <div class="mb-5 max-w-3xl">
            <h3 class="text-md font-medium mb-3">Целевые и начальные значения</h3>
            <div v-for="hormone in Object.keys(checkups)" :key="hormone" class="mb-4 last:mb-0">
              <label :for="hormone" class="block text-sm font-medium text-gray-700 mb-1">
                {{ checkups[hormone].name }}
              </label>
              <div class="flex space-x-4">
                <!-- Поле ввода целевого значения -->
                <InputNumber
                  :id="`${hormone}-target`"
                  v-model="checkups[hormone].target"
                  type="number"
                  class="w-1/2"
                  placeholder="Введите целевое значение"
                />

                <!-- Поле ввода начального значения -->
                <InputNumber
                  :id="`${hormone}-initial`"
                  v-model="checkups[hormone].initial"
                  type="number"
                  class="w-1/2"
                  placeholder="Введите начальное значение"
                />
              </div>
            </div>
            <Button label="Сохранить" @click="updateCheckups(userId, checkups)"></Button>
          </div>
          <hr class="my-6" />
          <div>
            <h3 class="text-md font-medium mb-3">Ежемесячные значения</h3>
            <div class="flex space-x-4 items-center mb-4">
              <label class="block text-sm font-medium text-gray-700"> Дата сдачи анализов: </label>

              <DatePicker
                :model-value="globalDate"
                date-format="yy-mm-dd"
                placeholder="Дата"
                :invalid="v$.globalDate.$error"
                @update:model-value="globalDate = dayjs($event).format('YYYY-MM-DD')"
              />
            </div>
            <div v-for="hormone in Object.keys(checkups)" :key="hormone" class="mb-4">
              <label :for="hormone" class="block text-sm font-medium text-gray-700">
                {{ checkups[hormone].name }}
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
            <div v-if="formError" class="text-red-500 text-sm mt-2">
              Пожалуйста, заполните все значения и укажите дату.
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <Button label="Скачать PDF" class="mb-4" @click="generatePDF"> Скачать PDF </Button>
          <div id="preview-data">
            <DataTable :value="checkupsData" table-style="min-width: 50rem" class="mb-6">
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

            <LineChart
              :checkups="checkups"
              hormone-a="LH"
              hormone-b="TESTOSTERONE"
              hormone-a-label="LH"
              hormone-b-label="TESTOSTERONE"
            />
            <ScheduleView :table-data="medicationData" />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
