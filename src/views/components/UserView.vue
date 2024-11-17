<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { storageBaseUrl } from '@/config/firebaseConfig'
import { UserService } from '@/services/UserService'
import { ServiceService } from '@/services/ServiceService'
import { CategoryService } from '@/services/CategoryService'
import { ReviewService } from '@/services/ReviewService'
import type { IUser } from '@/interfaces/User'
import type { IService } from '@/interfaces/Service'
import type { IReview } from '@/interfaces/Review'

const user = ref<IUser | null>(null)
const services = ref<IService[]>([])
const reviews = ref<IReview[]>([])
const pageReady = ref(false)
const userLoading = ref(true)
const servicesLoading = ref(true)
const reviewsLoading = ref(true)
const props = defineProps<{ userId: number }>()

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

watch(
  () => props.userId,
  async (newUserId) => {
    pageReady.value = false
    // Reset services and reviews while waiting for the new user data
    services.value = []
    reviews.value = []

    try {
      await getUser(newUserId)
      await loadServices(newUserId)
      await loadReviews(newUserId)
    } catch (error) {
      console.error('Error al actualizar datos para el nuevo usuario:', error)
    } finally {
      pageReady.value = true
    }
  }
)

onMounted(async () => {
  await getUser(props.userId)
  await loadServices(props.userId)
  await loadReviews(props.userId)
})

async function getUser(userId: number) {
  try {
    const response = await UserService.getUserById(userId)
    user.value = response
    pageReady.value = true
  } catch (error: any) {
    console.error(
      error.response ? 'Error al obtener al usuario:' : 'Token no encontrado en localStorage',
      error
    )
  } finally {
    userLoading.value = false
  }
}

async function loadServices(userId: number) {
  try {
    const [servicesResponse, categories] = await Promise.all([
      ServiceService.getServicesByUserId(userId),
      CategoryService.getCategories()
    ])

    services.value = servicesResponse.map((service) => {
      const category = categories.find((cat) => cat.name === service.category)
      return {
        ...service,
        categoryDisplay: category ? category.display : 'Sin categoría'
      }
    })
  } catch (error: any) {
    console.error(
      error.response ? 'Error al obtener los servicios:' : 'Token no encontrado en localStorage',
      error
    )
  } finally {
    servicesLoading.value = false
  }
}

async function loadReviews(userId: number) {
  try {
    const reviewsResponse = await ReviewService.getReviewsByUserId(userId)
    const reviewsWithAuthorInfo = await Promise.all(
      reviewsResponse.map(async (review) => {
        const author = await UserService.getUserById(review.authorId)
        return {
          ...review,
          authorPhoto: author ? author.photo : '',
          authorName: author ? author.user_name : ''
        }
      })
    )
    reviews.value = reviewsWithAuthorInfo
  } catch (error: any) {
    console.error(
      error.response ? 'Error al obtener las reseñas:' : 'Token no encontrado en localStorage',
      error
    )
  } finally {
    reviewsLoading.value = false
  }
}

const isInfluencer = computed(() => {
  return user.value && user.value.typeOfUser === 'Influencer'
})
</script>

