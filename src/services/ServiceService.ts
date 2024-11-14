import { httpClient } from '@/config/httpClient'
import type { IService, IRegisterServiceRequestDto } from '@/interfaces/Service'
import { CategoryService } from './CategoryService'
import { PhotoService } from './PhotoService'
import type { IApiResponse } from '@/interfaces/Common'

const serviceName = '/service'

export const ServiceService = {
  async getServiceById(serviceId: number): Promise<IService> {
    const response = await httpClient.get<IService>(`${serviceName}/${serviceId}`)
    return response.data
  },

  async getServicesByUserId(userId: number): Promise<IService[]> {
    const response = await httpClient.get<IService[]>(`${serviceName}/user/${userId}`)
    return response.data
  },

  async getServicesByCategoryName(categoryName: string): Promise<IService[]> {
    const response = await httpClient.get<IService[]>(`${serviceName}/category/${categoryName}`)
    return response.data.filter((service: IService) => service.category === categoryName)
  },

  async createService(service: IRegisterServiceRequestDto, userId: any): Promise<IApiResponse> {
    if (service.stars === undefined) service.stars = 1
    if (service.photo === undefined)
      service.photo =
        'default%2Fimage-default.jpg?alt=media&token=14a980fd-ef8e-4917-a243-65d90839ee44'

    service.userId = userId
    service.category = (await CategoryService.getCategoryName(service.category || '')) || ''

    const response = await httpClient.post<IApiResponse>(`${serviceName}`, service)
    return response.data
  },

  async updateService(serviceId: number, service: IRegisterServiceRequestDto): Promise<void> {
    const response = await httpClient.put<void>(`${serviceName}/${serviceId}`, service)
    return response.data
  },

  async deleteService(serviceId: number): Promise<IApiResponse> {
    /* Obtener todas las tareas asociadas al servicio
    const tasks = await TaskService.getTasksByServiceId(serviceId);

    // Eliminar cada área
    if (tasks.length > 0) {
      await Promise.all(
        tasks.map(async (task) => {
          await TaskService.deleteTask(task.id);
        })
      );
    }*/

    // Eliminar imagen de propiedad de firebase
    const service = await this.getServiceById(serviceId)
    PhotoService.deletePhoto(service)

    const response = await httpClient.delete<IApiResponse>(`${serviceName}/${serviceId}`)
    return response.data
  }
}
