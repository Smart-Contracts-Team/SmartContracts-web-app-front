<script setup lang="ts">
import { storageBaseUrl } from '@/config/firebaseConfig'
import type { IUser } from '@/interfaces/User'
import type { IService } from '@/interfaces/Service'
import { ServiceService } from '@/services/ServiceService'
import { UserService } from '@/services/UserService'
import { computed, onMounted, ref } from 'vue'

const userId = Number(localStorage.getItem('userId'))
const user = ref<IUser | null>(null)
const services = ref<IService[]>([])
const business = ref<IUser[]>([])
const influencers = ref<IUser[]>([])

const carouselResponsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3
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
  await loadServices()
  await getUsersByType()
  await getUser(userId)
})

async function loadServices(){
  try {    
    const response = await ServiceService.getServicesByUserId(userId)
    services.value = response
  } catch (error: any) {
    console.error(
      error.response ? 'Error al obtener los servicios:' : 'Token no encontrado en localStorage',
      error
    )
  }
}

async function getUsersByType(){
  try {
    business.value = await UserService.getUserByType('Business')
  } catch (error) {
    console.error('Error al obtener las empresas:', error)
  }

  try {
    influencers.value = await UserService.getUserByType('Influencer')
  } catch (error) {
    console.error('Error al obtener las empresas:', error)
  }
}

async function getUser(userId: number) {
  try {
    const response = await UserService.getUserById(userId)
    user.value = response
  } catch (error: any) {
    console.error(
      error.response ? 'Error al obtener al usuario:' : 'Token no encontrado en localStorage',
      error
    )
  }
}

const isInfluencer = computed(() => {
  console.log("user:", user)
  return user.value && user.value.typeOfUser === 'Influencer'
})
</script>

<template>
  <!-- My Services -->
  <div v-if="isInfluencer" class="card">
    <div class="font-semibold text-xl mb-4">Mis Servicios Populares</div>
    <Carousel
      :value="services"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="carouselResponsiveOptions"
    >
      <template #item="slotProps">
        <div
          class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4 flex flex-col h-full"
        >
          <div class="mb-4 flex-grow">
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
          <div class="mb-4 font-medium flex-grow">{{ slotProps.data.description }}</div>
          <div class="flex justify-between items-center mt-auto">
            <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
            <span>
              <Button
                icon="pi pi-plus"
                label="View more"
                class="ml-2"
                @click="$router.push(`/tasks/service/${slotProps.data.id}`)"
              />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>

  <!-- Popular Business -->
  <div v-if="isInfluencer" class="card">
    <div class="font-semibold text-xl mb-4">Empresas Populares</div>
    <Carousel
      :value="business"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="carouselResponsiveOptions"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-3">
            <div class="relative mx-auto image-container">
              <img
                :src="`${storageBaseUrl}` + slotProps.data.photo"
                :alt="slotProps.data.user_name"
                class="w-full rounded business-image-size"
              />
              <div
                class="dark:bg-surface-900 absolute rounded-border"
                style="left: 5px; top: 5px"
              ></div>
            </div>
          </div>
          <div class="mb-4 font-semibold text-xl">{{ slotProps.data.user_name }}</div>
          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl"></div>
            <span>
              <Button
                icon="pi pi-plus"
                label="View more"
                class="ml-2"
                @click="$router.push(`/user-information/${slotProps.data.id}`)"
              />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>

  <!-- Popular Influencers -->
  <div v-if="!isInfluencer" class="card">
    <div class="font-semibold text-xl mb-4">Influencers Populares</div>
    <Carousel
      :value="influencers"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="carouselResponsiveOptions"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-3">
            <div class="relative mx-auto image-container">
              <img
                :src="`${storageBaseUrl}` + slotProps.data.photo"
                :alt="slotProps.data.user_name"
                class="w-full rounded business-image-size"
              />
              <div
                class="dark:bg-surface-900 absolute rounded-border"
                style="left: 5px; top: 5px"
              ></div>
            </div>
          </div>
          <div class="mb-4 font-semibold text-xl">{{ slotProps.data.user_name }}</div>
          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl"></div>
            <span>
              <Button
                icon="pi pi-plus"
                label="View more"
                class="ml-2"
                @click="$router.push(`/user-information/${slotProps.data.id}`)"
              />
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
