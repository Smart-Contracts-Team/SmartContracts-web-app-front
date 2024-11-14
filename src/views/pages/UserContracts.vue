<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref, watch, type Ref } from 'vue'
import { ContractService } from '@/services/ContractService'
import type { IContract, IRegisterContractRequestDto } from '@/interfaces/Contract'
import { UserService } from '@/services/UserService'
import { storageBaseUrl } from '@/config/firebaseConfig'
import { CategoryService } from '@/services/CategoryService'
import { ServiceService } from '@/services/ServiceService'

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const submitted = ref(false)
const newContract = ref<IRegisterContractRequestDto>({} as IRegisterContractRequestDto)
const registerDialogVisible = ref(false)
const registeringContract = ref(false)

const toast = useToast()
const expandedRows = ref<number[]>([])
const loadingList = ref(false)
const photoLoaded = ref(false)
const userId = Number(localStorage.getItem('userId') ?? 0)
const influencerId = ref<number>()
const userType = String(localStorage.getItem('typeOfUser') ?? 'Undefined')
const registeredContracts = ref<IContract[]>([])
const totalPrice = ref<number>()

const typeOpts = ref<any[]>([])
const selectedType = ref()
watch(selectedType, (newVal: any) => {
  newContract.value.type = newVal?.display
})

const servicesList = ref<any[]>([])
const selectedServices = ref<any | null>(null)
watch(selectedServices, (newVal) => {
  newContract.value.services = newVal ? [newVal] : []
  const calculatedPrice = calculateTotalPrice()
  totalPrice.value = calculatedPrice ?? 0
  newContract.value.price = totalPrice.value
})

const influencersList = ref<any[]>([])
const selectedInfluencer = ref<any | null>(null)
watch(selectedInfluencer, async (newVal: any) => {
  influencerId.value = selectedInfluencer.value.id
  if (newVal) {
    newContract.value.influencerId = newVal.id
    // Aquí obtenemos los servicios del influencer seleccionado
    try {
      const services = await ServiceService.getServicesByUserId(newVal.id)
      servicesList.value = services.map((service) => ({
        id: service.id,
        name: service.name,
        status: service.state,
        price: service.price
      }))
      //.filter((service) => service.status == 'active')
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not load services',
        life: 3000
      })
    }
  } else {
    // Si no hay influencer seleccionado, limpiar la lista de servicios
    servicesList.value = []
  }
})

// Define la función para calcular el precio total de los servicios seleccionados
function calculateTotalPrice() {
  // Asegúrate de que se estén utilizando los valores correctos para el cálculo
  if (newContract.value.services && newContract.value.services.length > 0) {
    const total = newContract.value.services.reduce((acc, service) => {
      return acc + (service.price || 0)
    }, 0)
    return total
  }
  return 0
}

onMounted(async () => {
  typeOpts.value = await CategoryService.getCategories()
  influencersList.value = (await UserService.getUserByType('Influencer')).map((influencer) => ({
    display: `${influencer.firstName} ${influencer.lastName}`,
    id: influencer.id
  }))
  await loadContracts()
})

function openNew() {
  newContract.value = {} as IRegisterContractRequestDto
  submitted.value = false
  registerDialogVisible.value = true
}

function hideDialog() {
  newContract.value = {} as IRegisterContractRequestDto
  submitted.value = false
  registerDialogVisible.value = false
}

const errorValidation = {
  titleError: ref(''),
  descriptionError: ref(''),
  typeError: ref(''),
  influencerError: ref(''),
  servicesError: ref(''),
  startDateError: ref(''),
  finalDateError: ref('')
}

// Funciónes de validación
function validateField(value: string | any[], errorMsg: string, errorRef: Ref<string>) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    errorRef.value = errorMsg
  } else {
    errorRef.value = ''
  }
}

