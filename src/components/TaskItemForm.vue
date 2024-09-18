<template>
  <Card 
    class="task-item--create"
    :class="dynamicClass"
  >
    <template #default>
      <h2>{{ modalTitle }}</h2>
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
      <button @click="onCancel">{{ t('button.cancel') }}</button>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { getTodaysDate, taskStatusList } from '../helpers/constants';
import TaskStatusSelect from './TaskStatusSelect.vue';
import Card from './Card.vue';
import { useTaskStore } from '../store';
import { SavedTask, Task } from '../types';

const { t } = useI18n();
const store = useTaskStore();

const emit = defineEmits(['createdTask', 'formCancel'])

const title = ref('');
const description = ref('');
const dueDate = ref(getTodaysDate());
const taskStatus = ref(taskStatusList[0].id);
const dynamicClass = ref('task-item');

const canSaveTask = computed(() => {
  return !!title.value.length;
});

const editableTaskId = computed(() => store.editableTaskId);

const modalTitle = computed(() => store.editableTaskId !== null ? t('task.edit'): t('task.create') )

const onCancel = () => {
  resetForm();
  emit('formCancel');
}

const resetForm = () => {
  title.value = '';
  description.value = '';
  dueDate.value = '';
  taskStatus.value = taskStatusList[0].id;
  store.selectEditTask(null);
}

const onSave = async () => {
  dynamicClass.value = 'task-item animation-submit';
  const taskObj: Task | SavedTask = {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    status: taskStatus.value
  }
  if (editableTaskId.value) {
    (taskObj as SavedTask).id = editableTaskId.value;
    store.selectEditTask(null);
    store.updateTask(taskObj as SavedTask);
  } else {
    store.addTask(taskObj);
  }
  dynamicClass.value = 'task-item task-item--hidden';
  emit('createdTask');
  resetForm();
}

const fillFormToEdit = () => {
  const taskToEdit: SavedTask | undefined = store.taskList.find((task) => task.id === editableTaskId.value);
  if (taskToEdit) {
    title.value = taskToEdit.title;
    description.value = taskToEdit.description;
    dueDate.value = taskToEdit.dueDate;
    taskStatus.value = taskToEdit.status;
  }
}

watch(editableTaskId, () => {
  fillFormToEdit();
}, {
  immediate: true,
});
</script>
<style lang="scss">
.task-item {

  &--create {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    border: 1px solid #eee;

    h2 {
      margin-top: 0;
    }

    .card__body {
      flex-direction: column !important;
    }
  }

  &--cancel {
    background-color: #fff;
    color: #000;
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

  &.animation-submit {
    animation-duration: 0.71s;
  }
}
</style>
