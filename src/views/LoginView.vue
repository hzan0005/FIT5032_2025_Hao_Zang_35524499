<template>
  <div class="container py-4">
    <div class="d-flex justify-content-center align-items-center mt-3" style="min-height: 50vh;">
      <div class="login-card w-100" style="max-width: 420px;">
        <div class="text-center mb-4">
          <h2 class="fw-bold">Login</h2>
        </div>

        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="login-email" class="form-label">Email</label>
            <input
              id="login-email"
              v-model="username"
              type="email"
              class="form-control"
              autocomplete="username"
              required
              @blur="validateUsername(true)"
              @input="validateUsername(false)"
            />
            <div v-if="errors.username" class="text-danger small mt-1">{{ errors.username }}</div>
          </div>

          <div class="mb-3">
            <label for="login-password" class="form-label">Password</label>
            <input
              id="login-password"
              v-model="password"
              type="password"
              class="form-control"
              autocomplete="current-password"
              required
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
            />
            <div v-if="errors.password" class="text-danger small mt-1">
              <div v-for="(msg, i) in errors.password.split('. ')" :key="i">{{ msg.trim() }}.</div>
            </div>
          </div>

          <div v-if="error" class="alert alert-danger py-2 text-center small" role="alert">{{ error }}</div>

          <button type="submit" class="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const username = ref('')
const password = ref('')
const error = ref('')
const errors = ref({ username: null, password: null })
const router = useRouter()

const validateUsername = (blur) => {
  if (!username.value.includes('@') || username.value.trim().length < 6) {
    if (blur) errors.value.username = 'Invalid email format'
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
    const userCredential = await signInWithEmailAndPassword(auth, username.value, password.value)
    const user = userCredential.user

    const role = user.email === 'admin@monash.com' ? 'admin' : 'user'

    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      uid: user.uid,
      role
    }))

    window.dispatchEvent(new Event('update-user'))

    router.push(role === 'admin' ? '/admin' : '/')

  } catch (err) {
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      error.value = 'Invalid username or password'
    } else {
      error.value = 'Login error, please try again later'
    }
  }
}
</script>

<style scoped>
/* Your existing styles */
.login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  padding: 2rem 2rem 1.5rem 2rem;
}

.fixed-width {
  width: 100%;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>