async function saveContract() {
  submitted.value = true

  // Llama a todas las funciones de validación
  validateField(
    newContract.value.title,
    'El nombre de contrato es obligatorio',
    errorValidation.titleError
  )
  validateField(
    newContract.value.description,
    'La descripción es obligatoria',
    errorValidation.descriptionError
  )
  validateField(newContract.value.type, 'La categoría es obligatorio', errorValidation.typeError)
  validateField(
    newContract.value.influencerId.toString(),
    'El influencer es obligatorio',
    errorValidation.typeError
  )
  validateField(newContract.value.services, 'El servicio es obligatorio', errorValidation.typeError)
  validateField(
    newContract.value.startDate.toISOString().split('T')[0],
    'La fecha de inicio es obligatoria',
    errorValidation.startDateError
  )
  validateField(
    newContract.value.finalDate.toISOString().split('T')[0],
    'La fecha de fin es obligatoria',
    errorValidation.finalDateError
  )
  validateField(newContract.value.type, 'La categoría es obligatorio', errorValidation.typeError)

  // Verifica si hay errores en los campos
  if (Object.values(errorValidation).some((ref) => ref.value)) {
    console.log(errorValidation)
    return
  }

  // Agregando datos
  newContract.value.influencerId = influencerId.value || 0
  newContract.value.businessId = userId
  newContract.value.status = 'pending'
  // Creación de un nuevo contrato
  console.log('datos pa guardar: ', newContract.value)
  try {
    registeringContract.value = true

    // Aquí se verifica si estamos creando o actualizando un contrato
    if (newContract.value.id) {
      // Actualización del contrato
      await ContractService.updateContract(newContract.value.id, newContract.value)
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Contract Updated',
        life: 3000
      })
    } else {
      await ContractService.createContract(newContract.value)
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Contract Created',
        life: 3000
      })
    }

    hideDialog()

    //refresh
    await loadContracts()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: (error as Error).message,
      life: 3000
    })
  } finally {
    registeringContract.value = false
  }
}

function editContract(item: IContract) {
  // Copiar el contrato seleccionado y abrir el diálogo de edición
  newContract.value = { ...item }
  registerDialogVisible.value = true // Asegurarse de que solo se abre el diálogo de edición
}

async function loadContracts() {
  photoLoaded.value = false
  loadingList.value = true

  try {
    const response = userType === 'Influencer'
      ? await ContractService.getContractsByInfluencerId(userId)
      : await ContractService.getContractsByBusinessId(userId)

    registeredContracts.value = await Promise.all(
      response.map(async (contract) => {
        const userIdToFetch = userType === 'Influencer' ? contract.businessId : contract.influencerId
        const user = await UserService.getUserById(userIdToFetch)        
        if (userIdToFetch === contract.businessId) {
          return {
            ...contract,
            name: user.user_name,
            photo: user.photo
          }
        } else {
          return {
            ...contract,
            name: user.firstName,
            photo: user.photo
          }
        }
      })
    )

    photoLoaded.value = true
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error fetching contracts',
      life: 3000
    })
  } finally {
    loadingList.value = false
  }
}

function expandAll() {
  expandedRows.value = registeredContracts.value.map((contract) => contract.id)
}

function collapseAll() {
  expandedRows.value = []
}

