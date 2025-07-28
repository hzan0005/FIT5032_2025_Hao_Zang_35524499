<template>
  <div class="wrapper">
    <div class="login-container">
      <div class="login-card">
        <div class="form-title">Login</div>

        <form @submit.prevent="login">
          <!-- Username -->
          <div class="form-group">
            <label>Username</label>
            <input
              v-model="username"
              type="text"
              class="form-input"
              placeholder="Enter your username"
              @blur="validateUsername(true)"
              @input="validateUsername(false)"
            />
            <div v-if="errors.username" class="error-text">{{ errors.username }}</div>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label>Password</label>
            <input
              v-model="password"
              type="password"
              class="form-input"
              placeholder="Enter your password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
            />
            <div v-if="errors.password" class="error-text">
              <div v-for="(msg, i) in errors.password.split('. ')" :key="i">{{ msg.trim() }}.</div>
            </div>
          </div>

          <!-- Login error -->
          <div v-if="error" class="error-box">{{ error }}</div>

          <!-- Submit -->
          <button type="submit" class="submit-btn">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const errors = ref({ username: null, password: null })
const router = useRouter()

const validateUsername = (blur) => {
  if (username.value.trim().length < 3) {
    if (blur) errors.value.username = 'Username must be at least 3 characters.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const pwd = password.value
  const minLength = 8
  const errorList = []

  if (pwd.length < minLength) errorList.push(`Password must be at least ${minLength} characters`)
  if (!/[A-Z]/.test(pwd)) errorList.push('Must contain an uppercase letter')
  if (!/[a-z]/.test(pwd)) errorList.push('Must contain a lowercase letter')
  if (!/\d/.test(pwd)) errorList.push('Must contain a number')
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) errorList.push('Must contain a special character')

  if (blur) errors.value.password = errorList.length > 0 ? errorList.join('. ') : ''
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

    const user = allUsers.find(
      (u) => u.username === username.value && u.password === password.value
    )

    if (!user) {
      error.value = 'Invalid username or password.'
      return
    }

    localStorage.setItem('loggedInUser', user.username)
    localStorage.setItem('currentUser', JSON.stringify(user))
    window.dispatchEvent(new Event('storage'))

    if (user.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (e) {
    error.value = 'Login failed due to a system error.'
  }
}
</script>

<style scoped>
.wrapper {
  padding: 3rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  padding: 2rem;
}

.form-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-input {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.error-text {
  margin-top: 0.4rem;
  color: #c0392b;
  font-size: 0.9rem;
}

.error-box {
  background-color: #ffe6e6;
  color: #c0392b;
  padding: 0.5rem;
  text-align: center;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #2a6fa1;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #1e5c87;
}
</style>
