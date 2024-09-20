<template>
  <div class="task-item-list">
    <h2>{{ title }}</h2>
    <template v-if="items.length">
      <TaskItem 
        v-for="(task, index) in items"
        :key="`${task.id}-${index}`"
        :task="task"
      />
    </template>
    <p v-else>{{ t('task.noTasks') }}</p>
  </div>
</template>
<script setup lang="ts">
import { SavedTask } from '../types';
import TaskItem from './TaskItem.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();

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
}
</style>
