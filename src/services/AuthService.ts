// authService.js o authService.ts
import { httpClient } from '@/config/httpClient'

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

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
}
