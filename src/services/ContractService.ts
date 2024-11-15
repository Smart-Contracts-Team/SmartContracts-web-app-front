import { httpClient } from '@/config/httpClient'
import type { IContract, IRegisterContractRequestDto } from '@/interfaces/Contract'
import type { IApiResponse } from '@/interfaces/Common'

const serviceName = '/contract'

export const ContractService = {
  async getContractsByInfluencerId(userId: number): Promise<IContract[]> {
    const response = await httpClient.get<IContract[]>(`${serviceName}/influencer/${userId}`)
    return response.data
  },

  async getContractsByBusinessId(userId: number): Promise<IContract[]> {
    const response = await httpClient.get<IContract[]>(`${serviceName}/business/${userId}`)
    return response.data
  },

  async getContractById(contractId: number): Promise<IContract> {
    const response = await httpClient.get<IContract>(`${serviceName}/${contractId}`)
    return response.data
  },

  async createContract(contract: IRegisterContractRequestDto): Promise<IApiResponse> {
    const response = await httpClient.post<IApiResponse>(`${serviceName}`, contract)
    return response.data
  },

  async updateContract(contractId: number, contract: IRegisterContractRequestDto): Promise<void> {
    const response = await httpClient.put<void>(`${serviceName}/${contractId}`, contract)
    return response.data
  },

  async deleteContract(contractId: number): Promise<IApiResponse> {
    const response = await httpClient.delete<IApiResponse>(`${serviceName}/${contractId}`)
    return response.data
  }
}
