import { httpClient } from '@/config/httpClient'
import type { IUser } from '@/interfaces/User'

const serviceName = '/user'

export const UserService = {
  async getAllUsers(): Promise<IUser[]> {
    const response = await httpClient.get<[]>(`${serviceName}`)
    return response.data
  },

  async getUserByType(type: string): Promise<IUser[]> {
    const response = await httpClient.get<[]>(`${serviceName}`)
    return response.data.filter((user: IUser) => user.typeOfUser === type)
  }
}
