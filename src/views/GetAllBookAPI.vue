<template>
  <div class="container mt-5 text-center">
    <h3 class="mb-4">All Books (from Firebase)</h3>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-danger">{{ error }}</div>

    <pre v-if="books.length">{{ JSON.stringify(books, null, 2) }}</pre>
    <p v-else-if="!loading">No books found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../Firebase/init.js'
import { collection, getDocs } from 'firebase/firestore'

const books = ref([])
const loading = ref(true)
const error = ref(null)

const fetchBooks = async () => {
  loading.value = true
  try {
    const snapshot = await getDocs(collection(db, 'books'))
    books.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    error.value = 'Failed to load books: ' + err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchBooks)
</script>
