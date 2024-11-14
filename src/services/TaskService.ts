import { httpClient } from '@/config/httpClient'
import type { ITask, IRegisterTaskRequestDto } from '@/interfaces/Task'
import type { IApiResponse } from '@/interfaces/Common'

const serviceName = '/task'

export const TaskService = {
  async getTaskById(taskId: number): Promise<ITask> {
    const response = await httpClient.get<ITask>(`${serviceName}/${taskId}`)
    return response.data
  },

  async getTasksByServiceId(serviceId: number): Promise<ITask[]> {
    const response = await httpClient.get<ITask[]>(`service/${serviceName}/${serviceId}`)
    return response.data
  },

  async createTask(task: IRegisterTaskRequestDto): Promise<IApiResponse> {
    const response = await httpClient.post<IApiResponse>(`${serviceName}`, task)
    return response.data
  },

  async updateTask(taskId: number, task: IRegisterTaskRequestDto): Promise<void> {
    const response = await httpClient.put<void>(`${serviceName}/${taskId}`, task)
    return response.data
  },

  async deleteTask(taskId: number): Promise<IApiResponse> {
    const response = await httpClient.delete<IApiResponse>(`${serviceName}/${taskId}`)
    return response.data
  }
}
