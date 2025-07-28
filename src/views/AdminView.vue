<template>
  <div class="container">
    <div class="admin-container">

      <!-- Title -->
      <h1 class="admin-title">Admin Dashboard</h1>

      <!-- Welcome Message -->
      <div class="welcome-box">
        Welcome, <strong>{{ currentUser?.username }}</strong> ({{ currentUser?.role }})
      </div>

      <!-- User List -->
      <section class="section">
        <h4 class="section-title">👥 Registered Users</h4>
        <ul class="user-list">
          <li class="user-item" v-for="(user, index) in users" :key="index">
            <span>{{ user.username }}</span>
            <span class="role-badge">{{ user.role }}</span>
          </li>
        </ul>
      </section>

      <hr class="divider" />

      <!-- Add New User -->
      <section class="section">
        <h4 class="section-title">➕ Add New User</h4>
        <form @submit.prevent="addUser" class="form-box">
          <div class="form-row">
            <input v-model="newUser.username" type="text" placeholder="Username" required />
            <input v-model="newUser.password" type="password" placeholder="Password" required />
            <select v-model="newUser.role" required>
              <option value="" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit">Add User</button>
          </div>
        </form>
      </section>

      <hr class="divider" />

      <!-- Log Records -->
      <section class="section">
        <h4 class="section-title">🕒 Recent Logs</h4>
        <ul class="log-list">
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
.container {
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
}

.admin-container {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 960px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.admin-title {
  font-size: 2rem;
  color: #2b6cb0;
  margin-bottom: 20px;
}

.welcome-box {
  background: #fafafa;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 30px;
  border-radius: 6px;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 15px;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}

.user-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  background: #fdfdfd;
}

.user-item:last-child {
  border-bottom: none;
}

.role-badge {
  background-color: #666;
  color: white;
  padding: 2px 8px;
  font-size: 0.8rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.divider {
  border: none;
  height: 1px;
  background: #ccc;
  margin: 30px 0;
}

.form-box {
  background: #f2f2f2;
  padding: 20px;
  border-radius: 6px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (min-width: 768px) {
  .form-row {
    flex-direction: row;
  }
}

.form-row input,
.form-row select {
  padding: 10px;
  font-size: 1rem;
  flex: 1;
  border: 1px solid #bbb;
  border-radius: 4px;
}

.form-actions {
  margin-top: 15px;
  text-align: right;
}

.form-actions button {
  background-color: #2e7d32;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.form-actions button:hover {
  background-color: #1b5e20;
}

.log-list {
  font-size: 0.9rem;
  color: #666;
  padding-left: 0;
  list-style: none;
  margin: 0;
}

.log-list li {
  padding: 6px 0;
}
</style>
