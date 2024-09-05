<script setup lang="ts">
// eslint-disable-next-line import/order
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import { computed, reactive, ref } from 'vue';

import ScheduleView from '@/components/ScheduleView.vue';
import { Dosage, DosageOptions } from '@/enums/Dosage';
import { Frequency, FrequencyOptions } from '@/enums/Frequency';
import { MedicationDescriptions, MedicationNames } from '@/enums/MedicationNames';

const visible = ref(false);
defineProps({
  schedule: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <main>
    <Dialog v-model:visible="visible" maximizable modal>
      <ScheduleView :table-data="tableData" />
    </Dialog>
  </main>
</template>
