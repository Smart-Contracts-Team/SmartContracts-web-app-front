// authService.js o authService.ts
import { httpClient } from '@/config/httpClient'
import type { IUser } from '@/interfaces/User'
import { useRouter } from 'vue-router'

const router = useRouter()

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await httpClient.post('/auth/login', {
        email,
        password
      })

      // Guarda el token en localStorage
      localStorage.setItem('token', response.data.token)

      // Opcionalmente, guarda también el ID del usuario si lo necesitas
      localStorage.setItem('userId', response.data.id.toString())

      return response.data
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  },

  async register(userData: IUser) {
    try {
      const response = await httpClient.post('/auth/register', userData)

      // Guarda el token en localStorage
      localStorage.setItem('token', response.data.token)

      // Opcionalmente, guarda también el ID del usuario si lo necesitas
      localStorage.setItem('userId', response.data.id.toString())

      return response.data
    } catch (error) {
      console.error('Registration failed', error)
      throw error
    }
  },

  logout() {
    try {
      // Eliminar el token y el userId del localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('userId')

      // Redirigir al usuario a la página de inicio de sesión
      router.push({ name: 'login' })
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
}
