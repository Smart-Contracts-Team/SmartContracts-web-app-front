<script setup lang="ts">
import { PhotoService } from '@/services/PhotoService'
import { ServiceService } from '@/services/ServiceService'
import { onMounted, ref } from 'vue'

const services = ref([])
const images = ref([])
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

    if (!userId) {
      console.error('User ID is not available.')
      return
    }

    const response = await ServiceService.getServicesSmallByUserId(userId)
    console.log('Respuesta de la API:', response) // Verifica lo que regresa la API
    services.value = response // Asigna la respuesta a services.value
  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data)
      console.error('Código de estado:', error.response.status)
    } else if (error.request) {
      console.error('Error en la solicitud:', error.request)
      console.error('Detalles de la solicitud:', {
        method: error.request.method,
        url: error.request.url,
        headers: error.request.headers,
        responseType: error.request.responseType,
        timeout: error.request.timeout
      })
    } else {
      console.error('Error', error.message)
    }
  }
})
</script>

<template>
  <!-- Offers of the day -->
  <div class="card">
    <div class="font-semibold text-xl mb-4">Ofertas del Día</div>
    <Carousel
      :value="services"
      :numVisible="4"
      :numScroll="4"
      :responsiveOptions="carouselResponsiveOptions"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-full rounded"
              />
              <div
                class="dark:bg-surface-900 absolute rounded-border"
                style="left: 5px; top: 5px"
              ></div>
            </div>
          </div>
          <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
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
    <div class="font-semibold text-xl mb-4">Influencers más populares</div>
    <Carousel
      :value="services"
      :numVisible="4"
      :numScroll="4"
      :responsiveOptions="carouselResponsiveOptions"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-full rounded"
              />
              <div
                class="dark:bg-surface-900 absolute rounded-border"
                style="left: 5px; top: 5px"
              ></div>
            </div>
          </div>
          <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
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
</template>
