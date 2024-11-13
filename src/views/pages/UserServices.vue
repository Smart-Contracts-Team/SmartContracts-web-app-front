<script setup lang="ts">
import { onMounted, ref, computed, type Ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { MenuItem } from 'primevue/menuitem'
import { storageBaseUrl } from '@/config/firebaseConfig'
import { ServiceService } from '@/services/ServiceService'
import type { IRegisterServiceRequestDto, IService } from '@/interfaces/Service'
import { FilterMatchMode } from '@primevue/core/api'
import { PhotoService } from '@/services/PhotoService'
import { useRouter } from 'vue-router'
import { CategoryService } from '@/services/CategoryService'
import { StateService } from '@/services/StatusService'

const toast = useToast()
const registerDialogVisible = ref(false)
const deleteDialogVisible = ref(false)
const submitted = ref(false)
const registeredServices = ref<IService[]>([])
const newService = ref<IRegisterServiceRequestDto>({} as IRegisterServiceRequestDto)
const selectedServiceRegistration = ref<IService>()

const loadingList = ref(false)
const registeringService = ref(false)
const unregisteringService = ref(false)

const router = useRouter()
const selectedFile = ref<File | null>(null)
const src = ref<string | null>(null) // Para la vista previa de la imagen

const options = ref(['list', 'grid'])
const layout = ref('list')
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const userId = Number(localStorage.getItem('userId'))

const categories = ref<any[]>([])
const selectedCategory = ref()
watch(selectedCategory, (newVal:any) => {
  newService.value.category = newVal?.display
})
const stateOpts = ref<any[]>([])
const selectedState = ref()
watch(selectedState, (newVal:any) => {
  newService.value.state = newVal?.display
})

const errorValidation = {
  nameError: ref(''),
  descriptionError: ref(''),
  categoryError: ref(''),
  priceError: ref(''),
  photoError: ref(''),
  startDateError: ref(''),
  finalDateError: ref('')
}

// Funciónes de validación
function validateField(value: string, errorMsg: string, errorRef: Ref<string>) {
  if (!value) {
    errorRef.value = errorMsg
  } else {
    errorRef.value = ''
  }
}

const menuItems = (item: IService): MenuItem[] => [
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      editService(item)
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
    command: () => {
      confirmDelete(item)
    }
  }
]

onMounted(async () => {
  categories.value = await CategoryService.getCategories()
  stateOpts.value = await StateService.getServiceStateOptions()
  await loadServices()
})

// Agrupar los servicios por categoría
const groupedServices = computed(() => {
  return registeredServices.value.reduce(
    (acc:any, service:any) => {
      if (!acc[service.category]) {
        acc[service.category] = []
      }
      acc[service.category].push(service)
      return acc
    },
    {} as Record<string, IService[]>
  )
})

function openNew() {
  newService.value = {} as IRegisterServiceRequestDto
  submitted.value = false

  // Limpiar selects
  selectedCategory.value = null
  selectedState.value = null

  registerDialogVisible.value = true
  src.value = null
}

function hideDialog() {
  newService.value = {} as IRegisterServiceRequestDto
  submitted.value = false
  registerDialogVisible.value = false
  src.value = null
}

async function saveService() {
  submitted.value = true

  // Llama a todas las funciones de validación
  validateField(
    newService.value.name,
    'El nombre de servicio es obligatorio',
    errorValidation.nameError
  )
  validateField(
    newService.value.description,
    'La descripción es obligatoria',
    errorValidation.descriptionError
  )
  validateField(
    newService.value.category,
    'La categoría es obligatorio',
    errorValidation.categoryError
  )
  validateField(
    newService.value.price.toString(),
    'El Precio es obligatorio',
    errorValidation.priceError
  )

  validateField(
    newService.value.startDate.toISOString().split('T')[0],
    'La fecha de inicio es obligatoria',
    errorValidation.startDateError
  );

  validateField(
    newService.value.finalDate.toISOString().split('T')[0],
    'La fecha de fin es obligatoria',
    errorValidation.finalDateError
  );

  // Verifica si hay errores en los campos
  if (Object.values(errorValidation).some((ref) => ref.value)) {
    console.log(errorValidation)
    return
  }

  try {
    registeringService.value = true

    //save image
    if (selectedFile.value) {
      const imageUrl = await PhotoService.uploadPhoto(selectedFile.value)

      if (imageUrl) {
        newService.value.photo = imageUrl
      } else {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Image upload failed',
          life: 3000
        })
      }
    }

    // Aquí se verifica si estamos creando o actualizando un servicio
    if (newService.value.id) {
      // Actualización del servicio
      await ServiceService.updateService(newService.value.id, newService.value)
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Service Updated',
        life: 3000
      })
    } else {
      // Creación de un nuevo servicio
      await ServiceService.createService(newService.value, userId)
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Service Created',
        life: 3000
      })
    }

    hideDialog()

    //refresh
    await loadServices()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: (error as Error).message,
      life: 3000
    })
  } finally {
    registeringService.value = false
  }
}

