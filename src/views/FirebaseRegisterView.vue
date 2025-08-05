<template>
  <div class="d-flex justify-content-center pt-5 pb-5">
    <div class="card p-4 shadow" style="width: 400px">
      <h2 class="text-center mb-4">Create an Account</h2>
      <form @submit.prevent="signup">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="text" class="form-control" id="email" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" />
        </div>
        <div class="text-danger mb-3" v-if="errorMsg">{{ errorMsg }}</div>
        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()
const auth = getAuth()

const signup = () => {
  if (!email.value || !password.value) {
    errorMsg.value = 'Email and Password cannot be empty.'
    return
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log("Firebase Register Successful!")
      console.log("New user object:", userCredential.user)  
      errorMsg.value = ''
      router.push('/firebase-signin')  
    })
    .catch((error) => {
      console.log("Registration Error:", error.code)
      errorMsg.value = "Registration failed: " + error.code
    })
}
</script>
