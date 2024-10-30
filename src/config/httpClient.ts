import axios from 'axios'
import { environment } from '../environments/dev.env'

export const httpClient = axios.create({
  baseURL: environment.apiUrl
})
