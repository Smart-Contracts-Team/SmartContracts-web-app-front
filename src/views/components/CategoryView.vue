<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { CategoryService } from '@/service/CategoryService'

export default defineComponent({
  props: {
    category: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const products = ref([])
    const loading = ref(true)
    const error = ref(null)

    const fetchData = async () => {
      loading.value = true
      try {
        const response = await CategoryService.getProductsByCategoryName(props.category)
        console.log("response: ", response)
        products.value = response.data // Asegúrate de obtener los datos correctamente
      } catch (err) {
        error.value = 'Error fetching data: ' + err.message
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchData)

    return {
      products,
      loading,
      error,
      categoryName: props.category
    }
  }
})
</script>

<template>
  <div>
    <h1>{{ categoryName }} Products</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="item in products" :key="item.id">{{ item.name }} - ${{ item.price }}</li>
      </ul>
    </div>
  </div>
</template>
