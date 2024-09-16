<template>
  <TaskItem 
    v-for="task in tasks"
    :key="task.id"
    :task="task"
  />
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