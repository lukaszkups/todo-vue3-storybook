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

export const getTodaysDate = () => {
  return new Intl.DateTimeFormat('en-GB', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(Date.now());
}
