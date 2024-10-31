export interface IService {
  id: string
  category: string
  description: string
  final_date: Date
  name: string
  photo: string
  price: number
  start_date: Date
  stars: number
  state: string
  user_id: string
}

export interface IRegisteredService {
  id: number
  registeredAt: string
  category: IService
}

export interface IRegisterServiceRequestDto {
  name: string
}
