export type TaskStatus = 'SUCCESS' | 'FAILED' | 'PENDING'

export interface Task {
  id: string
  name: string
  status: TaskStatus
  description: string
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
}