function formatCurrency(value: number) {
  if (value == null || isNaN(value)) {
    return '$0.00' // Default value if the price is invalid
  }
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active':
      return { severity: 'success', label: 'Active' }
    case 'pending':
      return { severity: 'warn', label: 'Pending' }
    case 'cancel':
      return { severity: 'danger', label: 'Cancel' }
    default:
      return { severity: 'secondary', label: 'Undefined' } // Valor por defecto
  }
}
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Contracts List</div>
    <!-- <DataTable v-model:expandedRows="expandedRows" :value="registeredContracts" dataKey="id"
            tableStyle="min-width: 60rem" stripedRows paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"></DataTable> -->
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="registeredContracts"
      dataKey="id"
      removableSort
      :filters="filters"
      tableStyle="min-width: 60rem"
      stripedRows
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
    >
      <template #header>
        <div class="flex justify-between">
          <Button
            v-if="userType === 'Business'"
            label="New"
            icon="pi pi-plus"
            class="mr-2"
            @click="openNew"
          />
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </IconField>
          <div class="flex flex-wrap justify-end gap-2">
            <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
            <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
          </div>
        </div>
      </template>
      <Column expander style="width: 2rem" />
      <Column field="title" header="Title" sortable></Column>
      <Column :header="userType === 'Influencer' ? 'Business' : 'Influencer'" field="name" sortable>
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              v-if="photoLoaded"
              :alt="data.name"
              :src="`${storageBaseUrl}` + data.photo"
              style="width: 32px; height: 32px"
            />
            <!-- Si la imagen aún no ha cargado, mostramos el skeleton -->
            <Skeleton v-else shape="circle" size="32" />
            <span>{{ data.name }}</span>
          </div>
        </template>
      </Column>
      <Column field="price" header="Price" sortable>
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="startDate" header="Start Date" sortable></Column>
      <Column field="finalDate" header="Final Date" sortable></Column>
      <Column field="type" header="Type" sortable></Column>
      <Column field="status" header="Status" sortable style="min-width: 12rem">
        <template #body="slotProps">
          <Tag
            :value="getStatusLabel(slotProps.data.status).label"
            :severity="getStatusLabel(slotProps.data.status).severity"
          />
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="p-4">
          <h5 class="font-bold text-l mb-2">Contract description:</h5>
          <p class="mb-4">{{ slotProps.data.description }}</p>
          <h5 class="font-bold text-l mb-2">Services included:</h5>
          <DataTable :value="slotProps.data.services" removableSort>
            <Column field="name" header="Name" sortable></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column field="price" header="Price" sortable>
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.price) }}
              </template>
            </Column>
            <Column field="stars" header="Rating" sortable style="min-width: 12rem">
              <template #body="slotProps">
                <Rating :modelValue="slotProps.data.stars" :readonly="true" />
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>

  <!-- Diálogo para crear/editar contrato -->
  <Dialog
    v-model:visible="registerDialogVisible"
    :style="{ width: '450px' }"
    header="Contract Details"
    modal
    :draggable="false"
  >
    <div class="flex flex-col gap-6">
      <div>
        <label for="title" class="block font-bold mb-3">Title</label>
        <InputText
          id="title"
          v-model.trim="newContract.title"
          required="true"
          autofocus
          :invalid="submitted && !newContract.title"
          fluid
        />
        <small v-if="submitted && !newContract.title" class="text-red-500"
          >Title is required.</small
        >
      </div>

      <div>
        <label for="description" class="block font-bold mb-3">Description</label>
        <InputText
          id="description"
          v-model.trim="newContract.description"
          required="true"
          :invalid="submitted && !newContract.description"
          fluid
        />
        <small v-if="submitted && !newContract.description" class="text-red-500"
          >Description is required.</small
        >
      </div>

      <div>
        <label for="type" class="block font-bold mb-3">Type</label>
        <Select
          v-model.trim="selectedType"
          :options="typeOpts"
          optionLabel="display"
          placeholder="Select a Type"
          checkmark
          :highlightOnSelect="false"
          class="w-full"
        />
        <small v-if="submitted && !newContract.type" class="text-red-500">Type is required.</small>
      </div>

      <div>
        <label for="influencerId" class="block font-bold mb-3">Influencer</label>
        <Dropdown
          v-model="selectedInfluencer"
          :options="influencersList"
          filter
          optionLabel="display"
          placeholder="Select an Influencer"
          class="w-full"
        />
        <small v-if="submitted && !newContract.influencerId" class="text-red-500">
          Influencer is required.
        </small>
      </div>

      <div>
        <label for="services" class="block font-bold mb-3">Service</label>
        <Dropdown
          v-model="selectedServices"
          :options="servicesList"
          filter
          optionLabel="name"
          placeholder="Select an Service"
          class="w-full"
        />
        <small v-if="submitted && !newContract.services" class="text-red-500">
          Service is required.
        </small>
      </div>

      <div>
        <label for="startDate" class="block font-bold mb-3">Start Date</label>
        <DatePicker
          id="startDate"
          v-model="newContract.startDate"
          required="true"
          :invalid="submitted && !newContract.startDate"
          showIcon
          fluid
          iconDisplay="input"
        />
        <small v-if="submitted && !newContract.startDate" class="text-red-500"
          >Start Date is required.</small
        >
      </div>

      <div>
        <label for="finalDate" class="block font-bold mb-3">Final Date</label>
        <DatePicker
          id="finalDate"
          v-model="newContract.finalDate"
          required="true"
          :invalid="submitted && !newContract.finalDate"
          showIcon
          fluid
          iconDisplay="input"
        />
        <small v-if="submitted && !newContract.finalDate" class="text-red-500"
          >Final Date is required.</small
        >
      </div>
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button
        icon="pi pi-check"
        :label="registeringContract ? 'Registering...' : 'Register'"
        :loading="registeringContract"
        :disabled="registeringContract"
        @click="saveContract"
      />
    </template>
  </Dialog>
</template>
