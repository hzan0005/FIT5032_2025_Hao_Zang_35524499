<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <BHeader />
  <router-view />
</template>

<style>
.nav-link.active {
  background-color: #0d6efd;
  color: white !important;
}
</style>
