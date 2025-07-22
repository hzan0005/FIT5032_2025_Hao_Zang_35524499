<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="card p-4 shadow" style="width: 400px">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" />
        </div>
        <div class="text-danger mb-3" v-if="error">{{ error }}</div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../auth.js'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = () => {
  if (username.value === 'admin' && password.value === 'admin') {
    login()
    error.value = ''
    router.push('/')
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>

