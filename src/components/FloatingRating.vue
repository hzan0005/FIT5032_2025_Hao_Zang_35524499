<template>
  <div v-if="shouldShow" class="rating-floating">
    <button class="btn btn-warning rounded-pill shadow" @click="goToRating">
      ⭐ Rate Us
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const shouldShow = ref(false)

const checkAuthAndRole = () => {
  const userData = localStorage.getItem('currentUser')
  if (userData) {
    const user = JSON.parse(userData)
    // Only show the button if the user's role is 'user'
    shouldShow.value = user.role === 'user'
  } else {
    // Hide if no user is logged in
    shouldShow.value = false
  }
}

onMounted(() => {
  checkAuthAndRole()
  // Listen for changes in storage (e.g., login/logout in another tab)
  window.addEventListener('storage', checkAuthAndRole)
  // Listen for programmatic updates after login/logout
  window.addEventListener('update-user', checkAuthAndRole)
})

onUnmounted(() => {
  window.removeEventListener('storage', checkAuthAndRole)
  window.removeEventListener('update-user', checkAuthAndRole)
})

const goToRating = () => {
  router.push('/rating')
}
</script>

<style scoped>
.rating-floating {
  position: fixed;
  right: 20px;
  top: 40%; /* This line places it 40% from the top */
  z-index: 9999;
}
</style>