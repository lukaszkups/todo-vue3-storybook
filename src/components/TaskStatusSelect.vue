<template>
  <select v-model="selectModel">
    <option 
      v-for="status in taskStatusList"
      :value="status.id"
    >
      {{ t(status.label) }}
    </option>
  </select>
</template>
<script setup lang="ts">
import { taskStatusList } from '../helpers/constants';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
const selectModel = defineModel();
</script>
