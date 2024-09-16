import { defineStore } from "pinia";
import { SavedTask, Task } from "../types";
import { Ref, ref } from "vue";
import { localStoragePiniaKey } from "../helpers/constants";

export const useTaskStore = defineStore('taskStore', () => {
  const idCounter = ref(0);
  const taskList: Ref<SavedTask[]> = ref([]);

  const loadTaskList = () => {
    const tasks = JSON.parse(localStorage.getItem(localStoragePiniaKey) || '[]');
    taskList.value = tasks;
  }

  const saveTaskList = () => {
    const tasks = JSON.stringify(taskList.value || []);
    console.log(tasks)
    localStorage.setItem(localStoragePiniaKey, tasks);
  }

  const updateIdCounter = () => {
    if (!taskList.value.length) {
      idCounter.value = 0;
      return;
    }

    const highestId = taskList.value.reduce((maxObj, currentObj) => {
      return currentObj.id > maxObj.id ? currentObj : maxObj;
    }, taskList.value[0]); 
    idCounter.value = highestId.id + 1;
  }

  const addTask = (newItem: Task) => {
    const task = {
      ...newItem,
      id: idCounter.value
    }
    idCounter.value++;
    taskList.value.push(task);
    saveTaskList();
  }

  const removeTask = (taskId: number) => {
    const taskIndexToRemove = taskList.value.findIndex((item: SavedTask) => item.id === taskId);
    if (taskIndexToRemove > -1) {
      taskList.value.splice(taskIndexToRemove, 1);
      saveTaskList();
    } else {
      throw new Error('Task Remove Error: Task has not been found');
    }
  }

  const updateTask = (task: SavedTask) => {
    const taskIndexToUpdate = taskList.value.findIndex((item: SavedTask) => item.id === task.id);
    if (taskIndexToUpdate > -1) {
      taskList.value[taskIndexToUpdate] = task;
      saveTaskList();
    } else {
      throw new Error('Task Update Error: Task has not been found');
    }
  }

  return {
    taskList,
    loadTaskList,
    saveTaskList,
    addTask,
    removeTask,
    updateTask,
  }
});
