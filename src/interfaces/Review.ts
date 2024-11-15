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
}
