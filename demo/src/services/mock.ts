import type { DashboardSummary, LoginRequest, LoginResponse } from '../types/api.js'

const DELAY = 250

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockLogin = async (payload: LoginRequest): Promise<LoginResponse> => {
  await sleep(DELAY)

  if (payload.email === 'test.user@example.com' && payload.password === 'Password123') {
    return { token: 'fake-jwt-token' }
  }

  throw new Error('Invalid credentials')
}

export const mockDashboardSummary = async (): Promise<DashboardSummary> => {
  await sleep(DELAY)

  return {
    welcome: 'Hello from your mock dashboard',
    tasks: {
      success: 42,
      failed: 8,
      pending: 13,
      total: 63,
      successRate: '66.7%',
    },
  }
}
