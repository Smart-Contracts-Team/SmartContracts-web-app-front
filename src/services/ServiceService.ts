import { httpClient } from '@/config/httpClient'
import type { IService, IRegisterServiceRequestDto } from '@/interfaces/Service'
import { CategoryService } from './CategoryService'
import type { IApiResponse } from '@/interfaces/common'
import { PhotoService } from './PhotoService'

const serviceName = '/service'

export const ServiceService = {
  async getServiceById(serviceId: string): Promise<IApiResponse<IService[]>> {
    const response = await httpClient.get<IApiResponse<IService[]>>(`${serviceName}/${serviceId}`)
    return response.data
  },

  async getServicesByUserId(userId: number): Promise<IApiResponse<IService[]>> {
    const response = await httpClient.get<IApiResponse<IService[]>>(`${serviceName}/user/${userId}`)
    return response.data
  },

  async getServicesByCategoryName(categoryName: string): Promise<IService[]> {
    const displayName = await CategoryService.getDisplayByName(categoryName)
    if (!displayName) {
      throw new Error(`No se encontró la categoría con el nombre: ${categoryName}`)
    }

    const response = await httpClient.get<IService[]>(`${serviceName}/category/${displayName}`)
    return response.data.filter((service: IService) => service.category === displayName)
  },

  async createService(service: IRegisterServiceRequestDto, userId: any): Promise<IApiResponse> {
    if (service.stars === undefined) service.stars = 1
    if (service.photo === undefined)
      service.photo = 'user-profile.png?alt=media&token=e0e6d954-f22d-43ba-bf97-1ebd5d28e3c9'
    if (service.state === undefined) service.state = 'abierto'
    if (service.startDate === undefined) service.startDate = '2024-11-05'
    if (service.finalDate === undefined) service.finalDate = '2024-11-05'

    service.userId = userId
    const response = await httpClient.post<IApiResponse>(`${serviceName}`, service)
    return response.data
  },

  async updateService(serviceId: string, service: IRegisterServiceRequestDto): Promise<void> {
    if (service.photo === undefined)
      service.photo = 'user-profile.png?alt=media&token=e0e6d954-f22d-43ba-bf97-1ebd5d28e3c9'
    // TODO: If the image is edited, the previous image must be deleted
    const response = await httpClient.put<void>(`${serviceName}/${serviceId}`, service)
    return response.data
  },

  async deleteService(serviceId: string): Promise<IApiResponse> {
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
