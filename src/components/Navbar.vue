<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
    <div class="container">
      <!-- 品牌或Logo -->
      <router-link class="navbar-brand fw-bold" to="/">
        Healthy Seniors
      </router-link>

      <!-- 折叠按钮（汉堡菜单） -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 菜单项 -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">{{ $t('nav.home') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">{{ $t('nav.about') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/health">{{ $t('nav.health') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/community">{{ $t('nav.community') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/skills">{{ $t('nav.skills') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/caregiver">{{ $t('nav.caregiver') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/help">{{ $t('nav.help') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/donate">{{ $t('nav.donate') }}</router-link>
          </li>

          <!-- ✅ 仅管理员可见 -->
          <li class="nav-item" v-if="currentUser?.role === 'admin'">
            <router-link class="nav-link" to="/admin">{{ $t('nav.admin') || 'Admin Dashboard' }}</router-link>
          </li>
        </ul>

        <!-- 登录/登出按钮 -->
        <div class="d-flex gap-2">
          <router-link v-if="!isAuthenticated" class="btn btn-outline-dark btn-sm" to="/login">{{ $t('loginBtn') }}</router-link>
          <router-link v-if="!isAuthenticated" class="btn btn-dark btn-sm" to="/register">{{ $t('registerBtn') }}</router-link>
          <button v-else class="btn btn-outline-danger btn-sm" @click="handleLogout">{{ $t('logout') || 'Logout' }}</button>
        </div>
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
}
</style>
