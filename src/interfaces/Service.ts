export interface IService {
  id: string
  name: string
  description: string
  category: string
  price: number
  stars: number
  photo: string
  startDate: Date
  finalDate: Date
  state: string
  userId: number
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
  startDate: Date
  finalDate: Date
}
