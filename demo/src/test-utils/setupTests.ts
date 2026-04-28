import '@testing-library/jest-dom'
import { server } from './server'

declare global {
  interface GlobalThis {
    __VITE_API_BASE_URL__?: string
    __VITE_USE_MOCK_API__?: boolean
  }
}

if (typeof globalThis.__VITE_API_BASE_URL__ === 'undefined') {
  ;(globalThis as any).__VITE_API_BASE_URL__ = 'http://localhost:5173/api'
}

if (typeof globalThis.__VITE_USE_MOCK_API__ === 'undefined') {
  ;(globalThis as any).__VITE_USE_MOCK_API__ = true
}

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
