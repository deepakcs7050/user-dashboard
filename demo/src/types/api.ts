export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface User {
  email: string
  token: string
}

export interface TaskSummary {
  success: number
  failed: number
  pending: number
  total: number
  successRate: string
}

export interface DashboardSummary {
  tasks: TaskSummary
  welcome: string
}
