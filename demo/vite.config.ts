import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const useMockApi = process.env.VITE_USE_MOCK_API !== 'false'

export default defineConfig({
  plugins: [react()],
  define: {
    __VITE_API_BASE_URL__: JSON.stringify(process.env.VITE_API_BASE_URL ?? 'http://localhost:5173/api'),
    __VITE_USE_MOCK_API__: useMockApi,
  },
})
