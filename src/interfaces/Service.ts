import type { ITask } from './Task'

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
  tasks: ITask[]
}

export interface IRegisteredService {
  id: number
  registeredAt: string
  data: IService
}

export interface IRegisterServiceRequestDto {
  id?: string
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
  tasks: ITask[]
}
