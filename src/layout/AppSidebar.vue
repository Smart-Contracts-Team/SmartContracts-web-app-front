<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppMenu from './AppMenu.vue';
import { EthereumService } from '@/services/EthereumService';

const ethereumNetwork = ref<string | null>(null);
const ethereumBalance = ref<string | null>(null);

const fetchEthereumNetwork= async () => {
  try {
    const response = await EthereumService.getEthereumNetworkId();
    ethereumNetwork.value = `${response} ETH`; // Formatear el balance
  } catch (error) {
    console.error('Error fetching ethereum network', error);
    ethereumNetwork.value = 'Error al obtener network';
  }
};

const fetchEthereumBalance = async () => {
  try{
    const response = await EthereumService.getEthereumBalance();
    const balanceInWei = response; // El balance que recibes está en WEI

    // Convertir el balance de WEI a ETH
    const balanceInEth = EthereumService.convertWeiToEth(balanceInWei);
    
    // Asignar el balance convertido a la variable reactiva
    ethereumBalance.value = `${balanceInEth} ETH`; 
  } catch(error){
    console.error('Error fetching ethereum balance', error);
    ethereumNetwork.value = 'Error al obtener balance';
  }
}

onMounted(() => {
  fetchEthereumNetwork();
  fetchEthereumBalance();
});

</script>

<template>
  <div class="layout-sidebar">
    <app-menu></app-menu>

    <div class="ethereum-network">
      {{ ethereumNetwork }}
    </div>

    <div class="ethereum-balance">
      <!-- Logo de ETH junto con el balance -->
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg" alt="ETH Logo" class="eth-logo" />
      {{ ethereumBalance }}
    </div>

  </div>
</template>

<style lang="scss" scoped>
.layout-sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

app-menu {
  flex-grow: 1;
}

.ethereum-network {
  margin-top: 100px;  /* Espacio superior */
  padding: 1rem;
  font-weight: bold;
  color:#10b981;
  text-align: center; /* Centrado de texto */
}

.ethereum-balance {
  margin-top: 5px; /* Espacio entre el balance y la red */
  padding: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eth-logo {
  width: 30px;  /* Tamaño del logo */
  height: auto;
  margin-right: 10px; /* Espacio entre la imagen y el balance */
}
</style>
