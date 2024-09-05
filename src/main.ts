import BASE_URL from '@/constants/BaseUrl';

console.log(BASE_URL);

import './assets/style.css';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  },
  locale: {
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNamesShort: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек'
    ],
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ]
  }
});

app.use(router);

app.mount('#app');
