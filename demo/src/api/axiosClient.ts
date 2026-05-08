import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'https://dummyjson.com'

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error?.response?.data?.message ?? error.message ?? 'API request failed')
  },
)

export default axiosClient
