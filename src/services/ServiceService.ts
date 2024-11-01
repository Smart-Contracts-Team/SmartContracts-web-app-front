import { httpClient } from '@/config/httpClient'
import { type IService } from '@/interfaces/Service'
import { CategoryService } from './CategoryService'

const serviceName = '/service'

export const ServiceService = {
  async getServicesByUserId(userId: any) {
    const response = await httpClient.get<[]>(`${serviceName}/user/${userId}`)
    return response.data
  },

  async getServicesByCategoryName(categoryName: string): Promise<IService[]> {
    // Obtiene el display name de la categoría
    const displayName = await CategoryService.getDisplayByName(categoryName)

    if (!displayName) {
      throw new Error(`No se encontró la categoría con el nombre: ${categoryName}`)
    }

    // Llama al endpoint con el display name en lugar del name
    const response = await httpClient.get<IService[]>(`${serviceName}/category/${displayName}`)

    // Retorna los servicios
    return response.data.filter((service: IService) => service.category === displayName)
  }
}
