export enum TaskStatus {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
}

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
}

export interface SavedTask extends Task {
  id: number;
}
