<script setup>
import { logout } from '../auth.js'
import { ref, onMounted, watch } from 'vue' 
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isAuthenticated = ref(false)
const userEmail = ref('')
const userRole = ref('')

const checkAuth = () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  userEmail.value = localStorage.getItem('firebaseUser') || ''
  userRole.value = localStorage.getItem('userRole') || ''
}

onMounted(() => {
  checkAuth()
})
watch(() => route.fullPath, () => {
  checkAuth()
})

const handleLogout = () => {
  logout()
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('firebaseUser')
  localStorage.removeItem('userRole')
  isAuthenticated.value = false
  userEmail.value = ''
  userRole.value = ''
  router.push('/firebase-signin')
}
</script>

<template>
  <div class="container">
    <header class="position-relative py-3">

      <!-- ✅ 居中菜单 -->
      <ul class="nav nav-pills justify-content-center main-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" exact-active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active" exact-active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add-book" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>
        <li class="nav-item">
         <router-link to="/countbookapi" class="nav-link" active-class="active">Count Book API</router-link>
        </li>
        <li class="nav-item">
         <router-link to="/getallbookapi" class="nav-link" active-class="active">All Books API</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/firebase-signin" class="nav-link" active-class="active" exact-active-class="active">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/fireregister" class="nav-link" active-class="active" exact-active-class="active">Register</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a class="nav-link" href="#" @click.prevent="handleLogout">Logout</a>
        </li>
      </ul>

      <!-- ✅ 右上角用户信息 -->
      <div class="user-info text-end">
        <template v-if="isAuthenticated">
          <div class="fw-bold"> {{ userEmail }}</div>
          <div class="text-muted" style="font-size: 0.9rem;">Role: {{ userRole }}</div>
        </template>
      </div>

    </header>
  </div>
</template>

<style scoped>
/* ✅ 居中菜单真正实现 */
/* ✅ 导航栏整体一行居中显示 */
.main-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  margin-top: 0.5rem;
  display: flex;           /* 🔥 强制一行显示 */
  flex-wrap: nowrap;       /* 🔥 禁止换行 */
  align-items: center;
  justify-content: center;
  gap: 1rem;                /* 项之间间距 */
  padding: 0;
  list-style: none;
}

/* ✅ 用户信息固定在右侧 */
.user-info {
  position: absolute;
  right: 0;
  top: 0.5rem;
}

/* ✅ 保证 router-link 内文字不换行 */
.nav-link {
  white-space: nowrap;
}

</style>
