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

const currentUser = ref(null);
const users = ref([]);
const newUser = ref({ email: '', password: '', role: 'user' });
const loadingUsers = ref(true);
const totalRatings = ref(0);

// --- 数据计算属性 ---
const totalUsers = computed(() => users.value.length);
const adminCount = computed(() => users.value.filter(u => u.role === 'admin').length);

// --- 生命周期钩子 ---
onMounted(() => {
  const userData = localStorage.getItem('currentUser');
  currentUser.value = userData ? JSON.parse(userData) : null;
  
  // 在真实应用中，这里会调用云函数
  fetchUsersFromBackend();
  fetchTotalRatings();
});

// --- 方法 ---

// 模拟: 从后端(云函数)获取用户列表
async function fetchUsersFromBackend() {
  loadingUsers.value = true;
  console.warn("Security Warning: In a real app, user list should be fetched from a secure backend (e.g., Firebase Cloud Function), not a public JSON file.");
  
  // **未来替换**: 此处应替换为对 Firebase Cloud Function 的 https 调用
  // const response = await fetch('YOUR_CLOUD_FUNCTION_URL/listUsers');
  // const data = await response.json();
  
  // **当前模拟**: 继续使用 users.json 作为模拟数据源
  try {
    const res = await fetch('/data/users.json');
    const data = await res.json();
    
    // 模拟真实 Firebase Auth 返回的数据结构
    users.value = data.map(u => ({
        uid: `mock-uid-${Math.random()}`, // 模拟 UID
        email: u.username, // 字段名映射
        role: u.role,
        lastSignInTime: '2025-08-14' // 模拟数据
    }));

  } catch (err) {
    console.error('Failed to load user data:', err);
  } finally {
    loadingUsers.value = false;
  }
}

// 获取总评分数
async function fetchTotalRatings() {
    try {
        const response = await fetch('/data/ratings.json');
        const data = await response.json();
        let count = 0;
        for (const section in data) {
            count += data[section].length;
        }
        totalRatings.value = count;
    } catch(err) {
        console.error("Could not fetch ratings count", err)
    }
}

// 添加用户
async function addUser() {
  alert("重要提示：\n\n此功能使用了Firebase客户端SDK的`createUserWithEmailAndPassword`。\n\n在真实应用中，创建用户应通过安全的后端（云函数）完成，以避免安全风险并正确分配角色。\n\n使用客户端创建后，新用户会自动登录，这可能会中断您当前的管理员会话。");
  
  const auth = getAuth();
  try {
    // **注意**: 这将在客户端创建用户，并自动登录该新用户
    const userCredential = await createUserWithEmailAndPassword(auth, newUser.value.email, newUser.value.password);
    
    // **未来**: 调用云函数来设置自定义角色 (custom claims)
    // await fetch('YOUR_CLOUD_FUNCTION_URL/setUserRole', { method: 'POST', body: JSON.stringify({ uid: userCredential.user.uid, role: newUser.value.role }) });

    alert(`用户 ${userCredential.user.email} 已创建成功。请注意，您可能需要重新登录管理员账户。`);
    
    // 刷新用户列表 (在真实应用中会重新调用 fetchUsersFromBackend)
    users.value.push({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        role: newUser.value.role, // 模拟角色设置
        lastSignInTime: new Date().toLocaleDateString()
    });

    newUser.value = { email: '', password: '', role: 'user' };

  } catch (error) {
    console.error("Error creating user:", error);
    alert(`创建用户失败: ${error.message}`);
  }
}

// 修改角色 (模拟)
function changeRole(user) {
  const newRole = user.role === 'admin' ? 'user' : 'admin';
  if (confirm(`Are you sure you want to change ${user.email}'s role to "${newRole}"?`)) {
    // **未来**: 此处应调用云函数来修改用户的自定义角色
    // await fetch('YOUR_CLOUD_FUNCTION_URL/setUserRole', { method: 'POST', body: JSON.stringify({ uid: user.uid, role: newRole }) });
    
    // **当前模拟**: 直接修改前端数据
    const userIndex = users.value.findIndex(u => u.uid === user.uid);
    if (userIndex !== -1) {
      users.value[userIndex].role = newRole;
    }
    alert(`${user.email}'s role has been changed to "${newRole}". (This is a frontend simulation)`);
  }
}

// 删除用户 (模拟)
function deleteUser(user) {
   if (confirm(`Are you sure you want to delete the user ${user.email}? This action cannot be undone.`)) {
    // **未来**: 此处应调用云函数来从 Firebase Auth 中删除用户
    // await fetch('YOUR_CLOUD_FUNCTION_URL/deleteUser', { method: 'POST', body: JSON.stringify({ uid: user.uid }) });

    // **当前模拟**: 直接从前端列表中移除
    users.value = users.value.filter(u => u.uid !== user.uid);
    alert(`User ${user.email} has been deleted. (This is a frontend simulation)`);
   }
}
</script>

<style scoped>
.admin-view-container {
  background-color: #f0f2f5;
}

.stat-card {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.stat-icon {
  width: 60px;
  height: 60px;
}

.user-management-card {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
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