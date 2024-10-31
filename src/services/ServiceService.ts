import { httpClient } from '@/config/httpClient'

const serviceName = '/service'

export const ServiceService = {
  async getServicesSmallByUserId(userId: any) {
    const response = await httpClient.get<[]>(`${serviceName}/user/${userId}`)
    return response.data
  }

  /*async getServicesByCategoryName(
    categoryName: string
  ): Promise<IApiResponse<IRegisteredService[]>> {
    const response = await httpClient.get<IApiResponse<IRegisteredService[]>>(`${serviceName}`)

    // Filtrar los servicios que corresponden a la categoría
    const filteredServices = response.data.data.filter(
      (service: IRegisteredService) => service.category === categoryName
    )

    return {
      ...response.data,
      data: filteredServices
    }
  },

  async getFilteredServices(limit: number = 6): Promise<any[]> {
    const allServices = await this.getServicesSmall()
    return allServices.slice(0, limit)
  }*/
}
