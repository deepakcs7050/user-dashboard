import '@testing-library/jest-dom'
import { server } from './server'

if (typeof (globalThis as any).__VITE_API_BASE_URL__ === 'undefined') {
  ;(globalThis as any).__VITE_API_BASE_URL__ = 'http://localhost:5173/api'
}

if (typeof (globalThis as any).__VITE_USE_MOCK_API__ === 'undefined') {
  ;(globalThis as any).__VITE_USE_MOCK_API__ = true
}

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())



