<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';

import BASE_URL from '@/constants/BaseUrl';

// Хранение списка пользователей
const users = ref([]);

// Открытие/закрытие модального окна
const showModal = ref(false);

// Поля для создания нового пользователя
const newUser = ref({
  firstName: '',
  lastName: ''
});

// Получение списка пользователей
const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    users.value = data; // Очищаем и обновляем список пользователей
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
  }
};

// Вызов функции при загрузке компонента
getUsers();

// Создание нового пользователя
const createUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser.value)
    });

    if (!response.ok) throw new Error('Ошибка при создании пользователя');

    // Перезапрашиваем список пользователей после создания нового
    await getUsers();

    // Закрываем модалку после успешного создания
    showModal.value = false;

    // Очищаем поля формы
    newUser.value.firstName = '';
    newUser.value.lastName = '';
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
  }
};

// Удаление пользователя
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      // Перезапрашиваем список пользователей после удаления
      await getUsers();
    }
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
  }
};
</script>

<template>
  <Card>
    <template #header>
      <div class="p-4">
        <Button label="Создать пользователя" @click="showModal = true" />
      </div>
    </template>
    <template #title>Пользователи</template>
    <template #content>
      <DataTable :value="users" table-style="min-width: 50rem">
        <Column field="firstName" header="Имя"></Column>
        <Column field="lastName" header="Фамилия"></Column>
        <Column header="Действия">
          <template #body="{ data }">
            <Button
              label="Перейти"
              severity="contrast"
              size="small"
              as="router-link"
              :to="{ name: 'user', params: { id: data.id } }"
            />
            <Button
              label="Удалить"
              severity="danger"
              size="small"
              class="ml-2"
              @click="deleteUser(data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>

  <!-- Модальное окно для создания нового пользователя -->
  <Dialog v-model:visible="showModal" header="Создать нового пользователя" modal>
    <div class="p-fluid">
      <div class="field">
        <label for="firstName">Имя</label>
        <InputText id="firstName" v-model="newUser.firstName" />
      </div>
      <div class="field">
        <label for="lastName">Фамилия</label>
        <InputText id="lastName" v-model="newUser.lastName" />
      </div>
    </div>

    <template #footer>
      <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="showModal = false" />
      <Button label="Создать" icon="pi pi-check" class="p-button-primary" @click="createUser" />
    </template>
  </Dialog>
</template>
