<template>
  <div class="rating-page-container py-5">
    <div class="container">
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading ratings...</p>
      </div>

      <div v-else-if="!currentUser" class="text-center login-prompt-card">
        <img src="/images/login-prompt-image.jpg" alt="A friendly reminder to log in" class="prompt-image mb-4">
        <h2 class="fw-bold">Please Log In</h2>
        <p class="text-muted fs-5">You need to be logged in to rate our sections and view comments.</p>
        <router-link to="/login" class="btn btn-primary btn-lg mt-3">Go to Login</router-link>
      </div>

      <div v-else>
        <section class="text-center mb-5">
            <img src="/images/rating-page-banner.jpg" alt="Colorful stars representing feedback and ratings" class="header-image mb-4">
            <h1 class="display-5 fw-bold">Share Your Feedback</h1>
            <p class="lead text-muted mt-3">Your feedback helps us improve. Please take a moment to rate our website sections.</p>
        </section>

        <div class="row row-cols-1 row-cols-md-2 justify-content-center g-4">
          <div
            v-for="section in sections"
            :key="section"
            class="col"
          >
            <div class="rating-card p-4 h-100">
              <h3 class="text-center mb-3">{{ section }} Section</h3>

              <div class="star-rating mb-3 text-center">
                <button
                  v-for="n in 5"
                  :key="n"
                  class="star-btn"
                  :class="{ 'rated': userRatings[section]?.rating >= n }"
                  @click="updateRating(section, n)"
                  :disabled="hasRated(section)"
                  :aria-label="`Rate ${n} out of 5 stars for ${section}`"
                >★</button>
              </div>

              <div v-if="!hasRated(section)">
                <label :for="`comment-${section}`" class="form-label visually-hidden">Comment for {{ section }}</label>
                <textarea
                  :id="`comment-${section}`"
                  v-model="userRatings[section].comment"
                  class="form-control mb-3"
                  rows="3"
                  placeholder="Tell us more about your experience..."
                ></textarea>
                <div class="text-center">
                  <button
                    class="btn btn-success"
                    @click="submitRating(section)"
                    :disabled="isSubmitting"
                  >
                    {{ isSubmitting ? 'Submitting...' : 'Submit Your Rating' }}
                  </button>
                </div>
              </div>
               <div v-else class="text-center text-success fw-bold p-3 bg-light rounded">
                ✓ Thank you for rating this section!
              </div>

              <div v-if="allRatings[section]?.length > 0" class="mt-4">
                <h5 class="text-muted">What others are saying... (Avg: {{ averageRating(section).toFixed(1) }})</h5>
                <ul class="list-group list-group-flush mt-3">
                  <li
                    v-for="(entry, idx) in showAll[section] ? allRatings[section] : allRatings[section].slice(0, 2)"
                    :key="idx"
                    class="list-group-item px-0"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <strong class="mb-1">
                        <span :class="`text-rating-${entry.rating}`">{{ '★'.repeat(entry.rating) }}</span>
                      </strong>
                      <small class="text-muted">{{ formatDate(entry.timestamp) }}</small>
                    </div>
                    <p class="mb-1" v-html="escapeHTML(entry.comment)"></p>
                    <small class="text-muted">— {{ entry.username }}</small>
                  </li>
                </ul>
                <div class="text-center mt-3" v-if="allRatings[section]?.length > 2">
                  <button class="btn btn-sm btn-outline-secondary" @click="toggleShow(section)">
                    {{ showAll[section] ? 'Show Less' : 'Show All Comments' }}
                  </button>
                </div>
              </div>

            </div>
          </div>
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
const isSubmitting = ref(false)

onMounted(async () => {
  const userData = localStorage.getItem('currentUser')

  if (userData) {
    currentUser.value = JSON.parse(userData)
  } else {
    loading.value = false
    return
  }

  try {
    const response = await fetch('/data/ratings.json')
    const baseData = await response.json()

    const localData = JSON.parse(localStorage.getItem('localRatings') || '{}')

    sections.forEach(section => {
      const fromJson = baseData[section] || []
      const fromLocal = localData[section] || []
      const merged = [...fromJson, ...fromLocal].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


      allRatings.value[section] = merged
      userRatings.value[section] = { rating: 0, comment: '' }
      showAll.value[section] = false
    })
  } catch (error) {
    console.error('Failed to load /data/ratings.json:', error)
  } finally {
    loading.value = false
  }
})

const hasRated = (section) => {
  if (!currentUser.value?.email) return true;
  const record = JSON.parse(localStorage.getItem('ratedUsers') || '{}')
  const userRecord = record?.[currentUser.value.email]
  if (Array.isArray(userRecord)) {
    return userRecord.includes(section)
  }
  return false
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
  if (isSubmitting.value) return
  isSubmitting.value = true

  const { rating, comment } = userRatings.value[section]
  if (rating === 0) {
    alert('Please select a rating.')
    isSubmitting.value = false
    return
  }
  if (hasRated(section)) {
    alert('You have already rated this section.')
    isSubmitting.value = false
    return
  }
  if (comment.trim().length < 5) {
    alert('Comment must be at least 5 characters.')
    isSubmitting.value = false
    return
  }

  const newEntry = {
    username: currentUser.value.email,
    rating,
    comment: comment.trim(),
    timestamp: new Date().toISOString()
  }

  allRatings.value[section].unshift(newEntry)

  const localData = JSON.parse(localStorage.getItem('localRatings') || '{}')
  if (!localData[section]) localData[section] = []
  localData[section].push(newEntry)
  localStorage.setItem('localRatings', JSON.stringify(localData))

  const ratedUsers = JSON.parse(localStorage.getItem('ratedUsers') || '{}')
  if (!ratedUsers[currentUser.value.email]) {
    ratedUsers[currentUser.value.email] = []
  }
  ratedUsers[currentUser.value.email].push(section)
  localStorage.setItem('ratedUsers', JSON.stringify(ratedUsers))

  setTimeout(() => {
    isSubmitting.value = false
  }, 1000)
}

const toggleShow = (section) => {
  showAll.value[section] = !showAll.value[section]
}

const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' });
}

const escapeHTML = (str) => {
  if (!str) return ''
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
}
</script>

<style scoped>
.rating-page-container {
  background-color: #f8f9fa;
}

.header-image {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    border: 6px solid #fff;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.login-prompt-card {
    background: #fff;
    border-radius: 1rem;
    padding: 3rem;
    max-width: 600px;
    margin: 2rem auto;
    box-shadow: 0 8px 20px rgba(0,0,0,0.07);
}
.prompt-image {
    width: 150px;
    height: 150px;
    object-fit: contain;
}

.rating-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.07);
}

.star-rating .star-btn {
  background: none;
  border: none;
  color: #d3d3d3;
  font-size: 2.5rem;
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
  padding: 0 0.2rem;
}

.star-rating .star-btn:hover {
  transform: scale(1.1);
}

.star-rating .star-btn.rated,
.star-rating:hover .star-btn:hover,
.star-rating .star-btn:hover ~ .star-btn {
  color: #ffc107;
}

.star-rating:hover .star-btn {
  color: #ffdd7a;
}
.text-rating-5 { color: #28a745; }
.text-rating-4 { color: #8bc34a; }
.text-rating-3 { color: #ffc107; }
.text-rating-2 { color: #fd7e14; }
.text-rating-1 { color: #dc3545; }

textarea {
  resize: none;
}
</style>