<template>
  <div v-if="loading">
    <p class="text-center mt-5">Loading...</p>
  </div>

  <div v-else-if="!currentUser">
    <p class="text-danger text-center mt-5">Please log in to access the rating page.</p>
  </div>

  <div v-else class="container py-4 text-center">
    <h1 class="fw-bold mb-4">Rate Our Website Sections</h1>

    <div
      v-for="section in sections"
      :key="section"
      class="border rounded p-3 mb-4 text-start"
    >
      <h4 class="text-center">{{ section }} Section</h4>

      <!-- 星级选择 -->
      <div class="mb-2 text-center">
        <button
          v-for="n in 5"
          :key="n"
          class="btn btn-outline-warning me-1"
          :class="{ 'btn-warning': userRatings[section]?.rating >= n }"
          @click="updateRating(section, n)"
          :disabled="hasRated(section)"
        >
          ★
        </button>
        <span class="ms-2 text-muted">
          {{ userRatings[section]?.rating || 0 }} / 5
        </span>
      </div>

      <!-- 评论输入 -->
      <textarea
        v-model="userRatings[section].comment"
        class="form-control mb-2"
        rows="2"
        placeholder="Leave your comment"
        :disabled="hasRated(section)"
      ></textarea>

      <!-- 提交按钮 -->
      <div class="text-center">
        <button
          class="btn btn-primary"
          @click="submitRating(section)"
          :disabled="hasRated(section)"
        >
          {{ hasRated(section) ? 'Rated' : 'Submit Rating' }}
        </button>
      </div>

      <!-- 显示平均评分和评论 -->
      <div class="mt-3">
        <p class="mb-1">
          <strong>Average:</strong>
          {{ averageRating(section).toFixed(1) }} ({{ allRatings[section]?.length || 0 }} ratings)
        </p>

        <ul class="list-group">
          <li
            v-for="(entry, idx) in showAll[section] ? allRatings[section] : allRatings[section].slice(0, 2)"
            :key="idx"
            class="list-group-item"
          >
            <div><strong>★ {{ entry.rating }}</strong></div>
            <div>{{ entry.comment }}</div>
            <div class="text-muted small mt-1">
              — {{ entry.username }} • {{ formatDate(entry.timestamp) }}
            </div>
          </li>
        </ul>

        <div class="text-center mt-2" v-if="allRatings[section]?.length > 2">
          <button class="btn btn-sm btn-outline-secondary" @click="toggleShow(section)">
            {{ showAll[section] ? 'Hide Comments' : 'Show All Comments' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sections = ['Health', 'Skills', 'Community', 'Caregiver']

const userRatings = ref({})
const allRatings = ref({})
const currentUser = ref(null)
const showAll = ref({})
const loading = ref(true)

onMounted(async () => {
  console.log('🔍 onMounted start')
  const userData = localStorage.getItem('currentUser')

  if (userData) {
    currentUser.value = JSON.parse(userData)
    console.log('✅ currentUser =', currentUser.value)
  } else {
    console.warn('⚠️ 未登录，跳过加载评分')
    loading.value = false
    return
  }

  try {
    const response = await fetch('/data/ratings.json')
    const baseData = await response.json()
    console.log('✅ ratings.json loaded:', baseData)

    const localData = JSON.parse(localStorage.getItem('localRatings') || '{}')

    sections.forEach(section => {
      const fromJson = baseData[section] || []
      const fromLocal = localData[section] || []
      const merged = [...fromJson, ...fromLocal]

      allRatings.value[section] = merged
      userRatings.value[section] = { rating: 0, comment: '' }
      showAll.value[section] = false
    })
  } catch (error) {
    console.error('❌ Failed to load /data/ratings.json:', error)
  } finally {
    loading.value = false
  }
})

const hasRated = (section) => {
  const record = JSON.parse(localStorage.getItem('ratedUsers') || '{}')
  const userRecord = record?.[currentUser.value.username]
  if (Array.isArray(userRecord)) {
    return userRecord.includes(section)
  }
  return !!userRecord
}

const updateRating = (section, value) => {
  userRatings.value[section].rating = value
}

const averageRating = (section) => {
  const ratings = allRatings.value[section]
  if (!ratings || ratings.length === 0) return 0
  return ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
}

const submitRating = (section) => {
  const { rating, comment } = userRatings.value[section]
  if (rating === 0) return alert('Please select a rating.')
  if (hasRated(section)) return alert('You have already rated this section.')

  const newEntry = {
    username: currentUser.value.username,
    rating,
    comment,
    timestamp: new Date().toISOString()
  }

  allRatings.value[section].push(newEntry)

  const localData = JSON.parse(localStorage.getItem('localRatings') || '{}')
  if (!localData[section]) localData[section] = []
  localData[section].push(newEntry)
  localStorage.setItem('localRatings', JSON.stringify(localData))

  const ratedUsers = JSON.parse(localStorage.getItem('ratedUsers') || '{}')
  if (!ratedUsers[currentUser.value.username]) {
    ratedUsers[currentUser.value.username] = []
  }
  ratedUsers[currentUser.value.username].push(section)
  localStorage.setItem('ratedUsers', JSON.stringify(ratedUsers))

  alert(`Thanks for rating the ${section} section!`)
}

const toggleShow = (section) => {
  showAll.value[section] = !showAll.value[section]
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
