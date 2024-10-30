export interface ICategory {
  id: string
  name: string
  display: string
}

export interface IRegisteredCategory {
  id: number
  registeredAt: string
  category: ICategory
  //areaId: string;
}

export interface IRegisterCategoryRequestDto {
  name: string
}
