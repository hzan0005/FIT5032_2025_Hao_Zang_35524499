<template>
  <div class="container py-4">
    <div class="admin-container">
      <h1 class="mb-4">Admin Dashboard</h1>

      <!-- 欢迎信息 -->
      <div class="mb-4">
        <p>Welcome, <strong>{{ currentUser?.username }}</strong> ({{ currentUser?.role }}).</p>
      </div>

      <!-- 用户列表 -->
      <section class="mb-5">
        <h4>User List</h4>
        <ul class="list-group">
          <li class="list-group-item" v-for="(user, index) in users" :key="index">
            {{ user.username }} – <span class="text-muted">{{ user.role }}</span>
          </li>
        </ul>
      </section>

      <!-- 添加新用户（本地新增，仅更新前端列表） -->
      <section class="mb-5">
        <h4>Add New User</h4>
        <form @submit.prevent="addUser">
          <div class="mb-3">
            <input v-model="newUser.username" class="form-control" type="text" placeholder="Username" required />
          </div>
          <div class="mb-3">
            <input v-model="newUser.password" class="form-control" type="password" placeholder="Password" required />
          </div>
          <div class="mb-3">
            <select v-model="newUser.role" class="form-select" required>
              <option value="" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button class="btn btn-primary" type="submit">Add User</button>
        </form>
      </section>

      <!-- 日志占位 -->
      <section>
        <h4>Recent Logs (Mock)</h4>
        <ul class="text-muted small">
          <li>admin logged in – 2025-07-26 10:12</li>
          <li>user password changed – 2025-07-25 20:30</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentUser = ref(null)
const users = ref([])
const newUser = ref({ username: '', password: '', role: '' })

// 加载本地 public/data/user.json 文件
const loadUsers = async () => {
  try {
    const res = await fetch('/data/users.json')
    const data = await res.json()
    users.value = data
  } catch (err) {
    console.error('Failed to load user data:', err)
  }
}

onMounted(() => {
  const userData = localStorage.getItem('currentUser')
  currentUser.value = userData ? JSON.parse(userData) : null
  loadUsers()
})

// 本地新增用户（不会写入 JSON 文件，仅更新 users 列表）
const addUser = () => {
  if (newUser.value.username && newUser.value.password && newUser.value.role) {
    users.value.push({ ...newUser.value })
    alert(`User "${newUser.value.username}" added (not saved to file).`)
    newUser.value = { username: '', password: '', role: '' }
  }
}
</script>

<style scoped>
.admin-container {
  padding: 2rem;
  max-width: 900px;
  margin: auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
}
h1 {
  color: #2c3e50;
}
</style>
