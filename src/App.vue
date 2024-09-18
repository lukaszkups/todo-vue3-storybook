<template>
  <div class="main-wrapper">
    <h1>{{ t('title') }}</h1>
    <button 
      class="create-task-button"
      :class="createTaskButtonCssClass"
      @click="showCreateTaskForm"
    >
      {{ toggleShowCreateFormLabel }}
    </button>
    <CreateTaskItem 
      v-if="isCreateTaskFormVisible"
      @created-task="onCreatedTask"
    />
    <TaskListsWrapper v-else />
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useTaskStore } from './store';
import CreateTaskItem from './components/CreateTaskItem.vue';
import TaskListsWrapper from './components/TaskListsWrapper.vue';

const { t } = useI18n();
const store = useTaskStore();

const isCreateTaskFormVisible = ref(false);
const onCreatedTask = () => {
  isCreateTaskFormVisible.value = false;
}
const toggleShowCreateFormLabel = computed(() => isCreateTaskFormVisible.value ? t('button.cancel') : t('button.addTask'));
const createTaskButtonCssClass = computed(() => isCreateTaskFormVisible.value ? '' : 'primary');

const showCreateTaskForm = () => {
  isCreateTaskFormVisible.value = !isCreateTaskFormVisible.value;
}

onBeforeMount(() => {
  store.loadTaskList();
});
</script>
<style lang="scss">
.create-task-button {
  margin-bottom: 1em;
}
</style>
