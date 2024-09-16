<template>
  <Card 
    :class="dynamicClass"
  >
    <template #default>
      <div class="task-item__input-wrapper">
        <input 
          v-model="title" 
          type="text" 
          :placeholder="t('task.title')" 
        />
      </div>
      <div class="task-item__input-wrapper">
        <textarea
          v-model="description" 
          :placeholder="t('task.description')"
        ></textarea>
      </div>
      <div class="task-item__input-wrapper">
        <TaskStatusSelect 
          v-model="taskStatus"
        />
      </div>
      <div class="task-item__input-wrapper">
        <input 
          v-model="dueDate" 
          type="date" 
          :placeholder="t('task.dueDate')"
        />
      </div>
    </template>
    <template #footer>
      <button 
        :disabled="!canSaveTask"
        class="primary"
        @click="onSave"
      >{{ t('button.save') }}</button>
      <button @click="onReset">{{ t('button.reset') }}</button>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { getTodaysDate, taskStatusList } from '../helpers/constants';
import TaskStatusSelect from './TaskStatusSelect.vue';
import Card from './Card.vue';
import { useTaskStore } from '../store';

const { t } = useI18n();
const store = useTaskStore();

const emit = defineEmits(['createdTask'])

const title = ref('');
const description = ref('');
const dueDate = ref(getTodaysDate());
const taskStatus = ref(taskStatusList[0].id);
const dynamicClass= ref('task-item animation-bounce');

const canSaveTask = computed(() => {
  return !!title.value.length
})

const onReset = () => {
  resetForm();
  shakeCard();
}

const resetForm = () => {
  title.value = '';
  description.value = '';
  dueDate.value = '';
  taskStatus.value = taskStatusList[0].id;
}

const shakeCard = async () => {
  dynamicClass.value = 'task-item animation-shake';
  await setTimeout(() => {
    dynamicClass.value = 'task-item';
  }, 300);
}

const onSave = async () => {
  dynamicClass.value = 'task-item animation-submit';
  store.addTask({
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    status: taskStatus.value
  });

  await setTimeout(() => {
    resetForm();
    dynamicClass.value = 'task-item task-item--hidden';
    emit('createdTask');
  }, 1000);
}
</script>
<style lang="scss">
.task-item {
  .card__body {
    flex-direction: column;
  }

  &__input-wrapper {
    flex: 1;
    margin-bottom: 10px;
    box-sizing: border-box;
    position: relative;

    input,
    textarea,
    select {
      width: 100%;
    }
  }

  &--hidden {
    display: none;
    opacity: 0;
  }
}
</style>
