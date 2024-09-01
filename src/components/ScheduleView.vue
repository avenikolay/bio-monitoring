<script setup lang="ts">
// @ts-ignore
import html2pdf from 'html2pdf.js';
import Button from 'primevue/button';

defineProps({
  tableData: {
    type: Array
  }
});

const generatePDF = () => {
  const element = document.getElementById('table-content'); // Ссылка на элемент с таблицей
  const options = {
    margin: 1,
    filename: 'schedule.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all', before: '#page2el' }
  };

  html2pdf().from(element).set(options).save();
};
</script>

<template>
  <div>
    <Button label="Скачать PDF" class="mb-4" @click="generatePDF"> Скачать PDF </Button>
    <div id="table-content">
      <div
        v-for="(week, weekIndex) in tableData"
        :key="weekIndex"
        :class="{ 'page-break': weekIndex > 0 }"
        class="bg-white rounded-lg mb-5 overflow-hidden border border-gray-200"
      >
        <div class="py-2 px-4 flex items-center">
          <h3 class="text-sm font-medium line-height-5 text-gray-900">
            {{ weekIndex + 1 }} Неделя
          </h3>
        </div>

        <table class="table-auto w-full">
          <thead>
            <tr
              class="border-y border-gray-200 divide-x divide-gray-200 bg-gray-50 text-xs leading-4 font-medium tracking-wider uppercase text-gray-900"
            >
              <th class="py-2.5 px-4">День недели</th>
              <th v-for="(day, index) in week.weekDays" :key="index" class="py-2.5 px-4">
                {{ day.medications[0].weekday }}
              </th>
            </tr>
            <tr
              class="border-b border-gray-200 divide-x divide-gray-200 bg-gray-50 text-xs leading-4 font-medium tracking-wider uppercase text-gray-500"
            >
              <th class="py-2.5 px-4">Дата</th>
              <th v-for="(day, index) in week.weekDays" :key="index" class="py-2.5 px-4">
                {{ day.medications[0].date }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="medicationIndex in week.weekDays[0].medications.length"
              :key="medicationIndex"
              class="divide-x divide-gray-200"
            >
              <td class="py-2 px-4 text-sm font-medium line-height-5 text-gray-900">
                {{ week.weekDays[0].medications[medicationIndex - 1].name }}
              </td>
              <td
                v-for="(day, dayIndex) in week.weekDays"
                :key="dayIndex"
                class="py-2 px-4 text-sm font-medium line-height-5 text-gray-500"
              >
                {{ day.medications[medicationIndex - 1].dosage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style>
@media print {
  .page-break {
    page-break-before: always;
  }
  table,
  th,
  td {
    border-collapse: collapse;
    border: 1px solid black;
  }
}
</style>
