<template>
  <div class="admin-view-container py-5">
    <div class="container">
      <section class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="display-5 fw-bold">Admin Dashboard</h1>
          <p class="text-muted">Welcome back, {{ currentUser?.email || 'Admin' }}.</p>
        </div>
      </section>

      <section class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="stat-card p-4 d-flex align-items-center">
            <img src="/images/icon-total-users.png" alt="Total users icon" class="stat-icon me-3">
            <div>
              <div class="fs-2 fw-bold">{{ totalUsers }}</div>
              <div class="text-muted">Total Users</div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card p-4 d-flex align-items-center">
            <img src="/images/icon-admins.png" alt="Admins icon" class="stat-icon me-3">
            <div>
              <div class="fs-2 fw-bold">{{ adminCount }}</div>
              <div class="text-muted">Administrators</div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card p-4 d-flex align-items-center">
             <img src="/images/icon-recent-ratings.png" alt="Ratings icon" class="stat-icon me-3">
            <div>
              <div class="fs-2 fw-bold">{{ totalRatings }}</div>
              <div class="text-muted">Total Ratings Submitted</div>
            </div>
          </div>
        </div>
      </section>

      <section class="row g-4 mb-5">
        <div class="col-lg-8">
            <div class="chart-card p-4 h-100">
                <h2 class="fw-bold mb-3">Average Section Ratings</h2>
                <div style="height: 350px">
                  <Bar v-if="ratingsChartData.labels.length > 0" :data="ratingsChartData" :options="barChartOptions" />
                  <div v-else class="text-center text-muted d-flex align-items-center justify-content-center h-100">
                      Loading chart data...
                  </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
             <div class="chart-card p-4 h-100">
                <h2 class="fw-bold mb-3">User Types</h2>
                 <div style="height: 350px">
                    <Doughnut v-if="userTypesChartData.labels.length > 0" :data="userTypesChartData" :options="doughnutChartOptions" />
                     <div v-else class="text-center text-muted d-flex align-items-center justify-content-center h-100">
                        Loading user data...
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section class="user-management-card p-4">
        <h2 class="fw-bold mb-4">User Management</h2>
        
        <div class="mb-4">
            <h4 class="text-secondary mb-3">➕ Add New User</h4>
            <form @submit.prevent="addUser" class="p-3 bg-light rounded">
              <div class="row g-3 align-items-center">
                <div class="col-md-4">
                  <label for="new-username" class="visually-hidden">Email</label>
                  <input id="new-username" v-model="newUser.email" class="form-control" type="email" placeholder="User Email" required />
                </div>
                <div class="col-md-3">
                   <label for="new-password" class="visually-hidden">Password</label>
                  <input id="new-password" v-model="newUser.password" class="form-control" type="password" placeholder="Password" required />
                </div>
                <div class="col-md-3">
                   <label for="new-role" class="visually-hidden">Role</label>
                  <select id="new-role" v-model="newUser.role" class="form-select" required>
                    <option value="" disabled>Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <button class="btn btn-primary w-100" type="submit">Add User</button>
                </div>
              </div>
            </form>
        </div>

        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Last Signed In</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loadingUsers">
                <td colspan="4" class="text-center">
                  <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                   Loading users...
                </td>
              </tr>
              <tr v-for="user in users" :key="user.uid">
                <td>{{ user.email }}</td>
                <td>
                  <span :class="['badge', user.role === 'admin' ? 'bg-success' : 'bg-secondary']">
                    {{ user.role }}
                  </span>
                </td>
                <td>{{ user.lastSignInTime || 'N/A' }}</td>
                <td>
                  <button @click="changeRole(user)" class="btn btn-sm btn-outline-secondary me-2">Change Role</button>
                  <button @click="deleteUser(user)" class="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// --- 图表库导入 ---
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const currentUser = ref(null);
const users = ref([]);
const newUser = ref({ email: '', password: '', role: 'user' });
const loadingUsers = ref(true);
const totalRatings = ref(0);

// --- 图表数据 ---
const ratingsChartData = ref({ labels: [], datasets: [] });
const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } } },
  plugins: { legend: { display: false } },
  barPercentage: 0.5,
  categoryPercentage: 0.8
};
const userTypesChartData = ref({ labels: ['Users', 'Admins'], datasets: [] });
const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false
};

