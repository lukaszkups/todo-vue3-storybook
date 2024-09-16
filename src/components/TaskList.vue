<template>
  <div class="task-item-list">
    <TaskItem 
      v-for="(task, index) in tasks"
      :key="`${task.id}-${index}`"
      :task="task"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import TaskItem from './TaskItem.vue';
import { useTaskStore } from '../store';

const store = useTaskStore();

const tasks = computed(() => store.taskList);

onBeforeMount(() => {
  store.loadTaskList();
});
</script>