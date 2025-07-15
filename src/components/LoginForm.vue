<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-10">
        <h1 class="text-center mb-4">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <!-- Username & Password -->
          <div class="row mb-4">
            <div class="col-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <!-- Australian Resident & Gender -->
          <div class="row mb-4">
            <div class="col-6">
              <div class="form-check mt-4">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  @change="() => validateResident(true)"
                />
                <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
                <label class="form-check-label" for="isAustralian"> Australian Resident? </label>
              </div>
            </div>
            <div class="col-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @blur="() => validateGender(true)"
                @change="() => validateGender(false)"
              >
                <option value="">Select your gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>

          <!-- Reason for Joining -->
          <div class="row mb-4">
            <div class="col-12">
              <label for="reason" class="form-label">Reason for Joining</label>
              <textarea
                class="form-control"
                id="reason"
                rows="3"
                v-model="formData.reason"
                @blur="() => validateReason(true)"
                @input="() => validateReason(false)"
              ></textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="text-center mt-4 d-flex justify-content-center gap-3">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <!-- ✅ PrimeVue DataTable 显示用户信息（新添加） -->
        <DataTable
          :value="submittedCards"
          class="mt-5"
          tableStyle="min-width: 100%"
          stripedRows
          paginator
          rows="5"
          responsiveLayout="scroll"
        >
          <Column field="username" header="Username" />
          <Column field="password" header="Password" />
          <Column field="gender" header="Gender" />
          <Column
            field="isAustralian"
            header="Resident?"
            :body="(row) => (row.isAustralian ? 'Yes' : 'No')"
          />
          <Column field="reason" header="Reason" />
        </DataTable>

        <!-- ❌ Bootstrap Card 显示功能已注释 -->
        <!--
        <div class="row mt-5 gx-4 gy-4" v-if="submittedCards.length">
          <div
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            v-for="(card, index) in submittedCards"
            :key="index"
          >
            <div class="card h-100">
              <div class="card-header">User Information</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Username: {{ card.username }}</li>
                <li class="list-group-item">Password: {{ card.password }}</li>
                <li class="list-group-item">
                  Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
                </li>
                <li class="list-group-item">Gender: {{ card.gender }}</li>
                <li class="list-group-item">Reason: {{ card.reason }}</li>
              </ul>
            </div>
          </div>
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  const hasError = Object.values(errors.value).some((e) => e !== null)
  if (!hasError) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
}

const errors = ref({
  username: null,
  password: null,
  isAustralian: null,
  gender: null,
  reason: null,
})
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}
const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.isAustralian = 'You must confirm Australian residency.'
  } else {
    errors.value.isAustralian = null
  }
}
const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select your gender.'
  } else {
    errors.value.gender = null
  }
}
const validateReason = (blur) => {
  if (formData.value.reason.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters.'
  } else {
    errors.value.reason = null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
