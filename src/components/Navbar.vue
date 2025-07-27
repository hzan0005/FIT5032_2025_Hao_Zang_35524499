<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-white border-bottom">
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Logo -->
      <router-link class="navbar-brand fw-bold me-3" to="/">
        Healthy Seniors
      </router-link>

      <!-- 登录 / 注册 / 登出按钮 -->
      <div class="d-flex gap-2 order-xl-3 ms-auto">
        <router-link v-if="!isAuthenticated" class="btn btn-outline-dark btn-sm" to="/login">{{ $t('loginBtn') }}</router-link>
        <router-link v-if="!isAuthenticated" class="btn btn-dark btn-sm" to="/register">{{ $t('registerBtn') }}</router-link>
        <button v-else class="btn btn-outline-danger btn-sm" @click="handleLogout">{{ $t('logout') || 'Logout' }}</button>
      </div>

      <!-- 折叠按钮 -->
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

      <!-- 折叠菜单 -->
      <div class="collapse navbar-collapse order-xl-1" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item"><router-link class="nav-link" to="/">{{ $t('nav.home') }}</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/about">{{ $t('nav.about') }}</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/health">{{ $t('nav.health') }}</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/community">{{ $t('nav.community') }}</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/skills">{{ $t('nav.skills') }}</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/caregiver">{{ $t('nav.caregiver') }}</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/help">{{ $t('nav.help') }}</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/donate">{{ $t('nav.donate') }}</router-link></li>
          <li class="nav-item" v-if="currentUser?.role === 'admin'">
            <router-link class="nav-link" to="/admin">{{ $t('nav.admin') || 'Admin Dashboard' }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 分割线 -->
  <hr class="m-0" />

  <!-- 辅助设置栏 -->
  <div class="bg-white py-2 border-bottom">
    <div class="container d-flex justify-content-center flex-wrap gap-2 text-center">
      <button class="btn btn-outline-dark btn-sm" @click="increaseFont">A+</button>
      <button class="btn btn-outline-dark btn-sm" @click="decreaseFont">A-</button>
      <button class="btn btn-outline-dark btn-sm" @click="resetFont">Reset</button>
      <button class="btn btn-outline-secondary btn-sm">{{ $t('btnScreenReader') }}</button>
      <div class="d-flex align-items-center gap-1 ps-2">
        <a href="#" class="text-dark small" @click.prevent="switchLanguage('en')">EN</a>
        <span>|</span>
        <a href="#" class="text-dark small" @click.prevent="switchLanguage('zh')">中文</a>
        <span>|</span>
        <a href="#" class="text-dark small" @click.prevent="switchLanguage('ur')">Urdu</a>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const fontSize = ref(100)
const increaseFont = () => { if (fontSize.value < 150) fontSize.value += 10 }
const decreaseFont = () => { if (fontSize.value > 80) fontSize.value -= 10 }
const resetFont = () => { fontSize.value = 100 }

watchEffect(() => {
  document.body.style.fontSize = `${fontSize.value}%`
})

const { locale } = useI18n()
const switchLanguage = (lang) => {
  locale.value = lang
}

const router = useRouter()
const isAuthenticated = ref(false)
const currentUser = ref(null)

const updateUserState = () => {
  const userData = localStorage.getItem('currentUser')
  currentUser.value = userData ? JSON.parse(userData) : null
  isAuthenticated.value = !!userData
}

onMounted(updateUserState)
window.addEventListener('storage', updateUserState)

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  updateUserState()
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
