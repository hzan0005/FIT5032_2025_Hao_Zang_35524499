<template>
  <div class="container mt-5">
    <div class="mx-auto" style="max-width: 700px;">
      <!-- Add new book -->
      <h3 class="text-center mb-4">Add New Book</h3>
      <form @submit.prevent="addBook" class="mb-5">
        <div class="row g-3 align-items-end">
          <div class="col-md-6">
            <label for="isbn" class="form-label">ISBN:</label>
            <input
              type="text"
              v-model="isbn"
              id="isbn"
              required
              class="form-control"
            />
          </div>
          <div class="col-md-6">
            <label for="name" class="form-label">Name:</label>
            <input
              type="text"
              v-model="name"
              id="name"
              required
              class="form-control"
            />
          </div>
          <div class="col-12 text-center">
            <button type="submit" class="btn btn-primary px-4">Add Book</button>
          </div>
        </div>
      </form>

      <!-- Filter books -->
      <h3 class="text-center mb-3">Filter Books</h3>
      <div class="row g-3 align-items-end mb-5">
        <div class="col-md-6">
          <label class="form-label">Min ISBN:</label>
          <input type="number" class="form-control" v-model.number="isbnMin" />
        </div>
        <div class="col-md-6">
          <label class="form-label">Max ISBN (optional):</label>
          <input type="number" class="form-control" v-model.number="isbnMax" />
        </div>
        <div class="col-md-6">
          <label class="form-label">Sort Order:</label>
          <select v-model="sortOrder" class="form-select">
            <option value="asc">ISBN Ascending</option>
            <option value="desc">ISBN Descending</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Limit Result:</label>
          <input type="number" class="form-control" v-model.number="resultLimit" />
        </div>
      </div>

      <!-- Book List Results -->
      <h4 class="text-center mb-3">Results</h4>
      <BookList
        :refreshFlag="refreshFlag"
        :isbnMin="isbnMin"
        :isbnMax="isbnMax"
        :sortOrder="sortOrder"
        :resultLimit="resultLimit"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { db } from '../Firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

export default {
  components: {
    BookList
  },
  setup() {
    const isbn = ref('')
    const name = ref('')
    const refreshFlag = ref(0)
    const isbnMin = ref(0)
    const isbnMax = ref(null)
    const sortOrder = ref('asc')
    const resultLimit = ref(5)

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        })

        isbn.value = ''
        name.value = ''
        refreshFlag.value++
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    return {
      isbn,
      name,
      addBook,
      refreshFlag,
      isbnMin,
      isbnMax,
      sortOrder,
      resultLimit
    }
  }
}
</script>
