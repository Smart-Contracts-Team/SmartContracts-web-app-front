export interface ICategory {
  id: string
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
