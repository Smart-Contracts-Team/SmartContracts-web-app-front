export interface IService {
  id: string
  name: string
  description: string
  category: string
  price: number
  stars: number
  photo: string
  startDate: Date
  final_date: Date
  state: string
  user_id: string
  tasks: []
}

export interface IRegisteredService {
  id: number
  registeredAt: string
  data: IService
}

export interface IRegisterServiceRequestDto {
  userId: number
  name: string
  description: string
  category: string
  price: number
  stars: number
  photo: string
  state: string
  startDate: string
  finalDate: string
}
