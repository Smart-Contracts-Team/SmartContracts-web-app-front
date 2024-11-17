<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import { storageBaseUrl } from '@/config/firebaseConfig'
import { ServiceService } from '@/services/ServiceService'
import { CategoryService } from '@/services/CategoryService'
import type { IService } from '@/interfaces/Service'

const services = ref<IService[]>([])
const props = defineProps<{ categoryName: string }>()
const picklistServices = ref<IService[][]>([[], []])
const orderlistServices = ref<IService[]>([])
const options = ref(['grid', 'list'])
const layout = ref('grid')
const categoryDisplayName = ref('')
const loading = ref(true)

onMounted(() => fetchData(props.categoryName))

const fetchData = async (categoryName: string) => {
  loading.value = true
  try {
    // Buscar el nombre de la categoría en display
    categoryDisplayName.value =
      (await CategoryService.getCategories()).find((category) => category.name === categoryName)
        ?.display || categoryName

    // Obtener los servicios de la categoría
    const data = await ServiceService.getServicesByCategoryName(categoryName)
    services.value = data
    picklistServices.value = [data, []]
    orderlistServices.value = data
  } catch (error) {
    console.error('Error fetching services or category display name:', error)
  } finally {
    loading.value = false
  }
}

watch(
  () => props.categoryName,
  (newCategory) => {
    fetchData(newCategory)
  }
)
</script>

<template>
  <div class="flex flex-col">
    <div class="card">
      <div class="font-semibold text-xl">Servicios en la categoría: {{ categoryDisplayName }}</div>

      <div v-if="loading" class="card flex justify-center">
        <ProgressSpinner />
      </div>

      <DataView v-else :value="services" :layout="layout">
        <template #header>
          <div class="flex justify-end">
            <SelectButton v-model="layout" :options="options" :allowEmpty="false">
              <template #option="{ option }">
                <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
              </template>
            </SelectButton>
          </div>
        </template>

        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div
                class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                :class="{ 'border-t border-surface': index !== 0 }"
              >
                <div class="md:w-40 relative">
                  <img
                    class="block xl:block mx-auto rounded w-full"
                    :src="`${storageBaseUrl}` + item.photo"
                    :alt="item.name"
                  />
                </div>
                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                  <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                    <div>
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                        item.name
                      }}</span>
                      <div class="text-lg font-medium mt-2">{{ item.description }}</div>
                    </div>
                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                      <div
                        class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                        style="
                          border-radius: 30px;
                          box-shadow:
                            0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                            0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                        "
                      >
                        <span class="text-surface-900 font-medium text-sm">{{ item.stars }}</span>
                        <i class="pi pi-star-fill text-yellow-500"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col md:items-end gap-8">
                    <span class="text-xl font-semibold">${{ item.price }}</span>
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                      <Button
                        icon="pi pi-plus"
                        label="View more"
                        class="flex-auto md:flex-initial whitespace-nowrap"
                        @click="$router.push(`/tasks/service/${item.id}`)"
                      ></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #grid="slotProps">
          <div class="grid grid-cols-12 gap-4">
            <div
              v-for="(item, index) in slotProps.items"
              :key="index"
              class="col-span-12 sm:col-span-6 lg:col-span-4 p-2"
            >
              <div
                class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col h-full"
                style="min-height: 400px"
              >
                <div class="bg-surface-50 flex justify-center rounded p-4 flex-grow">
                  <div class="relative mx-auto">
                    <img
                      class="rounded w-full"
                      :src="`${storageBaseUrl}` + item.photo"
                      :alt="item.name"
                      style="max-width: 300px"
                    />
                  </div>
                </div>
                <div class="pt-6 flex flex-col flex-grow">
                  <div class="flex flex-row justify-between items-start gap-2">
                    <div>
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                        item.name
                      }}</span>
                      <div class="text-lg font-medium mt-1">{{ item.description }}</div>
                    </div>
                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                      <div
                        class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2 rounded-full shadow-sm"
                      >
                        <span class="text-surface-900 font-medium text-sm">{{ item.stars }}</span>
                        <i class="pi pi-star-fill text-yellow-500"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-6 mt-6">
                    <div class="flex justify-between items-center">
                      <span class="text-2xl font-semibold">${{ item.price }}</span>
                      <span>
                        <Button
                          icon="pi pi-plus"
                          label="View more"
                          class="flex-auto whitespace-nowrap ml-2"
                          @click="$router.push(`/tasks/service/${item.id}`)"
                        ></Button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>
