import { TaskStatus } from "../types"

export const localStoragePiniaKey = 'lk-task-list'
export const taskStatusList = [
  {
    id: TaskStatus.PENDING,
    label: 'taskStatus.pending'
  },
  {
    id: TaskStatus.IN_PROGRESS,
    label: 'taskStatus.inProgress'
  },
  {
    id: TaskStatus.COMPLETED,
    label: 'taskStatus.completed'
  }
]