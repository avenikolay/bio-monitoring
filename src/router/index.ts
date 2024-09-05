import { createRouter, createWebHistory } from 'vue-router';

import CheckupView from '@/views/CheckupView.vue';
import UsersView from '@/views/UsersView.vue';
import UserView from '@/views/UserView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: UsersView
    },
    {
      path: '/users/:id',
      name: 'user',
      component: UserView
    },
    // {
    //   path: '/:id/medication',
    //   name: 'medication',
    //   component: MedicationView
    // },
    {
      path: '/:id/checkup',
      name: 'checkup',
      component: CheckupView
    },
    // {
    //   path: '/medication',
    //   name: 'medication',
    //   component: MedicationView
    // },
    {
      path: '/checkup',
      name: 'checkup',
      component: CheckupView
    }
  ]
});

export default router;
