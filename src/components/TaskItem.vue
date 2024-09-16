<template>
  <Card class="task-item">
    <template #default>
      <div class="task-item__title">
        {{ props.task.title }}
      </div>
      <div class="task-item__description">
        {{ props.task.description }}
      </div>
      <div class="task-item__due-date">
        {{ props.task.dueDate }}
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
import { taskStatusList } from '../helpers/constants';

const { t } = useI18n();

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  }
});

const taskStatusTranslationMapping = taskStatusList.map((item) => item.label);

const humanReadableStatus = computed(() => t(taskStatusTranslationMapping[props.task.status]))
</script>
<style lang="scss">
.task-item {
  margin-bottom: 20px;

  &__description {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
