<!-- App.vue -->
<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Navbar />
    <main class="flex-grow-1">
      <div class="container px-3">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}
</style>
