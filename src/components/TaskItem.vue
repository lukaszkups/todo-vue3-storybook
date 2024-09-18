<template>
  <Card 
    class="task-item task-item__card"
    @click="onTaskItemClick"
  >
    <template #default>
      <div class="task-item task-item__title">
        {{ props.task.title }}
      </div>
      <div class="task-item task-item__description">
        {{ props.task.description }}
      </div>
      <div class="task-item task-item__status">
        <span class="tag">{{ humanReadableStatus }}</span>
      </div>
    </template>
    <template #footer>
      <div class="task-item task-item__due-date">
        {{ t('task.dueDate') }}: {{ props.task.dueDate }}
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue';
import { SavedTask, Task } from '../types';
import { useI18n } from 'vue-i18n'
import Card from './Card.vue';
import { taskStatusList } from '../helpers/constants';
import { useTaskStore } from '../store';

const { t } = useI18n();
const store = useTaskStore();

const props = defineProps({
  task: {
    type: Object as PropType<SavedTask>,
    required: true,
  }
});

const taskStatusTranslationMapping = taskStatusList.map((item) => item.label);

const humanReadableStatus = computed(() => t(taskStatusTranslationMapping[props.task.status]));

const onTaskItemClick = () => {
  store.selectEditTask(props.task.id);
}
</script>
<style lang="scss">
.task-item {
  margin-bottom: 20px;

  .card__body {
    flex-direction: row;
  }

  &__description {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }

  &__title {
    text-align: left;
    font-weight: 700;
  }

  &__card {
    transition: box-shadow 0.2s, transform 0.2s;

    &:hover {
      transition: box-shadow 0.2s, transform 0.2s;
      -webkit-box-shadow: 1px 10px 10px -10px rgba(66, 68, 90, 1);
      -moz-box-shadow: 1px 10px 10px -10px rgba(66, 68, 90, 1);
      box-shadow: 1px 10px 10px -10px rgba(66, 68, 90, 1);
      transform: scale(1.05)
    }
  }

  &__status {
    text-align: right;
    .tag {
      display: inline-block;
      padding: 5px 8px;
      background-color: var(--color-primary);
      color: #fff;
      border-radius: 5px;
      font-size: 0.5em;
      text-transform: uppercase;
      vertical-align: top;
      letter-spacing: 1px;
    }
  }

  &__due-date {
    text-align: left;
    margin-bottom: 0;
  }

  .card__body {
    .task-item {
      flex: 1;
      margin-bottom: 0;
    }
  }
}
</style>
