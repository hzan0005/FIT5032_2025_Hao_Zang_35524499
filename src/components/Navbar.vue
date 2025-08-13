<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-white border-bottom">
    <div class="container-fixed d-flex align-items-center justify-content-between">
      <!-- Logo -->
      <router-link class="navbar-brand fw-bold me-3" to="/">
        Healthy Seniors
      </router-link>

      <!-- Right-side buttons -->
      <div class="d-flex align-items-center gap-3 order-xl-3 ms-auto">
        <!-- User Info -->
        <div v-if="currentUser.loggedIn" class="text-end small text-muted me-2 text-nowrap fw-bold">
          <div>{{ currentUser.email }}</div>
          <div>{{ currentUser.role }}</div>
        </div>

        <!-- Login / Register / Logout -->
        <router-link v-if="!currentUser.loggedIn" class="btn btn-outline-dark btn-sm" to="/login">
          Login
        </router-link>
        <router-link v-if="!currentUser.loggedIn" class="btn btn-dark btn-sm" to="/register">
          Register
        </router-link>
        <button v-else class="btn btn-outline-danger btn-sm" @click="handleLogout">
          Logout
        </button>
      </div>

      <!-- Collapse toggle button -->
      <button
        class="navbar-toggler order-xl-2 ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible Menu -->
      <div
        :class="['collapse', 'navbar-collapse', 'order-xl-1', { show: !isAdmin }]"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>

          <!-- 折叠菜单：只有非管理员才默认显示 -->
          <template v-if="!isAdmin">
            <li class="nav-item"><router-link class="nav-link" to="/about">About Us</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/health">Health Information</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/community">Community Programs</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/skills">Skills Development</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/caregiver">Caregiver Support</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/help">Help Center</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/donate">Donate Us</router-link></li>
          </template>

          <!-- 管理员菜单 -->
          <li class="nav-item" v-if="currentUser.role === 'admin'">
            <router-link class="nav-link" to="/admin">Admin Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="currentUser.role === 'admin'">
            <router-link class="nav-link" to="/rating">Rating Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="currentUser.role === 'admin'">
            <router-link class="nav-link" to="/sendemail">Send Email</router-link>
          </li>
          <li class="nav-item" v-if="currentUser.role === 'admin'">
            <router-link class="nav-link" to="/admin/data">Interactive Data</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const fontSize = ref(100)
const increaseFont = () => { if (fontSize.value < 150) fontSize.value += 10 }
const decreaseFont = () => { if (fontSize.value > 80) fontSize.value -= 10 }
const resetFont = () => { fontSize.value = 100 }

const { locale } = useI18n()
const switchLanguage = (lang) => {
  locale.value = lang
}

const router = useRouter()

const currentUser = reactive({
  email: '',
  uid: '',
  role: '',
  loggedIn: false
})

const updateUserState = () => {
  const userData = localStorage.getItem('currentUser')
  const user = userData ? JSON.parse(userData) : null

  if (user) {
    currentUser.email = user.email
    currentUser.uid = user.uid
    currentUser.role = user.role
    currentUser.loggedIn = true
  } else {
    currentUser.email = ''
    currentUser.uid = ''
    currentUser.role = ''
    currentUser.loggedIn = false
  }
}

const isAdmin = computed(() => currentUser.loggedIn && currentUser.role === 'admin')

onMounted(() => {
  updateUserState()
  window.addEventListener('storage', updateUserState)
  window.addEventListener('update-user', updateUserState)
})

onUnmounted(() => {
  window.removeEventListener('storage', updateUserState)
  window.removeEventListener('update-user', updateUserState)
})

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  updateUserState()
  window.dispatchEvent(new Event('update-user'))
  router.push('/login')
}
</script>

<style scoped>
.nav-link {
  white-space: nowrap;
  font-weight: 500;
  color: #333 !important;
  transition: all 0.2s ease-in-out;
}
.nav-link:hover {
  color: #0d6efd !important;
  text-decoration: underline;
}
.router-link-active {
  font-weight: 600;
  border-bottom: 2px solid #0d6efd;
  color: #0d6efd !important;
}
.btn-sm {
  border-radius: 20px;
  padding: 4px 12px;
  transition: all 0.2s ease-in-out;
}
.btn-sm:hover {
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
}
hr.m-0 {
  border-top: 1px solid #e4e4e4;
  margin: 0;
}
.bg-white .btn-outline-dark,
.bg-white .btn-outline-secondary {
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 0.85rem;
}
.bg-white .btn-outline-dark:hover,
.bg-white .btn-outline-secondary:hover {
  background-color: #f8f9fa;
}
a.text-dark.small {
  font-size: 0.85rem;
  text-decoration: none;
  padding: 2px 6px;
  border-radius: 6px;
  transition: background-color 0.2s;
}
a.text-dark.small:hover {
  background-color: #f0f0f0;
  text-decoration: none;
}
</style>
