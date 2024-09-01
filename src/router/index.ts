import { createRouter, createWebHistory } from 'vue-router';

import CheckupView from '@/views/CheckupView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/checkup',
      name: 'checkup',
      component: CheckupView
    }
  ]
});

export default router;
