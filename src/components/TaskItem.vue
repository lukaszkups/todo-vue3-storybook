<template>
  <Card class="task-item">
    <template>
      <div class="task-item__title">
        {{ task.title }}
      </div>
      <div class="task-item__description">
        {{ task.description }}
      </div>
      <div class="task-item__due-date">
        {{ task.dueDate }}
      </div>
      <div class="task-item__status">
        {{ humanReadableStatus }}
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue';
import { Task } from '../types';
import { useI18n } from 'vue-i18n'
import Card from './Card.vue';

const { t } = useI18n();

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  }
});

const humanReadableStatus = computed(() => t(`taskStatus.${props.task.status}`))
</script>
