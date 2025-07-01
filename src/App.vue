<template>
  <div id="app">
    <JSONLab />
  </div>
</template>

<script setup>
import JSONLab from './components/JSON.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #eef2f5; /* 全局背景色 */
}

#app {
  padding: 40px; /* 控制页面边距 */
  display: flex;
  justify-content: center;
}
</style>
