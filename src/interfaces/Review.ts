import type { IService } from './Service'

export interface IReview {
  id: number
  title: string
  description: string
  serviceName: string
  dateCreated: Date
  stars: number
  authorId: number
  influencerId: number
  serviceId: number
  authorPhoto?: string
  authorName?: string
}

export interface IRegisteredReview {
  id: number
  registeredAt: string
  data: IReview
}

export interface IRegisterReviewRequestDto {
  title: string
  description: string
  serviceName: string
  dateCreated: Date
  stars: number
  authorId: number
  influencerId: number
  serviceId: number
  aux?: IService
}
