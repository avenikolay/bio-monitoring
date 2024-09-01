<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen w-full bg-gray-100 flex">
    <div class="min-h-screen w-[255px] bg-white border-r border-gray-200">
      <div class="p-3 h-[58px] border-b border-gray-200 flex items-center justify-start">
        <a href="#" class="uppercase font-black text-blue-900">bio monitoring</a>
      </div>
      <div class="p-3">
        <router-link
          active-class="bg-gray-100"
          class="h-10 p-2 mb-1 text-sm font-medium line-height-4 text-gray-600 flex items-center rounded-md"
          to="/"
        >
          <svg
            class="mr-3"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 19C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H9L11 7H15C15.5304 7 16.0391 7.21071 16.4142 7.58579C16.7893 7.96086 17 8.46957 17 9V10M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V12C21 11.4696 20.7893 10.9609 20.4142 10.5858C20.0391 10.2107 19.5304 10 19 10H9C8.46957 10 7.96086 10.2107 7.58579 10.5858C7.21071 10.9609 7 11.4696 7 12V17C7 17.5304 6.78929 18.0391 6.41421 18.4142C6.03914 18.7893 5.53043 19 5 19Z"
              stroke="#9CA3AF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          Расписание приема
        </router-link>
        <router-link
          active-class="bg-gray-100"
          class="h-10 p-2 mb-1 text-sm font-medium line-height-4 text-gray-600 flex items-center rounded-md"
          :to="{ path: '/checkup' }"
          ><svg
            class="mr-3"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12H15M9 16H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H12.586C12.8512 3.00006 13.1055 3.10545 13.293 3.293L18.707 8.707C18.8946 8.89449 18.9999 9.1488 19 9.414V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z"
              stroke="#9CA3AF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Сдача анализов</router-link
        >
      </div>
    </div>
    <div class="flex-grow">
      <div
        class="py-3 px-6 h-[58px] border-b border-gray-200 flex items-center justify-start bg-white"
      >
        <h1 class="text-xl font-semibold text-gray-900">Ввод данных</h1>
      </div>
      <div class="container p-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>
