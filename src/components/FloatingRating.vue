<template>
  <div v-if="isAuthenticated" class="rating-floating">
    <button class="btn btn-warning rounded-pill shadow" @click="goToRating">
      ⭐ Rate Us
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('currentUser')
})

const goToRating = () => {
  router.push('/rating')
}
</script>

<style scoped>
.rating-floating {
  position: fixed;
  right: 20px;
  top: 40%;
  z-index: 9999;
}
</style>
