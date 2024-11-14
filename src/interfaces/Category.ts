export interface ICategory {
  id: number
  name: string
  display: string
}

export interface IRegisteredCategory {
  id: number
  registeredAt: string
  category: ICategory
}

export interface IRegisterCategoryRequestDto {
  name: string
}
