<template>
  <div class="d-flex justify-content-center align-items-center mt-3" style="min-height: 50vh;">
    <div class="login-card w-100" style="max-width: 420px;">
      <div class="text-center mb-4">
        <h2 class="fw-bold">{{ $t('loginTitle') }}</h2>
      </div>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">{{ $t('username') }}</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            :placeholder="$t('username')"
            @blur="validateUsername(true)"
            @input="validateUsername(false)"
          />
          <div v-if="errors.username" class="text-danger small mt-1">{{ errors.username }}</div>
        </div>

        <div class="mb-3">
          <label class="form-label">{{ $t('password') }}</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            :placeholder="$t('password')"
            @blur="() => validatePassword(true)"
            @input="() => validatePassword(false)"
          />
          <div v-if="errors.password" class="text-danger small mt-1">
            <div v-for="(msg, i) in errors.password.split('. ')" :key="i">{{ msg.trim() }}.</div>
          </div>
        </div>

        <div v-if="error" class="alert alert-danger py-2 text-center small">{{ error }}</div>

        <button type="submit" class="btn btn-dark w-100">{{ $t('loginBtn') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const username = ref('')
const password = ref('')
const error = ref('')
const errors = ref({ username: null, password: null })
const router = useRouter()
const { t } = useI18n()

const validateUsername = (blur) => {
  if (username.value.trim().length < 3) {
    if (blur) errors.value.username = t('Username Too Short')
  } else {
    errors.value.username = null
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

const login = async () => {
  error.value = ''
  validateUsername(true)
  validatePassword(true)

  if (errors.value.username || errors.value.password) return

  try {
    let fileUsers = []
    try {
      const res = await fetch('/data/users.json')
      if (res.ok) fileUsers = await res.json()
    } catch (e) {}

    const localUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const allUsers = [...fileUsers, ...localUsers]

    const user = allUsers.find(u => u.username === username.value && u.password === password.value)
    if (!user) {
      error.value = t('loginError')
      return
    }

    localStorage.setItem('loggedInUser', user.username)
    router.push('/')
  } catch (e) {
    error.value = t('loginException')
  }
}
</script>

<style scoped>
.login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 2rem 2rem 1.5rem 2rem;
}
.fixed-width {
  width: 100%;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
