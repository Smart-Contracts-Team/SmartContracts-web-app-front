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

      // Guarda el ID del usuario si lo necesitas
      localStorage.setItem('userId', response.data.id.toString())

      // Guarda el token en localStorage
      localStorage.setItem('token', response.data.token)

      // Guarda el typeOfUser del usuario si lo necesitas
      localStorage.setItem('typeOfUser', response.data.typeOfUser)

      return response.data
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  },

  async register(userData: IUser) {
    try {
      const response = await httpClient.post('/auth/register', userData)

      // Guarda el ID del usuario si lo necesitas
      localStorage.setItem('userId', response.data.id.toString())

      // Guarda el token en localStorage
      localStorage.setItem('token', response.data.token)

      // Guarda el typeOfUser del usuario si lo necesitas
      localStorage.setItem('typeOfUser', response.data.typeOfUser)

      return response.data
    } catch (error) {
      console.error('Registration failed', error)
      throw error
    }
  },

  logout() {
    try {
      // Eliminar el token y el userId del localStorage
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
      localStorage.removeItem('typeOfUser')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
}
