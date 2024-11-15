import { httpClient } from '@/config/httpClient'
import type { ISmartContractInfo, IContractDto } from '@/interfaces/Contract'

const ethereumServiceName = '/ethereum'
const userAdressETH = '/0xfE1F769BBd37f29BDC99F79e038A0652881a9aB1'

export const EthereumService ={
    async getEthereumNetworkId(){
        const networkResponse = await httpClient.get<string>(`${ethereumServiceName}/network`);
        return networkResponse.data
    },

    async getEthereumBalance(){
        const ethereumBalance = await httpClient.get<string>(`${ethereumServiceName}/balance${userAdressETH}`);
        return ethereumBalance.data
    },

    async getSmartContractData(smartcontractId: string): Promise<{ contractId: string, influencerId: string, businessId: string }> {
        try {
          const response = await httpClient.get<Array<BigInt>>(
            `${ethereumServiceName}/smartcontract/${smartcontractId}`
          );
    
          // Asume que el arreglo tiene tres elementos: contractId, influencerId, businessId
          const [contractId, influencerId, businessId] = response.data;
    
          // Retorna como objeto para mayor claridad
          return {
            contractId: contractId.toString(),
            influencerId: influencerId.toString(),
            businessId: businessId.toString(),
          };
        } catch (error) {
          console.error('Error fetching smart contract data', error);
          throw new Error('Failed to fetch smart contract data');
        }
    },

    // Método para convertir el balance de WEI a ETH
    convertWeiToEth(wei: string): string {
        const weiToEth = 1e18; // 1 ETH = 10^18 WEI
        const eth = parseFloat(wei) / weiToEth; // Convierte de WEI a ETH
        return eth.toFixed(18); // Devolver con 18 decimales
    }
}