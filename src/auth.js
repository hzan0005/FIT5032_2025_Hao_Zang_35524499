// src/auth.js
import { ref } from 'vue'

export const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

export const login = () => {
  localStorage.setItem('isAuthenticated', 'true')
  isAuthenticated.value = true
}

export const logout = () => {
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
}
