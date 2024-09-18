<template>
  <div class="main-wrapper">
    <h1>{{ t('title') }}</h1>
    <button 
      class="form-task-button primary"
      :disabled="canShowTaskForm"
      @click="showCreateForm"
    >
      {{ t('button.addTask') }}
    </button>
    <TaskItemForm 
      v-if="canShowTaskForm"
      @created-task="onCreatedTask"
      @form-cancel="onFormCancel"
    />
    <TaskListsWrapper />
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useTaskStore } from './store';
import TaskItemForm from './components/TaskItemForm.vue';
import TaskListsWrapper from './components/TaskListsWrapper.vue';

const { t } = useI18n();
const store = useTaskStore();

const isCreateTaskFormVisible = ref(false);
const onCreatedTask = () => {
  isCreateTaskFormVisible.value = false;
  store.loadTaskList();
}
const editableTaskId = computed(() => store.editableTaskId);
const canShowTaskForm = computed(() => isCreateTaskFormVisible.value || editableTaskId.value !== null)

const showCreateForm = () => {
  store.selectEditTask(null);
  isCreateTaskFormVisible.value = true;
}

const onFormCancel = () => {
  isCreateTaskFormVisible.value = false;
}

onBeforeMount(() => {
  store.loadTaskList();
});
</script>
<style lang="scss">
.form-task-button {
  margin-bottom: 1em;
}
</style>
