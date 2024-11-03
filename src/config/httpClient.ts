import axios from 'axios'
import { environment } from '../environments/dev.env'

export const httpClient = axios.create({
  baseURL: environment.apiUrl
})

// Interceptor para agregar el token en cada request
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.request.use((request) => {
  console.log('Starting Request', request)
  return request
})
