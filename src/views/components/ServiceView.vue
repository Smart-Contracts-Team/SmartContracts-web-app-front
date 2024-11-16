<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storageBaseUrl } from '@/config/firebaseConfig'
import { ServiceService } from '@/services/ServiceService'
import { UserService } from '@/services/UserService'
import type { IService } from '@/interfaces/Service'
import { TaskService } from '@/services/TaskService'
import type { ITask } from '@/interfaces/Task'

const tasks = ref<ITask[]>([])
const service = ref<IService | null>(null)
const user = ref<IUser | null>(null)
const props = defineProps<{ serviceId: number }>()

onMounted(async () => {
  try {
    // Obtener el servicio por serviceId
    const servicedata = await ServiceService.getServiceById(props.serviceId)
    service.value = servicedata

    // Obtener la información del usuario asociado al servicio
    if (servicedata?.userId) {
      const userdata = await UserService.getUserById(servicedata.userId)
      user.value = userdata
    }

    // Obtener las tareas asociadas al servicio
    const tasksdata = await TaskService.getTasksByServiceId(props.serviceId)
    tasks.value = tasksdata
  } catch (error) {
    console.error('Error al obtener los datos:', error)
  }
})

const formatDate = (date: Date) => {
  const d = new Date(date)
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

const getSeverity = (status: string) => {
  switch (status) {
    case 'done':
      return { severity: 'success', label: 'Done' }
    case 'active':
      return { severity: 'success', label: 'Active' }
    case 'to-do':
      return { severity: 'warn', label: 'To-Do' }
    case 'inactive':
      return { severity: 'warn', label: 'Inactive' }
    case 'in-process':
      return { severity: 'secondary', label: 'In Process' }
    case 'pending':
      return { severity: 'secondary', label: 'Pending' }
    default:
      return { severity: 'secondary', label: 'Undefined' }
  }
}
</script>

<template>
  <Fluid>
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Información del Servicio -->
      <div class="card flex flex-col md:flex-row gap-8 w-full">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-wrap gap-2 w-full">
            <label
              v-if="service"
              id="name"
              type="text"
              for="name"
              class="font-bold text-2xl mb-8"
              >{{ service.name }}</label
            >
            <Image
              v-if="service"
              :src="`${storageBaseUrl}${service.photo}`"
              :alt="service.name"
              width="450"
            />
          </div>
        </div>

        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-wrap gap-2 w-full mb-8"></div>

          <div class="flex items-center gap-2">
            <Avatar
              :image="`${storageBaseUrl}` + user?.photo"
              shape="circle"
              class="cursor-pointer"
              @click="$router.push(`/user-information/` + service.userId)"
            />
            <span
              v-if="user"
              id="influencer"
              class="cursor-pointer"
              type="text"
              @click="$router.push(`/user-information/` + service.userId)"
              >{{ user.firstName }} {{ user.lastName }}</span
            >
          </div>

          <div class="flex flex-wrap gap-2 w-full">
            <label for="description" class="font-bold">Description:</label>
            <p v-if="service" id="description" type="text">{{ service.description }}</p>
          </div>

          <div class="flex flex-wrap gap-2 w-full">
            <label for="category" class="font-bold">Category:</label>
            <p v-if="service" id="category" type="text">{{ service.category }}</p>
          </div>

          <div class="flex flex-wrap gap-2 w-full">
            <label for="price" class="font-bold">Price:</label>
            <p v-if="service" id="price" type="text">${{ service.price }}</p>
          </div>

          <div class="flex flex-wrap gap-2 w-full align-items-center">
            <label for="stars" class="font-bold">Stars:</label>
            <Rating v-if="service" v-model="service.stars" readonly />
          </div>

          <div class="flex flex-wrap gap-2 w-full">
            <label for="startDate" class="font-bold">Start Date:</label>
            <p v-if="service" id="startDate" type="text">{{ formatDate(service.startDate) }}</p>
          </div>

          <div class="flex flex-wrap gap-2 w-full">
            <label for="finalDate" class="font-bold">Final Date:</label>
            <p v-if="service" id="finalDate" type="text">{{ formatDate(service.finalDate) }}</p>
          </div>

          <div class="flex flex-wrap gap-2 w-full">
            <label for="state" class="font-bold">Status:</label>
            <Tag
              v-if="service"
              :value="getSeverity(service.state).label"
              :severity="getSeverity(service.state).severity"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-8 w-full">
      <!-- Lista de tareas -->
      <div class="card w-full mt-8">
        <DataTable :value="tasks" tableStyle="min-width: 50rem" stripedRows>
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xl font-bold">Tasks:</span>
              <Button icon="pi pi-refresh" rounded raised />
            </div>
          </template>
          <Column field="taskName" header="Name"></Column>
          <Column field="description" header="Description"></Column>
          <template #footer
            ><span class="font-bold"
              >In total there are {{ tasks ? tasks.length : 0 }} tasks.</span
            ></template
          >
        </DataTable>
      </div>
    </div>
  </Fluid>
</template>
