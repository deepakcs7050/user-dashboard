import { getApiBaseUrl, jsonFetch, useMockApi } from './api.js'
import { mockDashboardSummary } from './mock.js'
import type { DashboardSummary } from '../types/api.js'

export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  if (useMockApi()) {
    return mockDashboardSummary()
  }

  return jsonFetch<DashboardSummary>(`${getApiBaseUrl()}/dashboard`)
}
