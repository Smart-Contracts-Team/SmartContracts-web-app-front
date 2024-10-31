<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ categoryName: string }>();
</script>

<template>
  <div>
    <h1>{{ categoryName }}</h1>
    <!-- Muestra información específica de la categoría aquí -->
  </div>
</template>