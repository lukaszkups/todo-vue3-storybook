export enum TaskStatus {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
}

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}

export interface SavedTask extends Task {
  id: number;
}
