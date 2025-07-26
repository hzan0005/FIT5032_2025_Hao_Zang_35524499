<!-- Navbar.vue -->
<template>
  <!-- 顶部导航栏 -->
  <div class="bg-white border-bottom">
    <div class="container px-0">
      <nav class="d-flex flex-wrap justify-content-center gap-3 py-2 text-center overflow-x-auto" style="max-width: 100%;">
        <router-link class="nav-link text-dark fw-semibold" to="/">{{ $t('nav.home') }}</router-link>
        <router-link class="nav-link text-dark fw-semibold" to="/about">{{ $t('nav.about') }}</router-link>
        <a class="nav-link text-dark fw-semibold" href="#">{{ $t('nav.health') }}</a>
        <a class="nav-link text-dark fw-semibold" href="#">{{ $t('nav.community') }}</a>
        <a class="nav-link text-dark fw-semibold" href="#">{{ $t('nav.skills') }}</a>
        <a class="nav-link text-dark fw-semibold" href="#">{{ $t('nav.caregiver') }}</a>
        <a class="nav-link text-dark fw-semibold" href="#">{{ $t('nav.help') }}</a>
        <a class="nav-link text-dark fw-semibold" href="#">{{ $t('nav.donate') }}</a>
      </nav>
    </div>
  </div>

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
import { useI18n } from 'vue-i18n'
import { ref, watchEffect } from 'vue'

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
</script>

<style scoped>
.nav-link {
  padding: 0 !important;
  white-space: nowrap;
}
</style>
