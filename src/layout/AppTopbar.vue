<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout'
import ThemeSelector from './ThemeSelector.vue'
import { storageBaseUrl } from '@/config/firebaseConfig'
import { ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import { AuthService } from '@/services/AuthService'
import router from '@/router'

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout()
const authService = AuthService

const menu = ref(null)
const typeOfUser = localStorage.getItem('typeOfUser')
const overlayMenuItems = ref<MenuItem[]>([
  {
    label: 'My profile',
    icon: 'pi pi-user',
    command: () => {
      router.push('/profile')
    }
  },
  ...(typeOfUser === 'Influencer'
    ? [
        {
          label: 'My services',
          icon: 'pi pi-briefcase',
          command: () => {
            router.push('/my-services')
          }
        }
      ]
    : []),
  {
    separator: true
  },
  {
    label: 'Logout',
    icon: 'pi pi-power-off',
    command: () => {
      authService.logout()
      router.push('/auth/login')
    }
  }
])

function toggleMenu(event: MouseEvent) {
  if (menu.value) {
    ;(menu.value as any).toggle(event)
  }
}

function goToContracts() {
  router.push({
    path: '/my-contracts'
  })
}
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
        <i class="pi pi-bars"></i>
      </button>
      <div class="logo-wrapper">
        <router-link to="/home" class="layout-topbar-logo">
          <img
            class="logo-image w-16 sm:w-28 md:w-36"
            alt="logo"
            :src="
              `${storageBaseUrl}` +
              'logo%2FIsotipo%20a%20color%20-%20SMART%20CONTRACT.png?alt=media&token=5ef63848-4358-4c8f-9533-e7270d6aa205'
            "
          />
          <span class="text-sm md:text-lg lg:text-xl whitespace-nowrap">Smart Contracts</span>
        </router-link>
      </div>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
        </button>
        <div class="relative">
          <button
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: true
            }"
            type="button"
            class="layout-topbar-action layout-topbar-action-highlight"
          >
            <i class="pi pi-palette"></i>
          </button>
          <ThemeSelector />
        </div>
      </div>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true
        }"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <button
            v-tooltip.bottom="'Ver contratos'"
            type="button"
            class="layout-topbar-action"
            @click="goToContracts()"
          >
            <i class="pi pi-inbox"></i>
            <span>Contracts</span>
          </button>
          <Menu ref="menu" :model="overlayMenuItems" :popup="true" />
          <button type="button" class="layout-topbar-action" @click="toggleMenu">
            <i class="pi pi-user"></i>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.layout-topbar-logo-container {
  display: flex;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.logo-image {
  height: auto;
}
</style>
