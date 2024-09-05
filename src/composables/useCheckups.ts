import useVuelidate from '@vuelidate/core';
import { minValue, numeric, required } from '@vuelidate/validators';
import dayjs from 'dayjs';
import { computed, reactive, ref } from 'vue';

import BASE_URL from '@/constants/BaseUrl';
import { HormoneNames, Hormones } from '@/enums/Hormones';
import updateCheckupsData from '@/helpers/updateCheckupsData';

export default function useCheckups() {
  // Реактивные данные для хранения чекапов
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

  // Данные для отправки новых ежемесячных значений
  const globalDate = ref(dayjs().format('YYYY-MM-DD'));
  const newMonthlyValues = reactive({});
  const formError = ref(false);

  // Валидация данных с использованием Vuelidate
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

  // Получение чекапов с сервера
  async function getCheckups(userId) {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/checkups`);
      const checkupsData = await response.json();
      if (JSON.stringify(checkupsData) !== '{}') {
        updateCheckupsData(checkups, checkupsData);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Отправка обновленных чекапов на сервер
  async function updateCheckups(userId, payload) {
    console.log(JSON.stringify({ hormonesData: payload }));
    try {
      await fetch(`${BASE_URL}/users/${userId}/checkups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hormonesData: payload })
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Обработка и отправка новых ежемесячных значений
  function submitMonthlyValues() {
    v$.value.$touch();

    if (v$.value.$invalid || !globalDate.value) {
      formError.value = true;
      return;
    }

    formError.value = false;
    for (const hormone in newMonthlyValues) {
      console.log(globalDate.value);
      checkups[hormone].monthlyReadings[globalDate.value] = newMonthlyValues[hormone];
    }

    // Сброс значений после добавления
    for (const hormone in newMonthlyValues) {
      newMonthlyValues[hormone] = null;
    }
    v$.value.$reset();
    globalDate.value = '';
  }

  // Генерация данных для отображения таблицы
  function generateTableData(checkups) {
    const tableData = [];
    let maxMonths = 0;

    // Определяем максимальное количество месяцев
    for (const hormoneKey of Object.keys(checkups)) {
      const monthlyReadings = checkups[hormoneKey].monthlyReadings || {};
      const numMonths = Object.keys(monthlyReadings).length;
      if (numMonths > maxMonths) {
        maxMonths = numMonths;
      }
    }

    // Генерация строк для таблицы
    for (const hormoneKey of Object.keys(checkups)) {
      const hormone = checkups[hormoneKey];
      const row = {
        name: hormone.name || 'N/A',
        target: hormone.target || 0,
        initial: hormone.initial || 0
      };

      const monthlyReadings = hormone.monthlyReadings || {};
      const months = Object.keys(monthlyReadings);

      // Заполнение месячных данных
      months.forEach((month, index) => {
        row[`month${index + 1}`] = monthlyReadings[month];
      });

      // Добавление недостающих месяцев с нулями
      for (let i = months.length; i < maxMonths; i++) {
        row[`month${i + 1}`] = 0;
      }

      tableData.push(row);
    }

    return tableData;
  }

  // Максимальное количество месяцев для столбцов таблицы
  const maxMonths = computed(() => {
    return Math.max(
      ...tableData.value.map(
        (row) => Object.keys(row).filter((key) => key.startsWith('month')).length
      )
    );
  });

  // Данные для таблицы
  const tableData = computed(() => {
    return generateTableData(checkups);
  });

  return {
    v$,
    newMonthlyValues,
    checkups,
    globalDate,
    formError,
    maxMonths,
    checkupsData: tableData,
    getCheckups,
    submitMonthlyValues,
    updateCheckups
  };
}
