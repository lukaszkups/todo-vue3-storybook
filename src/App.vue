<template>
  <div class="main-wrapper">
    <h1>{{ t('title') }}</h1>
    <CreateTaskItem />
    <TaskList />
  </div>
</template>
<script setup lang="ts">
import CreateTaskItem from './components/CreateTaskItem.vue';
import TaskList from './components/TaskList.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
</script>
<style lang="scss">

</style>
