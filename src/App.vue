<template>
  <div class="main-wrapper">
    <h1>{{ t('title') }}</h1>
    <CreateTaskItem 
      v-if="showCreateTaskForm"
      @created-task="onCreatedTask"
    />
    <TaskList v-else />
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import CreateTaskItem from './components/CreateTaskItem.vue';
import TaskList from './components/TaskList.vue';
import { useI18n } from 'vue-i18n'
import { useTaskStore } from './store';

const { t } = useI18n();
const store = useTaskStore();

const showCreateTaskForm = ref(true);
const onCreatedTask = () => {
  showCreateTaskForm.value = false;
}

onBeforeMount(() => {
  store.loadTaskList();
});
</script>
<style lang="scss">

</style>
