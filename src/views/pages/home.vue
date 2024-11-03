<script setup lang="ts">
import { storageBaseUrl } from '@/config/firebaseConfig';
import type { IUser } from '@/interfaces/User';
import type { IService } from '@/interfaces/Service';
import { ServiceService } from '@/services/ServiceService'
import { UserService } from '@/services/UserService';
import { onMounted, ref } from 'vue'

const services = ref<IService[]>([]);
const business = ref<IUser[]>([]);
const carouselResponsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 4,
    numScroll: 4
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
])

onMounted(async () => {
  try {
    const userId = Number(localStorage.getItem('userId'))
    const response = await ServiceService.getServicesByUserId(userId)
    services.value = response
  } catch (error) {
    console.error(error.response ? 'Error al obtener los servicios:' : 'Token no encontrado en localStorage', error);
  }

  try {
    business.value = await UserService.getUserByType('Business');
  } catch (error) {
    console.error('Error al obtener las empresas:', error);
  }
})
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Mis Servicios Populares</div>
    <Carousel
      :value="services"
      :numVisible="4"
      :numScroll="4"
      :responsiveOptions="carouselResponsiveOptions"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-4">
            <div class="relative mx-auto image-container">
              <img
                :src="`${storageBaseUrl}` + slotProps.data.photo"
                :alt="slotProps.data.name"
                class="w-full rounded service-image-size"
              />
              <div
                class="dark:bg-surface-900 absolute rounded-border"
                style="left: 5px; top: 5px"
              ></div>
            </div>
          </div>
          <div class="mb-4 font-medium">{{ slotProps.data.description }}</div>
          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
            <span>
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-shopping-cart" class="ml-2" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>

  <!-- Popular -->
  <div class="card">
    <div class="font-semibold text-xl mb-4">Empresas Populares</div>
    <Carousel
      :value="business"
      :numVisible="4"
      :numScroll="4"
      :responsiveOptions="carouselResponsiveOptions"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-3">
            <div class="relative mx-auto image-container">
              <img
                :src="`${storageBaseUrl}` + slotProps.data.photo"
                :alt="slotProps.data.firstName"
                class="w-full rounded business-image-size"
              />
              <div
                class="dark:bg-surface-900 absolute rounded-border"
                style="left: 5px; top: 5px"
              ></div>
            </div>
          </div>
          <div class="mb-4 font-semibold text-xl">{{ slotProps.data.firstName }}</div>
          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl"></div>
            <span>
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-shopping-cart" class="ml-2" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.service-image-size {
  max-width: 350px;
  max-height: 350px;
}

.business-image-size {
  max-width: 150px;
  max-height: 150px;
}
</style>