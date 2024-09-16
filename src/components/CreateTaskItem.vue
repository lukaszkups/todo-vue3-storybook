<template>
  <Card class="task-item">
    <template #default>
      <input 
        v-model="title" 
        type="text" 
        :placeholder="t('task.title')" 
      />
      <textarea
        v-model="description" 
        :placeholder="t('task.description')"
      ></textarea>
      <TaskStatusSelect 
        v-model="taskStatus"
      />
      <input 
        v-model="dueDate" 
        type="date" 
        :placeholder="t('task.dueDate')"
        :valueAsDate="new Date()"
      />
    </template>
    <template #footer>
      <button class="primary">{{ t('button.save') }}</button>
      <button>{{ t('button.reset') }}</button>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { taskStatusList } from '../helpers/constants';
import TaskStatusSelect from './TaskStatusSelect.vue';
import Card from './Card.vue';

const { t } = useI18n();

const title = ref('');
const description = ref('');
const dueDate = ref('');
const taskStatus = ref(taskStatusList[0].id);
</script>
