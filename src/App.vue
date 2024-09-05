<script setup lang="ts">
//import { FolderIcon, ClockIcon, UserIcon } from '@heroicons/vue/24/outline';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen w-full bg-gray-100 flex">
    <!--    <div class="min-h-screen w-[255px] bg-white border-r border-gray-200">
      <div class="p-3 h-[58px] border-b border-gray-200 flex items-center justify-start">
        <a href="#" class="uppercase font-black text-blue-900">bio monitoring</a>
      </div>
      <div class="p-3">
        <router-link
          active-class="bg-gray-100"
          class="h-10 p-2 mb-1 text-sm font-medium line-height-4 text-gray-600 flex items-center rounded-md"
          to="/"
        >
          <UserIcon class="w-6 h-6 mr-3 text-gray-400" />
          Пользователи
        </router-link>
        <router-link
          active-class="bg-gray-100"
          class="h-10 p-2 mb-1 text-sm font-medium line-height-4 text-gray-600 flex items-center rounded-md"
          to="/medication"
        >
          <FolderIcon class="w-6 h-6 mr-3 text-gray-400" />
          Расписание приема
        </router-link>
        <router-link
          active-class="bg-gray-100"
          class="h-10 p-2 mb-1 text-sm font-medium line-height-4 text-gray-600 flex items-center rounded-md"
          :to="{ path: '/checkup' }"
        >
          <ClockIcon class="w-6 h-6 mr-3 text-gray-400" />
          Сдача анализов</router-link
        >
      </div>
    </div>-->
    <div class="flex-grow">
      <div
        class="py-3 px-6 h-[58px] border-b border-gray-200 flex items-center justify-start bg-white"
      >
        <router-link to="/" class="uppercase font-black text-blue-900">bio monitoring</router-link>
        <!--        <h1 class="text-xl font-semibold text-gray-900">Ввод данных</h1>-->
      </div>
      <div class="container p-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>
