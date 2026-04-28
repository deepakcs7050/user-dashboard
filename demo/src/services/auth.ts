import { getApiBaseUrl, jsonFetch, useMockApi } from './api.js'
import { mockLogin } from './mock.js'
import type { LoginRequest, LoginResponse } from '../types/api.js'

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  if (useMockApi()) {
    return mockLogin(payload)
  }

  return jsonFetch<LoginResponse>(`${getApiBaseUrl()}/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
