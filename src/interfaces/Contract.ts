import type { IService } from './Service'

export interface IContract {
  id: number
  title: string
  description: string
  startDate: Date
  finalDate: Date
  price: number
  status: string
  type: string
  businessId: number
  influencerId: number
  services: IService[]
}

export interface IRegisteredContract {
  id: number
  registeredAt: string
  data: IContract
}

export interface IRegisterContractRequestDto {
  title: string
  description: string
  startDate: Date
  finalDate: Date
  price: number
  status: string
  type: string
  businessId: number
  influencerId: number
  services: IService[]
}
