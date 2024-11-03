import { httpClient } from '@/config/httpClient'
import type { IInfluencer } from '@/interfaces/User'

const serviceName = '/user'

export const UserService = {
  async getAllUsers(): Promise<IInfluencer[]> {
    const response = await httpClient.get<[]>(`${serviceName}`)
    return response.data
  },

  async getUserByType(type: string): Promise<IInfluencer[]> {
    const response = await httpClient.get<[]>(`${serviceName}`)
    return response.data.filter((user: IInfluencer) => user.typeOfUser === type)
  }
}
