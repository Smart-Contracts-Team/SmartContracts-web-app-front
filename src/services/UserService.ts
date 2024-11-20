import { httpClient } from '@/config/httpClient'
import type { IUser } from '@/interfaces/User'

const serviceName = '/user'

export const UserService = {
  async getAllUsers(): Promise<IUser[]> {
    const response = await httpClient.get<[]>(`${serviceName}`)
    return response.data
  },

  async getUserById(userId: any): Promise<IUser> {
    const response = await httpClient.get<IUser>(`${serviceName}/${userId}`)
    return response.data
  },

  async getUserByType(type: string): Promise<IUser[]> {
    const response = await httpClient.get<IUser[]>(`${serviceName}`)
    return response.data.filter((user: IUser) => user.typeOfUser === type)
  },

  async updateUser(user: IUser): Promise<IUser> {
    const response = await httpClient.put(`${serviceName}/${user.id}`, user)
    return response.data
  }
}