// --- 计算属性 ---
const totalUsers = computed(() => users.value.length);
const adminCount = computed(() => users.value.filter(u => u.role === 'admin').length);

// --- 生命周期钩子 ---
onMounted(() => {
  const auth = getAuth();
  currentUser.value = auth.currentUser;
  fetchUsersFromBackend();
  fetchRatingsData();
});

// --- ★ 新增 ★: 生成随机日期的辅助函数 ---
function getRandomRecentDate() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30); // 设置一个30天的时间范围
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    const year = randomDate.getFullYear();
    const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
    const day = randomDate.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}


// --- 方法 ---

async function fetchUsersFromBackend() {
  loadingUsers.value = true;
  try {
    const res = await fetch('/data/users.json');
    const data = await res.json();
    
    // ★ 修改 ★: 使用辅助函数生成随机日期
    users.value = data.map(u => ({
        uid: `mock-uid-${Math.random()}`,
        email: u.username,
        role: u.role,
        lastSignInTime: getRandomRecentDate() // <-- 调用函数
    }));
    
    updateUserTypesChart();

  } catch (err) {
    console.error('Failed to load user data:', err);
  } finally {
    loadingUsers.value = false;
  }
}

async function fetchRatingsData() {
    try {
        const response = await fetch('/data/ratings.json');
        const data = await response.json();
        const labels = [];
        const averages = [];
        let totalCount = 0;
        for (const section in data) {
            labels.push(section);
            const ratings = data[section];
            totalCount += ratings.length;
            const average = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;
            averages.push(average.toFixed(2));
        }
        totalRatings.value = totalCount;
        ratingsChartData.value = {
            labels: labels,
            datasets: [{
                label: 'Average Rating',
                backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
                borderRadius: 5,
                data: averages
            }]
        };
    } catch(err) {
        console.error("Could not fetch ratings data", err)
    }
}

function updateUserTypesChart() {
    const normalUsers = totalUsers.value - adminCount.value;
    userTypesChartData.value = {
        labels: ['Regular Users', 'Admins'],
        datasets: [{
            backgroundColor: ['#0d6efd', '#198754'],
            data: [normalUsers, adminCount.value]
        }]
    };
}

async function addUser() {
  alert("NOTE: This uses the client-side Firebase SDK for demonstration. In a real app, this should be a secure backend function. Creating a user here will sign you out of your admin account.");
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, newUser.value.email, newUser.value.password);
    alert(`User ${userCredential.user.email} created. You may need to log back in as admin.`);
    users.value.push({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        role: newUser.value.role,
        lastSignInTime: new Date().toLocaleDateString()
    });
    updateUserTypesChart();
    newUser.value = { email: '', password: '', role: 'user' };
  } catch (error) {
    console.error("Error creating user:", error);
    alert(`Failed to create user: ${error.message}`);
  }
}

function changeRole(user) {
  const newRole = user.role === 'admin' ? 'user' : 'admin';
  if (confirm(`Are you sure you want to change ${user.email}'s role to "${newRole}"?`)) {
    const userIndex = users.value.findIndex(u => u.uid === user.uid);
    if (userIndex !== -1) {
      users.value[userIndex].role = newRole;
      updateUserTypesChart();
    }
    alert(`${user.email}'s role has been changed to "${newRole}". (Frontend simulation)`);
  }
}

function deleteUser(user) {
   if (confirm(`Are you sure you want to delete the user ${user.email}? This action cannot be undone.`)) {
    users.value = users.value.filter(u => u.uid !== user.uid);
    updateUserTypesChart();
    alert(`User ${user.email} has been deleted. (Frontend simulation)`);
   }
}
</script>

<style scoped>
.admin-view-container {
  background-color: #f0f2f5;
}
.stat-card, .chart-card, .user-management-card {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.stat-icon {
  width: 60px;
  height: 60px;
}
.table {
  font-size: 0.95rem;
}
.table thead th {
  text-transform: uppercase;
  color: #6c757d;
  font-weight: 600;
}
</style>