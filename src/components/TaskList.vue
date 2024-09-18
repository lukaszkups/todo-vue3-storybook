<template>
  <div class="task-item-list">
    <h2>{{ title }}</h2>
    <TaskItem 
      v-for="(task, index) in items"
      :key="`${task.id}-${index}`"
      :task="task"
    />
  </div>
</template>
<script setup lang="ts">
import { SavedTask } from '../types';
import TaskItem from './TaskItem.vue';

defineProps({
  title: {
    type: String,
    default: ''
  },
  items: {
    type: Array<SavedTask>,
    default: () => []
  }
})
</script>
<style lang="scss">
.task-item-list {
  min-height: 100vh;
  
  &:hover {
    h2 {
      text-decoration: underline;
    }
  }
}
</style>
