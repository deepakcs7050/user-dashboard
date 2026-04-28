declare const __VITE_API_BASE_URL__: string | undefined
declare const __VITE_USE_MOCK_API__: boolean | undefined

const getViteApiBaseUrl = () => {
  return typeof __VITE_API_BASE_URL__ !== 'undefined'
    ? __VITE_API_BASE_URL__
    : (globalThis as any).__VITE_API_BASE_URL__
}

const getViteUseMockApi = () => {
  const viteValue = typeof __VITE_USE_MOCK_API__ !== 'undefined' ? __VITE_USE_MOCK_API__ : undefined
  return typeof viteValue !== 'undefined'
    ? viteValue
    : (globalThis as any).__VITE_USE_MOCK_API__ ?? true
}

export const getApiBaseUrl = () => {
  return getViteApiBaseUrl() ?? 'http://localhost:5173/api'
}

export const useMockApi = () => getViteUseMockApi()

export const jsonFetch = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    credentials: 'include',
    ...init,
  })

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error((body?.message as string) || 'Request failed')
    throw error
  }

  return body as T
}
