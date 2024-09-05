<script setup lang="ts">
import dayjs from 'dayjs';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import { computed, reactive } from 'vue';

import 'dayjs/locale/ru';
dayjs.locale('ru');

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
</script>

<template>
  <div class="bg-white mb-6 p-6 rounded-lg border border-gray-200"></div>
  <div class="bg-white mb-6 p-6 rounded-lg border border-gray-200">
    <!--    <button class="mt-4 block p-2 bg-blue-500 text-white rounded-md" @click="submitMonthlyValues">
      Добавить
    </button>-->
  </div>
  <div class="bg-white mb-6 p-6 rounded-lg border border-gray-200"></div>
  <div class="bg-white mb-6 p-6 rounded-lg border border-gray-200">
    <div class="grid grid-cols-2 gap-4">
      <LineChart
        :checkups="checkups"
        hormone-a="LH"
        hormone-b="TESTOSTERONE"
        hormone-a-label="LH"
        hormone-b-label="TESTOSTERONE"
      />
    </div>
  </div>
</template>
