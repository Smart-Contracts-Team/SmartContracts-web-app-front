import { httpClient } from '@/config/httpClient'
import type { IReview, IRegisterReviewRequestDto } from '@/interfaces/Review'
import type { IApiResponse } from '@/interfaces/Common'

const serviceName = '/review'

export const ReviewService = {
  async getReviewById(reviewId: number): Promise<IReview> {
    const response = await httpClient.get<IReview>(`${serviceName}/${reviewId}`)
    return response.data
  },

  async getReviewsByServiceId(serviceId: number): Promise<IReview[]> {
    const response = await httpClient.get<IReview[]>(`${serviceName}/service/${serviceId}`)
    return response.data
  },

  async getReviewsByUserId(influencerId: number): Promise<IReview[]> {
    const response = await httpClient.get<IReview[]>(`${serviceName}/influencer/${influencerId}`)
    return response.data
  },

  // TODO
  async createReview(review: IRegisterReviewRequestDto): Promise<IApiResponse> {
    const response = await httpClient.post<IApiResponse>(`${serviceName}`, review)
    return response.data
  },

  async updateReview(reviewId: number, review: IRegisterReviewRequestDto): Promise<void> {
    const response = await httpClient.put<void>(`${serviceName}/${reviewId}`, review)
    return response.data
  },

  async deleteReview(reviewId: number): Promise<IApiResponse> {
    const response = await httpClient.delete<IApiResponse>(`${serviceName}/${reviewId}`)
    return response.data
  }
}
