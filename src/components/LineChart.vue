<script setup lang="ts">
import { Chart as ChartJS } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'primevue/chart';
import { computed } from 'vue';

// Импортируем и регистрируем плагин datalabels

import { Hormones } from '@/enums/Hormones';

ChartJS.register(ChartDataLabels);

const props = defineProps({
  checkups: {
    type: Object,
    required: true
  }
});

const testosteroneVsLHData = computed(() => {
  return {
    labels: ['0', '1', '2', '3', '4'],
    datasets: [
      {
        label: 'ЛГ - ме',
        backgroundColor: '#FFA500', // Оранжевый
        borderColor: '#FFA500',
        data: [
          props.checkups[Hormones.LH].target,
          props.checkups[Hormones.LH].initial,
          ...Object.values(props.checkups[Hormones.LH].monthlyReadings)
        ]
      },
      {
        label: 'Тестостерон - н/моль',
        backgroundColor: '#4CAF50', // Зеленый
        borderColor: '#4CAF50',
        data: [
          props.checkups[Hormones.TESTOSTERONE].target,
          props.checkups[Hormones.TESTOSTERONE].initial,
          ...Object.values(props.checkups[Hormones.TESTOSTERONE].monthlyReadings)
        ]
      }
    ]
  };
});

const estradiolVsProlactinData = computed(() => {
  return {
    labels: ['0', '1', '2', '3', '4'],
    datasets: [
      {
        label: 'Эстрадиол - п/моль',
        backgroundColor: '#42A5F5', // Синий
        borderColor: '#42A5F5',
        data: [
          props.checkups[Hormones.ESTRADIOL].target,
          props.checkups[Hormones.ESTRADIOL].initial,
          ...Object.values(props.checkups[Hormones.ESTRADIOL].monthlyReadings)
        ]
      },
      {
        label: 'Пролактин - ме',
        backgroundColor: '#FF6384', // Красный
        borderColor: '#FF6384',
        data: [
          props.checkups[Hormones.PROLACTIN].target,
          props.checkups[Hormones.PROLACTIN].initial,
          ...Object.values(props.checkups[Hormones.PROLACTIN].monthlyReadings)
        ]
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Месяцы'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Значения'
      },
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      position: 'top'
    },
    datalabels: {
      anchor: 'end',
      align: 'end',
      color: '#555',
      font: {
        weight: 'bold'
      },
      formatter: function (value) {
        return value !== null ? value : ''; // Не показывать пустые значения
      }
    }
  }
};
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <h3 class="text-center font-bold">Прогресс Тестостерона по отношению к ЛГ</h3>
      <Chart
        type="bar"
        :data="testosteroneVsLHData"
        :options="chartOptions"
        style="height: 400px"
      />
    </div>
    <div>
      <h3 class="text-center font-bold">Регресс Эстрадиола и Пролактина</h3>
      <Chart
        type="bar"
        :data="estradiolVsProlactinData"
        :options="chartOptions"
        style="height: 400px"
      />
    </div>
  </div>
</template>
