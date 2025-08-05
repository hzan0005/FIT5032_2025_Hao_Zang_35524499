<template>
  <div class="d-flex justify-content-center pt-5 pb-5">
    <div class="card p-4 shadow" style="width: 400px">
      <h2 class="text-center mb-4">Firebase Login</h2>
      <form @submit.prevent="signin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="text" class="form-control" id="email" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" />
        </div>
        <div class="text-danger mb-3" v-if="errorMsg">{{ errorMsg }}</div>
        <button type="submit" class="btn btn-primary w-100">Sign in via Firebase</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const errorMsg = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
  if (!email.value || !password.value) {
    errorMsg.value = "Email and Password cannot be empty."
    return
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      const user = auth.currentUser
      console.log("Firebase Login Successful!")
      console.log("Current user:", user)

      // ✅ 判断角色（根据邮箱），可改成自己的规则
      let role = "user"
      if (user.email === "admin@monash.edu") {
        role = "admin"
      }

      console.log("Logged in as role:", role)

      // ✅ 保存状态到 localStorage
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("firebaseUser", user.email)
      localStorage.setItem("userRole", role)

      router.push("/")  // 跳转首页
    })
    .catch((error) => {
      console.log("Login Error:", error.code)
      errorMsg.value = "Login failed: " + error.code
    })
}
</script>