function editService(item: IService) {
  // Copiar el servicio seleccionado y abrir el diálogo de edición
  newService.value = { ...item }

  // Encontrar el valor correspondiente en categories para asignarlo a selectedCategory
  selectedCategory.value = categories.value.find((category:any) => category.display === item.category)

  // Encontrar el valor correspondiente en stateOpts para asignarlo a selectedState
  selectedState.value = stateOpts.value.find((state:any) => state.display === item.state)

  registerDialogVisible.value = true // Asegurarse de que solo se abre el diálogo de edición
}

function confirmDelete(serviceRegistrationId: IService) {
  selectedServiceRegistration.value = serviceRegistrationId
  deleteDialogVisible.value = true
}

async function deleteService() {
  try {
    unregisteringService.value = true
    await ServiceService.deleteService(selectedServiceRegistration.value!.id)

    toast.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Service deleted',
      life: 3000
    })
    deleteDialogVisible.value = false
    selectedServiceRegistration.value = {} as IService

    loadServices()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: (error as Error).message,
      life: 3000
    })
  } finally {
    unregisteringService.value = false
  }
}

async function loadServices() {
  try {
    loadingList.value = true
    const response = await ServiceService.getServicesByUserId(userId)
    registeredServices.value = response
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error fetching services',
      life: 3000
    })
  } finally {
    loadingList.value = false
  }
}

function viewTasks(serviceId: number) {
  router.push(`/my-services/${serviceId}/tasks`)
}

function onFileSelect(event: any) {
  selectedFile.value = event.files[0]

  const reader = new FileReader()
  reader.onload = (e) => {
    src.value = e.target?.result as string
  }

  if (selectedFile.value) {
    reader.readAsDataURL(selectedFile.value)
  }
}
</script>

