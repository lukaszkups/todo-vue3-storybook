<template>
  <div class="task-list-wrapper">
    <div class="task-list-column">
      <TaskList 
        :title="t('taskStatus.pending')"
        :items="pendingTasks"
      />
    </div>
    <div class="task-list-column">
      <TaskList 
        :title="t('taskStatus.inProgress')"
        :items="inProgressTasks"
      />
    </div>
    <div class="task-list-column">
      <TaskList 
        :title="t('taskStatus.completed')"
        :items="completedTasks"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { useTaskStore } from '../store';
import { SavedTask, TaskStatus } from '../types';
import TaskList from './TaskList.vue';

const { t } = useI18n();
const store = useTaskStore();

const pendingTasks = ref<SavedTask[]>([])
const inProgressTasks = ref<SavedTask[]>([])
const completedTasks = ref<SavedTask[]>([])
  
const tasks = computed(() => store.taskList);

onBeforeMount(() => {
  store.loadTaskList();
});

watch(tasks, () => {
  pendingTasks.value = [];
  inProgressTasks.value = [];
  completedTasks.value = [];

  tasks.value.forEach((task) => {
    if (task.status === TaskStatus.PENDING) {
      pendingTasks.value.push(task);
    } else if (task.status === TaskStatus.IN_PROGRESS) {
      inProgressTasks.value.push(task);
    } else if (task.status === TaskStatus.COMPLETED) {
      completedTasks.value.push(task);
    }
  });
})
</script>
<style lang="scss">
.task-list-wrapper {
  display: flex;

  .task-list-column {
    flex: 1;
  }  
}
</style>