<template>
  <Fluid v-if="pageReady">
    <!-- Información del usuario -->
    <div class="card grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
      <div class="flex flex-col items-center justify-center">
        <div class="font-bold text-2xl mb-4">@{{ user?.user_name }}</div>
        <div class="flex justify-center items-center w-64 h-64 rounded-full overflow-hidden">
          <Image
            v-if="user"
            :src="`${storageBaseUrl}${user.photo}`"
            :alt="user.user_name"
            width="250"
            class="object-cover"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div v-if="isInfluencer" class="flex flex-wrap gap-2 w-full">
          <label for="firstname" class="font-bold">Firstname:</label>
          <p v-if="user" id="firstname" type="text">{{ user.firstName }}</p>
        </div>

        <div v-if="isInfluencer" class="flex flex-wrap gap-2 w-full">
          <label for="lastname" class="font-bold">Lastname:</label>
          <p v-if="user" id="lastname" type="text">{{ user.lastName }}</p>
        </div>

        <div class="flex flex-wrap gap-2 w-full">
          <label for="username" class="font-bold"
            >{{ !isInfluencer ? 'Business Name' : 'Username' }}:</label
          >
          <p v-if="user" id="username" type="text">{{ user.user_name }}</p>
        </div>

        <div class="flex flex-wrap gap-2 w-full">
          <label for="email" class="font-bold">Email:</label>
          <p v-if="user" id="email" type="text">{{ user.email }}</p>
        </div>

        <div class="flex flex-wrap gap-2 w-full">
          <label for="ruc" class="font-bold">RUC:</label>
          <p v-if="user" id="ruc" type="text">{{ user.ruc }}</p>
        </div>

        <div v-if="isInfluencer" class="flex flex-wrap gap-2 w-full">
          <label for="phone" class="font-bold">Phone:</label>
          <p v-if="user" id="phone" type="text">{{ user.phone }}</p>
        </div>

        <div v-if="isInfluencer" class="flex flex-wrap gap-2 w-full">
          <label for="birthdate" class="font-bold">Birthdate:</label>
          <p v-if="user" id="birthdate" type="text">{{ user.birthDate }}</p>
        </div>

        <div class="flex flex-wrap gap-2 w-full">
          <label for="location" class="font-bold">Location:</label>
          <p v-if="user" id="location" type="text">{{ user.location }}</p>
        </div>
      </div>
    </div>

    <!-- Services -->
    <div v-if="isInfluencer" class="flex flex-col gap-8 w-full">
      <div class="card w-full">
        <div class="font-bold text-2xl mb-4">Services</div>
        <Carousel
          :value="services"
          :numVisible="3"
          :numScroll="3"
          :responsiveOptions="carouselResponsiveOptions"
        >
          <template #item="slotProps">
            <div
              v-if="!servicesLoading"
              class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4 flex flex-col h-full"
            >
              <div class="mb-4 flex-grow">
                <div class="relative mx-auto image-container">
                  <img
                    :src="`${storageBaseUrl}` + slotProps.data.photo"
                    :alt="slotProps.data.name"
                    class="w-full rounded service-image-size"
                  />
                  <Tag
                    :value="slotProps.data.categoryDisplay"
                    class="absolute"
                    style="left: 5px; top: 5px"
                  />
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
    </div>

    <!-- Reviews -->
    <div class="flex flex-col gap-8 w-full mt-8">
      <div class="card w-full">
        <div class="font-bold text-2xl mb-4">Reviews</div>
        <div v-if="reviews.length > 0 && !reviewsLoading">
          <Panel v-for="reviews in reviews" :key="reviews.id" class="mb-4">
            <template #header>
              <div class="flex items-center pl-2">
                <Avatar
                  :image="`${storageBaseUrl}${reviews.authorPhoto}`"
                  shape="circle"
                  class="cursor-pointer"
                  @click="$router.push(`/user-information/` + reviews.authorId)"
                />
                <span
                  class="font-bold p-2 cursor-pointer"
                  @click="$router.push(`/user-information/` + reviews.authorId)"
                  >{{ reviews.authorName }}</span
                >
              </div>
            </template>
            <template #footer>
              <div class="flex flex-wrap items-center justify-end gap-4">
                <span class="text-surface-500 dark:text-surface-400">{{
                  reviews.dateCreated
                }}</span>
              </div>
            </template>
            <p class="m-0 mb-2 text-surface-500 dark:text-surface-400">{{ reviews.serviceName }}</p>
            <div class="flex items-center mb-4">
              <label class="mr-2 font-semibold">Rating:</label>
              <Rating v-model="reviews.stars" readonly />
            </div>
            <p class="font-bold m-0 mb-2">{{ reviews.title }}</p>
            <p class="m-0">{{ reviews.description }}</p>
          </Panel>
        </div>
        <div v-else>
          <p>No reviews yet.</p>
        </div>
      </div>
    </div>
  </Fluid>
</template>
