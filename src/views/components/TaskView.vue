<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storageBaseUrl } from '@/config/firebaseConfig';
import { ServiceService } from '@/services/ServiceService';
import type { IService } from '@/interfaces/Service';
import { TaskService } from '@/services/TaskService';
import type { ITask } from '@/interfaces/Tasks';

const tasks = ref<ITask[]>([]);
const service = ref<IService[]>([]);
const props = defineProps<{ serviceId: string }>();

onMounted(async () => {
  try {
    // Obtener los tasks por serviceId
    const servicedata = await ServiceService.getServiceById(props.serviceId);
    service.value = servicedata;
    const tasksdata = await TaskService.getTasksByServiceId(props.serviceId);
    tasks.value = tasksdata;

    // Mostrar cada task en la consola
    console.log(`Información del Servicio para ID ${props.serviceId}:`, service.value);
    console.log(`Tareas para el Servicio ID ${props.serviceId}:`, tasks.value);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
  }
});

const formatDate = (date: Date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};
</script>

<template>
    <div class="service-tasks-container">
      <!-- Información del Servicio -->
      <div v-if="service" class="service-info mb-6">
        <h2 class="text-2xl font-semibold">{{ service.name }}</h2>
        <img class="block mx-auto rounded mt-8 mb-8 float-left" :src="`${storageBaseUrl}${service.photo}`" :alt="service.name" />
        <p class="text-lg mt-2">Descripción: {{ service.description }}</p>
        <p class="text-lg">Categoría: {{ service.category }}</p>
        <p class="text-lg">Precio: ${{ service.price }}</p>
        <p class="text-lg">Estrellas: {{ service.stars }} ☆</p>
        <p class="text-lg">Fecha de inicio: {{ formatDate(service.startDate) }}</p>
        <p class="text-lg">Fecha de finalización: {{ formatDate(service.finalDate) }}</p>
        <p class="text-lg">Estado: {{ service.state }}</p>
      </div>
  
      <!-- Tabla de Tareas -->
      <div class="task-table-container">
        <h3 class="text-xl font-semibold mb-4">Tareas</h3>
        <table class="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2 text-left">ID</th>
              <th class="border border-gray-300 p-2 text-left">Nombre de la Tarea</th>
              <th class="border border-gray-300 p-2 text-left">Descripción</th>
              <th class="border border-gray-300 p-2 text-left">Estado</th>
              <th class="border border-gray-300 p-2 text-left">Fecha de Vencimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id" class="hover:bg-gray-50">
              <td class="border border-gray-300 p-2">{{ task.id }}</td>
              <td class="border border-gray-300 p-2">{{ task.taskName }}</td>
              <td class="border border-gray-300 p-2">{{ task.description }}</td>
              <td class="border border-gray-300 p-2">{{ task.status }}</td>
              <td class="border border-gray-300 p-2">{{ formatDate(task.dueDate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<style scoped>
.service-tasks-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.service-info {
  background-color: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-table-container {
  margin-top: 20px;
}

.task-table-container table {
  width: 100%;
  border-collapse: collapse;
}

.task-table-container th,
.task-table-container td {
  padding: 12px;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.task-table-container th {
  background-color: #f3f4f6;
}

img {
  border-radius: 8px;
}
</style>
