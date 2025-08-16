<template>
  <div class="container py-4">
    <div class="register-card mt-5 fixed-width">
      <h2 class="text-center mb-4 fw-bold">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="register-email" class="form-label">Email</label>
          <input
            id="register-email"
            v-model="username"
            type="email"
            class="form-control"
            autocomplete="email"
            required
            @blur="validateUsername"
          />
          <div v-if="errors.username" class="text-danger small mt-1">{{ errors.username }}</div>
        </div>

        <div class="mb-3">
          <label for="register-password" class="form-label">Password</label>
          <input
            id="register-password"
            v-model="password"
            type="password"
            class="form-control"
            autocomplete="new-password"
            required
            @blur="() => validatePassword(true)"
            @input="() => validatePassword(false)"
          />
          <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
        </div>

        <div class="mb-3">
          <label for="register-confirm-password" class="form-label">Confirm Password</label>
          <input
            id="register-confirm-password"
            v-model="confirmPassword"
            type="password"
            class="form-control"
            autocomplete="new-password"
            required
            @blur="validateConfirmPassword"
          />
          <div v-if="errors.confirmPassword" class="text-danger small mt-1">{{ errors.confirmPassword }}</div>
        </div>

        <div v-if="error" class="text-danger small mb-2" role="alert">{{ error }}</div>
        <div v-if="success" class="text-success small mb-2" role="alert">{{ success }}</div>

        <button type="submit" class="btn btn-dark w-100">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const router = useRouter()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const errors = ref({ username: '', password: '', confirmPassword: '' })

const validateUsername = () => {
  if (!username.value.includes('@') || username.value.length < 6) {
    errors.value.username = 'Invalid email format'
  } else {
    errors.value.username = ''
  }
}

const validatePassword = (blur) => {
  const pwd = password.value
  const minLength = 8
  const errorList = []

  if (pwd.length < minLength) {
    errorList.push(`Password must be at least ${minLength} characters long.`)
  }
  if (!/[A-Z]/.test(pwd)) {
    errorList.push('Password must contain at least one uppercase letter.')
  }
  if (!/[a-z]/.test(pwd)) {
    errorList.push('Password must contain at least one lowercase letter.')
  }
  if (!/\d/.test(pwd)) {
    errorList.push('Password must contain at least one number.')
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
    errorList.push('Password must contain at least one special character.')
  }

  if (blur) {
    errors.value.password = errorList.length > 0 ? errorList.join(' ') : ''
  }
}

const validateConfirmPassword = () => {
  if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = ''
  }
}

const register = async () => {
  error.value = ''
  success.value = ''
  validateUsername()
  validatePassword(true)
  validateConfirmPassword()

  if (errors.value.username || errors.value.password || errors.value.confirmPassword) return

  try {
    await createUserWithEmailAndPassword(auth, username.value, password.value)
    success.value = 'Registration successful. Please log in.'
    setTimeout(() => router.push('/login'), 1500)
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      error.value = 'Email already in use.'
    } else {
      error.value = 'Registration error, please try again later.'
    }
  }
}
</script>

<style scoped>
.register-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 2rem;
}

.fixed-width {
  max-width: 600px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>