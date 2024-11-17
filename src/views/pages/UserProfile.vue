<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Skeleton from 'primevue/skeleton'
import { storageBaseUrl } from '@/config/firebaseConfig'
import { UserService } from '@/services/UserService'
import { PhotoService } from '@/services/PhotoService'
import type { IUser } from '@/interfaces/User'

const user = ref<IUser>()
const selectedFile = ref<File | null>(null)
const pageReady = ref(false)
const loading = ref(false)
const isEditing = ref(false)
const src = ref<string | null>(null)
const toast = useToast()

onMounted(async () => {
  try {
    const userId = Number(localStorage.getItem('userId'))
    const response = await UserService.getUserById(userId)
    user.value = response
    pageReady.value = true
  } catch (error: any) {
    console.error(
      error.response ? 'Error al obtener al usuario:' : 'Token no encontrado en localStorage',
      error
    )
  }
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const saveData = async () => {
  loading.value = true
  try {
    // Asegurarse de que user.value esté definido antes de intentar acceder a su propiedad
    if (user.value && selectedFile.value) {
      // Si hay una imagen seleccionada, la subimos primero
      const imageUrl = await PhotoService.uploadPhoto(selectedFile.value)

      if (imageUrl) {
        user.value.photo = imageUrl
      } else {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Image upload failed',
          life: 3000
        })
        return
      }
    } else {
      toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'User data or selected file is missing.',
        life: 3000
      })
      return
    }

    // Si el usuario tiene datos, los actualizamos
    if (user.value) {
      await UserService.updateUser(user.value)
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Profile updated successfully',
        life: 3000
      })
    } else {
      console.error('User data is null')
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to update profile',
      life: 3000
    })
  } finally {
    loading.value = false
    toggleEdit()
  }
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
  <!-- Skeleton -->
  <div v-if="!pageReady" class="flex flex-col md:flex-row gap-8">
    <div class="card flex flex-col md:flex-row gap-8 w-full">
      <!-- Imagen en la izquierda -->
      <div class="card flex flex-col items-center">
        <div class="font-semibold text-2xl mb-4">Profile</div>
        <Skeleton shape="circle" size="15rem"></Skeleton>
      </div>

      <!-- Inputs en la derecha -->
      <div class="flex flex-col gap-4 w-full">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="firstname">Firstname</label>
            <Skeleton class="mb-2" height="2.5rem"></Skeleton>
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="lastname">Lastname</label>
            <Skeleton class="mb-2" height="2.5rem"></Skeleton>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="username">Username</label>
            <Skeleton class="mb-2" height="2.5rem"></Skeleton>
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="email">Email</label>
            <Skeleton class="mb-2" height="2.5rem"></Skeleton>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="ruc">RUC</label>
            <Skeleton class="mb-2" height="2.5rem"></Skeleton>
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="phone">Phone</label>
            <Skeleton class="mb-2" height="2.5rem"></Skeleton>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="birthdate">Birthdate</label>
            <Skeleton class="mb-2" height="2.5rem"></Skeleton>
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="location">Location</label>
            <Skeleton class="mb-2" height="2.5rem"></Skeleton>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4 mt-8">
          <div class="flex flex-wrap gap-2">
            <Skeleton width="10rem" height="2.5rem"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Fluid v-if="pageReady">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="card flex flex-col md:flex-row gap-8 w-full">
        <div class="card flex flex-col items-center">
          <div class="font-semibold text-2xl mb-4">Profile</div>
          <div class="flex justify-center items-center w-64 h-64 rounded-full overflow-hidden">
            <Image
              v-if="user"
              :src="`${storageBaseUrl}` + user.photo"
              :alt="user.user_name"
              width="250"
              height="250"
              class="object-cover"
            />
          </div>
          <div v-if="isEditing">
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

        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="firstname">Firstname</label>
              <InputText
                v-if="user"
                id="firstname"
                type="text"
                :disabled="!isEditing"
                v-model="user.firstName"
              />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="lastname">Lastname</label>
              <InputText
                v-if="user"
                id="lastname"
                type="text"
                :disabled="!isEditing"
                v-model="user.lastName"
              />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="username">Username</label>
              <InputText
                v-if="user"
                id="username"
                type="text"
                :disabled="!isEditing"
                v-model="user.user_name"
              />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="email">Email</label>
              <InputText
                v-if="user"
                id="email"
                type="text"
                :disabled="!isEditing"
                v-model="user.email"
              />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="ruc">RUC</label>
              <InputText
                v-if="user"
                id="ruc"
                type="text"
                :disabled="!isEditing"
                v-model="user.ruc"
              />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="phone">Phone</label>
              <InputText
                v-if="user"
                id="phone"
                type="text"
                :disabled="!isEditing"
                v-model="user.phone"
              />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="birthdate">Birthdate</label>
              <InputText
                v-if="user"
                id="birthdate"
                type="text"
                :disabled="!isEditing"
                v-model="user.birthDate"
              />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="location">Location</label>
              <InputText
                v-if="user"
                id="location"
                type="text"
                :disabled="!isEditing"
                v-model="user.location"
              />
            </div>
          </div>

          <div class="flex flex-row gap-4 mt-8">
            <div class="flex gap-4">
              <!-- Mostrar el botón de "Edit" si no está en modo edición -->
              <Button
                v-if="!isEditing"
                type="button"
                class="mr-2 mb-2"
                label="Edit Information"
                icon="pi pi-pencil"
                iconPos="left"
                :loading="loading"
                @click="toggleEdit"
              />
              <!-- Botón de "Save changes" -->
              <Button
                v-if="isEditing"
                type="button"
                class="mr-2 mb-2 whitespace-nowrap"
                label="Save"
                icon="pi pi-save"
                iconPos="left"
                :loading="loading"
                @click="saveData"
              />

              <!-- Botón de "Cancel" -->
              <Button
                v-if="isEditing"
                type="button"
                class="mr-2 mb-2 whitespace-nowrap"
                severity="danger"
                label="Cancel"
                icon="pi pi-times"
                iconPos="left"
                :loading="loading"
                @click="toggleEdit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fluid>
</template>