<template>
  <div class="flex flex-col space-y-8">
    <div class="card mb-4">
      <div class="flex flex-wrap gap-2 items-center justify-between">
        <Button label="Add service" icon="pi pi-plus" @click="openNew" raised />

        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Search..." />
        </IconField>

        <SelectButton v-model="layout" :options="options" :allowEmpty="false">
          <template #option="{ option }">
            <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
          </template>
        </SelectButton>
      </div>
    </div>

    <div v-for="(categoryServices, category) in groupedServices" :key="category" class="card">
      <div class="font-semibold text-xl mb-4">Mis servicios en la categoría: {{ category }}</div>

      <DataView :value="categoryServices" :layout="layout">
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
                      <SplitButton
                        label="View more"
                        @click="viewTasks(item.id)"
                        :model="menuItems(item)"
                      />
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
                class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
              >
                <div class="bg-surface-50 flex justify-center rounded p-4">
                  <div class="relative mx-auto">
                    <img
                      class="rounded w-full"
                      :src="`${storageBaseUrl}` + item.photo"
                      :alt="item.name"
                      style="max-width: 300px"
                    />
                  </div>
                </div>
                <div class="pt-6">
                  <div class="flex flex-row justify-between items-start gap-2">
                    <div>
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                        item.name
                      }}</span>
                      <div class="text-lg font-medium mt-1">{{ item.description }}</div>
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
                  <div class="flex flex-col gap-6 mt-6">
                    <span class="text-2xl font-semibold">${{ item.price }}</span>
                    <div class="flex gap-2">
                      <SplitButton
                        label="View more"
                        @click="viewTasks(item.id)"
                        :model="menuItems(item)"
                      />
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

  <!-- Diálogo para crear/editar propiedad -->
  <Dialog
    v-model:visible="registerDialogVisible"
    :style="{ width: '450px' }"
    header="Service Details"
    modal
    :draggable="false"
  >
    <div class="flex flex-col gap-6">
      <div>
        <label for="name" class="block font-bold mb-3">Name</label>
        <InputText
          id="name"
          v-model.trim="newService.name"
          required="true"
          autofocus
          :invalid="submitted && !newService.name"
          fluid
        />
        <small v-if="submitted && !newService.name" class="text-red-500">Name is required.</small>
      </div>

      <div>
        <label for="description" class="block font-bold mb-3">Description</label>
        <InputText
          id="description"
          v-model.trim="newService.description"
          required="true"
          :invalid="submitted && !newService.description"
          fluid
        />
        <small v-if="submitted && !newService.description" class="text-red-500"
          >Description is required.</small
        >
      </div>

      <div>
        <label for="category" class="block font-bold mb-3">Category</label>
        <Select
          v-model.trim="selectedCategory"
          :options="categories"
          optionLabel="display"
          placeholder="Select a Category"
          checkmark
          :highlightOnSelect="false"
          class="w-full"
        />
        <small v-if="submitted && !newService.category" class="text-red-500"
          >Category is required.</small
        >
      </div>

      <div>
        <label for="price" class="block font-bold mb-3">Price</label>
        <InputNumber
          id="price"
          v-model.trim="newService.price"
          required="true"
          :invalid="submitted && !newService.price"
          fluid
        />
        <small v-if="submitted && !newService.price" class="text-red-500">Price is required.</small>
      </div>

      <div>
        <label for="state" class="block font-bold mb-3">State</label>
        <Select
          v-model.trim="selectedState"
          :options="stateOpts"
          optionLabel="display"
          placeholder="Select a State"
          checkmark
          :highlightOnSelect="false"
          class="w-full"
        />
        <small v-if="submitted && !newService.state" class="text-red-500">State is required.</small>
      </div>

      <div>
        <label for="startDate" class="block font-bold mb-3">Start Date</label>
        <DatePicker
          id="startDate"
          v-model="newService.startDate"
          required="true"
          :invalid="submitted && !newService.startDate"
          showIcon
          fluid
          iconDisplay="input"
        />
        <small v-if="submitted && !newService.startDate" class="text-red-500"
          >Start Date is required.</small
        >
      </div>

      <div>
        <label for="finalDate" class="block font-bold mb-3">Final Date</label>
        <DatePicker
          id="finalDate"
          v-model="newService.finalDate"
          required="true"
          :invalid="submitted && !newService.finalDate"
          showIcon
          fluid
          iconDisplay="input"
        />
        <small v-if="submitted && !newService.finalDate" class="text-red-500"
          >Final Date is required.</small
        >
      </div>

      <div>
        <label for="photo" class="block font-bold mb-3">Photo</label>
        <div class="card flex flex-col items-center gap-6">
          <FileUpload
            mode="basic"
            accept="image/*"
            @select="onFileSelect"
            customUpload
            auto
            severity="secondary"
            class="p-button-outlined"
          />
          <img v-if="src" :src="src" alt="photo" class="shadow-md rounded-xl w-full sm:w-64" />
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button
        icon="pi pi-check"
        :label="registeringService ? 'Registering...' : 'Register'"
        :loading="registeringService"
        :disabled="registeringService"
        @click="saveService"
      />
    </template>
  </Dialog>

  <!-- Diálogo para confirmar eliminación -->
  <Dialog
    v-model:visible="deleteDialogVisible"
    :style="{ width: '450px' }"
    header="Confirm"
    modal
    :draggable="false"
  >
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="selectedServiceRegistration"
        >Are you sure you want to delete <b>{{ selectedServiceRegistration.name }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        severity="secondary"
        text
        @click="deleteDialogVisible = false"
      />
      <Button
        :label="unregisteringService ? 'Unregistering...' : 'Yes'"
        icon="pi pi-check"
        severity="danger"
        :loading="unregisteringService"
        @click="deleteService()"
        autoFocus
      />
    </template>
  </Dialog>
</template>
