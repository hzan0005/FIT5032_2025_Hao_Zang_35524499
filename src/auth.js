// src/auth.js
import { getAuth, signOut } from 'firebase/auth'

export function logout() {
  const auth = getAuth()
  signOut(auth).then(() => {
    console.log('User signed out.')
    console.log('Current user:', auth.currentUser)  // 应为 null ✅

    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('firebaseUser')
    localStorage.removeItem('userRole')
  })
}
