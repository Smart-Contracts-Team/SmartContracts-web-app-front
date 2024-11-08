export interface IUser {
  id: string
  user_name: string
  firstName: string
  lastName: string
  typeOfUser: string
  ruc: string
  email: string
  password: string
  phone: string
  birthDate: string
  photo: string
  location: string
  role: string
}

export interface IRegisteredUser {
  id: number
  registeredAt: string
  data: IUser
}

export interface IRegisterUserRequestDto {
  id: number
  token: string
  success: boolean
  typeOfUser: string
}

// Default image profile url: user-profile.png?alt=media&token=e0e6d954-f22d-43ba-bf97-1ebd5d28e3c9
