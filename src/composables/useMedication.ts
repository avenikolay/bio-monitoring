import dayjs from 'dayjs';
import { computed, reactive } from 'vue';

import BASE_URL from '@/constants/BaseUrl';
import { Dosage } from '@/enums/Dosage';
import { Frequency } from '@/enums/Frequency';
import { MedicationDescriptions, MedicationNames } from '@/enums/MedicationNames';
import updateScheduleData from '@/helpers/updateScheduleData';

export default function useMedication() {
  const schedule = reactive({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().add('1', 'month').format('YYYY-MM-DD'),
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

  const tableData = computed(() => {
    return generateTableData();
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

  async function getMedications(userId) {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/medications`);
      const medicationsData = await response.json();
      if (JSON.stringify(medicationsData) !== '{}') {
        updateScheduleData(schedule, medicationsData);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function updateMedications(userId, payload) {
    console.log(payload);
    try {
      await fetch(`${BASE_URL}/users/${userId}/medications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...payload })
      });
    } catch (e) {
      console.log(e);
    }
  }

  return {
    schedule,
    medicationData: tableData,
    getMedications,
    updateMedications
  };
}
