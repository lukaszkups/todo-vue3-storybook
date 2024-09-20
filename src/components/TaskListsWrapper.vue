<template>
  <div class="task-list-wrapper">
    <div class="task-list-column task-list--pending">
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
    <div class="task-list-column task-list--completed">
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
}, {
  deep: true,
})
</script>
<style lang="scss">
.task-list-wrapper {
  display: flex;
  gap: 20px;

  .task-list-column {
    flex: 1;

    &.task-list--pending {
      .tag {
        background-color: #ddd;
        color: #000;
      }
    }

    &.task-list--completed {
      .task-item {
        opacity: 0.75;
        
        &:hover *{
          opacity: 1;
        }
        
        .tag {
          background-color: #000;
        }
      }
    }
  }
}

@media (max-width: 730px) {
  .task-list-wrapper {
    flex-direction: column;
    .task-list-column {
      .task-item-list {
          min-height: auto;
      }
    }
  }
}
</style>
