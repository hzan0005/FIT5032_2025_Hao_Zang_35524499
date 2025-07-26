<!-- App.vue -->
<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- 全局导航栏 -->
    <Navbar />

    <!-- 页面主内容：始终居中且宽度固定 -->
    <main class="flex-grow-1">
      <div class="page-container py-4">
        <router-view />
      </div>
    </main>

    <!-- 全局页脚 -->
    <Footer />
    <!-- 悬浮评分组件 -->
    <FloatingRating />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'  // 导入页脚组件
import FloatingRating from './components/FloatingRating.vue'
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

main {
  flex-grow: 1;
  width: 100%;
  min-width: 100vw;
  display: flex;
  justify-content: center;
}

.page-container {
  width: 100%;
}
</style>
