<template>
  <div>
    <h4>Results</h4>
    <ul class="list-group">
      <li class="list-group-item" v-for="book in books" :key="book.id">
        {{ book.name }} — ISBN: {{ book.isbn }}
      </li>
    </ul>
    <p v-if="books.length === 0" class="text-muted">No results found.</p>
  </div>
</template>

<script>
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore'
import { ref, watch, onMounted } from 'vue'
import { db } from '../Firebase/init'

export default {
  props: {
    refreshFlag: Number,
    isbnMin: Number,
    isbnMax: Number,
    sortOrder: String,
    resultLimit: Number
  },
  setup(props) {
    const books = ref([])

    const fetchBooks = async () => {
      try {
        const conditions = []

        // where isbn >= min
        if (props.isbnMin != null) {
          conditions.push(where('isbn', '>=', props.isbnMin))
        }

        // where isbn <= max
        if (props.isbnMax != null) {
          conditions.push(where('isbn', '<=', props.isbnMax))
        }

        // 排序
        const direction = props.sortOrder === 'desc' ? 'desc' : 'asc'
        conditions.push(orderBy('isbn', direction))

        // 构造 query
        let q = query(collection(db, 'books'), ...conditions)

        // 限制结果数
        if (props.resultLimit) {
          q = query(q, limit(props.resultLimit))
        }

        const snapshot = await getDocs(q)
        books.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      } catch (error) {
        console.error('Query error:', error)
      }
    }

    onMounted(fetchBooks)
    watch(
      () => [
        props.refreshFlag,
        props.isbnMin,
        props.isbnMax,
        props.sortOrder,
        props.resultLimit
      ],
      fetchBooks
    )

    return { books }
  }
}
</script>
