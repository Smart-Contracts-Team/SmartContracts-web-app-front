import { httpClient } from '@/config/httpClient'
import {
  type ICategory,
  type IRegisteredCategory,
  type IRegisterCategoryRequestDto
} from '@/interfaces/Category'
import type { IApiResponse } from '@/interfaces/Common'

const serviceName = '/categories'

export const CategoryService = {
  async getCategories(): Promise<IApiResponse<IRegisteredCategory[]>> {
    const response = await httpClient.get<IApiResponse<IRegisteredCategory[]>>(`${serviceName}`)
    return response.data
  },

  async getCategoriesMini(): Promise<IApiResponse<IRegisteredCategory[]>> {
    const response = await httpClient.get<IApiResponse<IRegisteredCategory[]>>(`${serviceName}`)
    const dataArray = Object.values(response.data.data)
    return {
      ...response.data,
      data: dataArray.slice(0, 5)
    }
  },

  async getCategoriesSmall(): Promise<IApiResponse<IRegisteredCategory[]>> {
    const response = await httpClient.get<IApiResponse<IRegisteredCategory[]>>(`${serviceName}`)
    const dataArray = Object.values(response.data.data)
    return {
      ...response.data,
      data: dataArray.slice(0, 10)
    }
  },

  async createCategory(category: IRegisterCategoryRequestDto): Promise<IApiResponse> {
    const response = await httpClient.post<IApiResponse>(`${serviceName}/register`, category)
    return response.data
  },

  async deleteCategory(categoryId: string): Promise<IApiResponse> {
    const response = await httpClient.delete<IApiResponse>(
      `${serviceName}/unregister/${categoryId}`
    )
    return response.data
  },

  async getCategoryById(categoryId: string): Promise<ICategory[]> {
    const response = await httpClient.get<ICategory[]>(`${serviceName}/?id=${categoryId}`)
    return response.data
  },

  async updateCategory(categoryId: string, categoryData: ICategory): Promise<void> {
    const response = await httpClient.put<void>(`${serviceName}/${categoryId}`, categoryData)
    return response.data
  },

  async getProductsByCategoryName(categoryName: string): Promise<IApiResponse<[]>> {
    // Obtener todas las categorías
    const categoriesResponse =
      await httpClient.get<IApiResponse<{ id: string; name: string }[]>>(`/categories`)
    const categories = categoriesResponse.data

    // Encontrar la categoría cuyo nombre coincida
    const category = categories.find((cat) => cat.name === categoryName)

    if (!category) {
      throw new Error(`Category with name "${categoryName}" not found`)
    }

    // Obtener productos con el category_id de la categoría encontrada
    const response = await httpClient.get<IApiResponse<[]>>(`/products?category_id=${category.id}`)
    return response.data
  }
}
