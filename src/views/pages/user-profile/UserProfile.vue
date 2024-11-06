<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storageBaseUrl } from '@/config/firebaseConfig'
import { UserService } from '@/services/UserService'

const user = ref<IUser[]>([])
const loading = ref(false)
const isEditing  = ref(false)

const toggleEdit = () => {
  isEditing .value = !isEditing .value
}

const saveData = async () => {
  loading.value = true;
  try {
    // TODO: Coordinar qué datos se pueden actualizar.
    await UserService.updateUser(user.value);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    const userId = Number(localStorage.getItem('userId'))
    const response = await UserService.getUserById(userId)
    user.value = response
  } catch (error: any) {
    console.error(
      error.response ? 'Error al obtener al usuario:' : 'Token no encontrado en localStorage',
      error
    )
  }
})
</script>

<template>
  <Fluid>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="card flex flex-row gap-8 w-full">
        <!-- Imagen en la izquierda -->
        <div class="card flex flex-col items-center">
          <div class="font-semibold text-2xl mb-4">Profile</div>
          <Image :src="`${storageBaseUrl}` + user.photo" alt="Image" width="250" />
        </div>

        <!-- Inputs en la derecha -->
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="firstname">Firstname</label>
              <InputText
                id="firstname"
                type="text"
                :disabled="!isEditing "
                :placeholder="user.firstName"
              />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="lastname">Lastname</label>
              <InputText
                id="lastname"
                type="text"
                :disabled="!isEditing "
                :placeholder="user.lastName"
              />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="username">Username</label>
              <InputText
                id="username"
                type="text"
                :disabled="!isEditing "
                :placeholder="user.username"
              />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="email">Email</label>
              <InputText id="email" type="text" :disabled="!isEditing " :placeholder="user.email" />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="ruc">RUC</label>
              <InputText id="ruc" type="text" :disabled="!isEditing " :placeholder="user.ruc" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="phone">Phone</label>
              <InputText id="phone" type="text" :disabled="!isEditing " :placeholder="user.phone" />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="birthdate">Birthdate</label>
              <InputText
                id="birthdate"
                type="text"
                :disabled="!isEditing "
                :placeholder="user.birthDate"
              />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="location">Location</label>
              <InputText
                id="location"
                type="text"
                :disabled="!isEditing "
                :placeholder="user.location"
              />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4 mt-8">
            <div class="flex flex-wrap gap-2">
              <!-- Mostrar el botón de "Edit" si no está en modo edición -->
              <Button
                v-if="!isEditing "
                type="button"
                class="mr-2 mb-2"
                label="Edit Information"
                icon="pi pi-pencil"
                iconPos="left"
                :loading="loading"
                @click="toggleEdit"
              />

              <!-- Mostrar el botón de "Save" si está en modo edición -->
              <Button
                v-if="isEditing "
                type="button"
                class="mr-2 mb-2"
                label="Save changes"
                icon="pi pi-save"
                iconPos="left"
                :loading="loading"
                @click="saveData"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fluid>
</template>
