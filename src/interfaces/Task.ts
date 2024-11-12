export interface ITask {
  id: string
  taskName: string
  description: string
  status: string
  dueDate: Date
}

export interface IRegisteredTask {
  id: number
  registeredAt: string
  data: ITask
}

export interface IRegisterTaskRequestDto {
  taskName: string
  description: string
  status: string
  dueDate: Date
}
