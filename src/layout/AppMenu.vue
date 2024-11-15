<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppMenuItem from './AppMenuItem.vue'
import { CategoryService } from '@/services/CategoryService';

const model = ref([
  {
    label: 'Principal',
    items: [
      { label: 'Home', icon: 'pi pi-fw pi-home', to: '/home' },
    ]
  },
  {
    label: 'Categorías',
    items: []
  }
])

const fetchCategories = async () => {
  try {
    const response = await CategoryService.getCategories();
    // @ts-ignore
    model.value[1].items = response.map(category => ({
      label: category.display,
      icon: 'pi pi-fw pi-list',
      // TODO: Usar otro método para no tener que recargar la página completa
      url: `/category/${category.name}`, // Genera una URL dinámica para cada categoría
      //to: `/category/${category.name}`
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

onMounted(fetchCategories)
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item :item="item" :index="i"></app-menu-item>
      <!-- <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li> -->
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
