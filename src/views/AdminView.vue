<template>
  <div class="container py-5">
    <div class="admin-container bg-white p-4 rounded shadow-lg">

      <!-- Title -->
      <h1 class="mb-4 text-primary">Admin Dashboard</h1>

      <!-- Welcome Message -->
      <div class="alert alert-light border mb-4">
        Welcome, <strong>{{ currentUser?.username }}</strong> ({{ currentUser?.role }})
      </div>

      <!-- User List -->
      <section class="mb-5">
        <h4 class="text-secondary mb-3">👥 Registered Users</h4>
        <ul class="list-group shadow-sm">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(user, index) in users" :key="index">
            <span>{{ user.username }}</span>
            <span class="badge bg-secondary text-uppercase">{{ user.role }}</span>
          </li>
        </ul>
      </section>

      <hr />

      <!-- Add New User -->
      <section class="mb-5">
        <h4 class="text-secondary mb-3">➕ Add New User</h4>
        <form @submit.prevent="addUser" class="bg-light p-3 rounded shadow-sm">
          <div class="row g-3">
            <div class="col-md-4">
              <input v-model="newUser.username" class="form-control" type="text" placeholder="Username" required />
            </div>
            <div class="col-md-4">
              <input v-model="newUser.password" class="form-control" type="password" placeholder="Password" required />
            </div>
            <div class="col-md-4">
              <select v-model="newUser.role" class="form-select" required>
                <option value="" disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <div class="text-end mt-3">
            <button class="btn btn-success" type="submit">Add User</button>
          </div>
        </form>
      </section>

      <hr />

      <!-- Log Records -->
      <section>
        <h4 class="text-secondary mb-3">🕒 Recent Logs</h4>
        <ul class="list-group list-group-flush small text-muted">
          <li class="list-group-item">admin logged in – 2025-07-26 10:12</li>
          <li class="list-group-item">user password changed – 2025-07-25 20:30</li>
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
  max-width: 960px;
  margin: auto;
}
h1 {
  font-weight: bold;
}
</style>
