<!-- RegisterView.vue -->
<template>
  <div class="container py-4">
    <div class="register-card mt-5 fixed-width">
      <h2 class="text-center mb-4 fw-bold">{{ $t('registerTitle') }}</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label>{{ $t('username') }}</label>
          <input
            v-model="username"
            type="email"
            class="form-control"
            :placeholder="$t('username')"
            @blur="validateUsername"
          />
          <div v-if="errors.username" class="text-danger small mt-1">{{ errors.username }}</div>
        </div>

        <div class="mb-3">
          <label>{{ $t('password') }}</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            :placeholder="$t('password')"
            @blur="() => validatePassword(true)"
            @input="() => validatePassword(false)"
          />
          <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
        </div>

        <div class="mb-3">
          <label>{{ $t('confirmPassword') }}</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="form-control"
            :placeholder="$t('confirmPassword')"
            @blur="validateConfirmPassword"
          />
          <div v-if="errors.confirmPassword" class="text-danger small mt-1">{{ errors.confirmPassword }}</div>
        </div>

        <div v-if="error" class="text-danger small mb-2">{{ error }}</div>
        <div v-if="success" class="text-success small mb-2">{{ success }}</div>

        <button type="submit" class="btn btn-dark w-100">{{ $t('registerBtn') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'  // 路径根据你的项目实际修改

const router = useRouter()
const { t } = useI18n()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const errors = ref({ username: '', password: '', confirmPassword: '' })

const validateUsername = () => {
  if (!username.value.includes('@') || username.value.length < 6) {
    errors.value.username = t('Invalid email format')
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
    errors.value.confirmPassword = t('Passwords do not match')
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
    success.value = t('registerSuccess')
    setTimeout(() => router.push('/login'), 1500)
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      error.value = t('registerError')  // 已注册
    } else {
      error.value = t('registerException')  // 其他错误
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
