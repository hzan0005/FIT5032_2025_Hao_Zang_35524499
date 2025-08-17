<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-white border-bottom">
    <div class="container-fixed d-flex align-items-center justify-content-between">
      <router-link class="navbar-brand fw-bold me-3" to="/">
        Healthy Seniors
      </router-link>

      <div class="d-flex align-items-center gap-3 order-xl-3 ms-auto">
        <div v-if="currentUser.loggedIn" class="text-end small text-muted me-2 text-nowrap fw-bold">
          <div>{{ currentUser.email }}</div>
          <div>{{ currentUser.role }}</div>
        </div>

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

      <div
        :class="['collapse', 'navbar-collapse', 'order-xl-1']"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active">Home</router-link>
          </li>

          <template v-if="!isAdmin">
            <li class="nav-item"><router-link class="nav-link" to="/about" active-class="active">About Us</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/health" active-class="active">Health Information</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/community" active-class="active">Community Programs</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/skills" active-class="active">Skills Development</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/caregiver" active-class="active">Caregiver Support</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/map" active-class="active">Map Navigator</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/booking" active-class="active">Booking Calendar</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/help" active-class="active">Help Center</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/donate" active-class="active">Donate Us</router-link></li>
          </template>

          <li class="nav-item" v-if="currentUser.role === 'admin'">
            <router-link class="nav-link" to="/admin" active-class="active">Admin Dashboard</router-link>
          </li>
           <li class="nav-item" v-if="currentUser.role === 'admin'">
            <router-link class="nav-link" to="/admin/data" active-class="active">Interactive Data</router-link>
          </li>
          <li class="nav-item" v-if="currentUser.role === 'admin'">
            <router-link class="nav-link" to="/rating" active-class="active">Rating View</router-link>
          </li>
          <li class="nav-item" v-if="currentUser.role === 'admin'">
            <router-link class="nav-link" to="/sendemail" active-class="active">Send Email</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

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
}

/* ★ FIX: Target Bootstrap's .active class directly */
.nav-link.active {
  font-weight: 700;
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
</style>