<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { ContractService } from '@/services/ContractService'
import type { IContract, IRegisterContractRequestDto } from '@/interfaces/Contract'
import { UserService } from '@/services/UserService'
import { storageBaseUrl } from '@/config/firebaseConfig'
import { CategoryService } from '@/services/CategoryService'
import { ServiceService } from '@/services/ServiceService'
import { EthereumService } from '@/services/EthereumService'

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const options = ref(['All', 'Pending'])
const selectedFilter = ref('All')

const submitted = ref(false)
const newContract = ref<IRegisterContractRequestDto>({} as IRegisterContractRequestDto)
const registerDialogVisible = ref(false)
const registeringContract = ref(false)

const confirmDialogVisible = ref(false)
const selectedContract = ref<IContract | null>(null)
const checked = ref(false)

const toast = useToast()
const expandedRows = ref<number[]>([])
const loadingList = ref(false)
const photoLoaded = ref(false)
const updatingStatus = ref(false)
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
function validateField(
  value: string | number | Date | any[],
  errorMsg: string,
  errorRef: Ref<string>
) {
  if (Array.isArray(value)) {
    // Si 'value' es un arreglo, validamos cada elemento.
    const invalidElement = value.some(
      (item) =>
        item === null ||
        item === undefined ||
        (typeof item === 'string' && item.trim() === '') ||
        (typeof item === 'number' && isNaN(item)) ||
        (item instanceof Date && isNaN(item.getTime()))
    )

    if (invalidElement) {
      errorRef.value = errorMsg
    } else {
      errorRef.value = ''
    }
  } else {
    // Validación original para un solo valor.
    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '') ||
      (typeof value === 'number' && isNaN(value)) ||
      (value instanceof Date && isNaN(value.getTime()))
    ) {
      errorRef.value = errorMsg
    } else {
      errorRef.value = ''
    }
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
    newContract.value.influencerId,
    'El influencer es obligatorio',
    errorValidation.typeError
  )
  validateField(newContract.value.services, 'El servicio es obligatorio', errorValidation.typeError)
  validateField(
    newContract.value.startDate,
    'La fecha de inicio es obligatoria',
    errorValidation.startDateError
  )
  validateField(
    newContract.value.finalDate,
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
    const response =
      userType === 'Influencer'
        ? await ContractService.getContractsByInfluencerId(userId)
        : await ContractService.getContractsByBusinessId(userId)

    registeredContracts.value = await Promise.all(
      response.map(async (contract) => {
        const userIdToFetch =
          userType === 'Influencer' ? contract.businessId : contract.influencerId
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

const filteredContracts = computed(() => {
  return selectedFilter.value === 'Pending'
    ? registeredContracts.value.filter((contract) => contract.status === 'pending')
    : registeredContracts.value
})

function editStatus(contract: IContract) {
  if (contract.status === 'pending') {
    selectedContract.value = contract
    confirmDialogVisible.value = true
  } else {
    toast.add({
      severity: 'warn',
      summary: 'Cannot Edit Status',
      detail: 'Only pending contracts can be updated.',
      life: 3000
    })
  }
}

function confirmStatusChange() {
  if (selectedContract.value) {
    updatingStatus.value = true
    selectedContract.value.status = 'active' // Cambiar el estado del contrato
    ContractService.updateContract(selectedContract.value.id, selectedContract.value)
      .then(() => {
        toast.add({
          severity: 'success',
          summary: 'Status Updated',
          detail: `Contract status updated to ${selectedContract.value?.status}`,
          life: 3000
        })
      })
      .catch((error) => {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error updating status: ${(error as Error).message}`,
          life: 3000
        })
      })
      .finally(() => {
        confirmDialogVisible.value = false
        updatingStatus.value = false
      })
  }
}

function cancelStatusChange() {
  confirmDialogVisible.value = false
}

function expandAll() {
  expandedRows.value = registeredContracts.value.map((contract) => contract.id)
}

function collapseAll() {
  expandedRows.value = []
}

function formatCurrency(value: number) {
  if (value == null || isNaN(value)) {
    return '$0.00'
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
      return { severity: 'secondary', label: 'Undefined' }
  }
}

const expandedSmartContract = ref<{ contractId: string; influencerId: string; businessId: string ; hash:string} | null>(null);
const showContractDialog = ref(false);

// Función para abrir el modal después de obtener los datos
const fetchSmartContract = async (hash: string, smartcontractId: string) => {
  try {
    console.log(smartcontractId);
    showContractDialog.value = true; // Abre el modal
    const response = await EthereumService.getSmartContractData('2');
    if (response) {
      expandedSmartContract.value = { ...response, hash }; // Agrega el hash al objeto
    }
    console.log(expandedSmartContract);
  } catch (error) {
    console.error('Error fetching SmartContract data:', error);
  }
};
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
      :value="filteredContracts"
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
        <div class="flex flex-col md:flex-row justify-between gap-4">
          <!-- Botón para agregar nuevos contratos -->
          <Button
            v-if="userType === 'Business'"
            label="New"
            icon="pi pi-plus"
            class="mr-2"
            @click="openNew"
          />

          <!-- Seleccionar ver todos o solo los pendientes -->
          <SelectButton v-model="selectedFilter" :options="options" class="mr-2" />

          <!-- Buscador general -->
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </IconField>

          <!-- Botones de expansión y colapso -->
          <div class="flex flex-wrap md:justify-start gap-2">
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
      <Column field="status" header="Status" sortable>
        <template #body="slotProps">
          <Tag
            :value="getStatusLabel(slotProps.data.status).label"
            :severity="getStatusLabel(slotProps.data.status).severity"
          /> </template
      ></Column>
      <Column v-if="userType == 'Influencer'" header="Actions">
        <template #body="{ data }">
          <Button
            v-if="data.status == 'pending'"
            label="Accept"
            class="p-button-primary"
            @click="editStatus(data)"
          />
        </template>
      </Column>
      <Column field="smartcontract" header="SmartContract">
      <template #body="slotProps">
        <Button
          label="View Contract"
          class="p-button-primary"
          @click="fetchSmartContract(slotProps.data.hash,slotProps.data.id)"
        />
      </template>
      </Column>
      <!--EXPANSION DESIGN-->
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

  <!-- Dialogo para abrir contractos-->

  <Dialog
    v-model:visible="showContractDialog"
    :style="{ width: '500px' }"
    header="📄 Contract Details"
    modal
    :draggable="false"
    class="p-fluid"
  >
    <div v-if="expandedSmartContract" class="flex flex-col gap-4">
      <div>
        <label class="block font-bold mb-2">Contract ID:</label>
        <span class="text-gray-700">{{ expandedSmartContract.contractId }}</span>
      </div>
      <div>
        <label class="block font-bold mb-2">Influencer ID:</label>
        <span class="text-gray-700">{{ expandedSmartContract.influencerId }}</span>
      </div>
      <div>
        <label class="block font-bold mb-2">Business ID:</label>
        <span class="text-gray-700">{{ expandedSmartContract.businessId }}</span>
      </div>
      <div>
        <label class="block font-bold mb-2">Hash Contract:</label>
        <span class="text-gray-700">{{ expandedSmartContract.hash }}</span>
      </div>
    </div>
    <div v-else>
      <p>No contract data available.</p>
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
    </template>
  </Dialog>

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

  <!-- Confirm Dialog -->
  <Dialog
    v-model:visible="confirmDialogVisible"
    header="Confirm Acceptance of Contract"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :closable="false"
    :draggable="false"
  >
    <p class="mb-8">
      Antes de aceptar este contrato, le solicitamos que lea atentamente todos los términos y
      condiciones establecidos en el mismo. Al aceptar el contrato, usted está confirmando que
      comprende completamente los servicios y tareas que se le asignarán, los cuales están
      detalladamente especificados en el documento. Asegúrese de estar conforme con las
      responsabilidades y expectativas que conlleva el contrato, ya que cualquier incumplimiento
      podría generar consecuencias.
    </p>

    <p class="mb-2 font-bold text-xl">Responsabilidad de Cancelación</p>
    <p class="mb-8">
      SmartContracts no se hace responsable por la cancelación de este contrato. En caso de que
      desee cancelar o modificar los términos acordados, es fundamental que se comunique
      directamente con la empresa solicitante. Ambas partes deberán llegar a un acuerdo mutuo sobre
      la cancelación, de acuerdo con lo estipulado en el contrato.
    </p>

    <p class="mb-2 font-bold text-xl">Compromiso y Confidencialidad</p>
    <p class="mb-8">
      Es importante destacar que este contrato puede implicar la divulgación de información sensible
      o exclusiva. Por lo tanto, se espera que mantenga la confidencialidad respecto a cualquier
      información relacionada con la empresa contratante y el alcance de los servicios que se le
      soliciten. Cualquier incumplimiento en este aspecto podría generar penalizaciones o la
      terminación del contrato de manera anticipada.
    </p>

    <p class="mb-2 font-bold text-xl">Condiciones Adicionales</p>
    <p class="mb-8">
      Además, le recordamos que la naturaleza de los contratos SmartContracts implica una ejecución
      automática de los términos una vez que ambas partes han dado su consentimiento. De esta
      manera, SmartContracts actúa como un facilitador para que el acuerdo sea validado de forma
      segura y transparente.
    </p>

    <p class="mb-8">
      Le recomendamos que, en caso de tener dudas sobre algún aspecto del contrato, consulte con un
      abogado o experto legal antes de proceder con la aceptación. Al aceptar el contrato, usted
      está comprometido con los términos aquí expuestos y será responsable de cumplir con todas las
      obligaciones acordadas.
    </p>

    <p class="mb-2 font-bold text-xl">
      Asegúrese de leer todo el contrato cuidadosamente antes de aceptar.
    </p>

    <p class="mb-8">
      Si está de acuerdo con los términos y condiciones detallados, puede proceder con la
      aceptación.
    </p>

    <div class="flex items-center gap-2">
      <Checkbox v-model="checked" :invalid="!checked" binary />
      <label for="size_normal" class="size_normal"
        >Acepto los términos y condiciones del contrato.</label
      >
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="cancelStatusChange" />
      <Button
        icon="pi pi-check"
        :label="updatingStatus ? 'Updating...' : 'Confirm'"
        :loading="updatingStatus"
        :disabled="updatingStatus || !checked"
        @click="confirmStatusChange"
      />
    </template>
  </Dialog>
</template>
