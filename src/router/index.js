import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'  // 根据实际路径修改

// 页面导入
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import HealthView from '../views/HealthView.vue'
import CommunityView from '../views/CommunityView.vue'
import SkillsView from '../views/SkillsView.vue'
import CaregiverView from '../views/CaregiverView.vue'
import HelpView from '../views/HelpView.vue'
import DonateView from '../views/DonateView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RatingView from '../views/RatingView.vue'
import SendEmailView from '../views/SendEmailView.vue'
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView, meta: { requiresAuth: true } },
  { path: '/health', name: 'health', component: HealthView, meta: { requiresAuth: true } },
  { path: '/community', name: 'community', component: CommunityView, meta: { requiresAuth: true } },
  { path: '/skills', name: 'skills', component: SkillsView, meta: { requiresAuth: true } },
  { path: '/caregiver', name: 'caregiver', component: CaregiverView, meta: { requiresAuth: true } },
  { path: '/help', name: 'help', component: HelpView, meta: { requiresAuth: true } },
  { path: '/donate', name: 'donate', component: DonateView, meta: { requiresAuth: true } },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/rating', name: 'rating', component: RatingView, meta: { requiresAuth: true } },
  {
   path: '/sendemail',
   name: 'SendEmail',
   component: () => import('../views/SendEmailView.vue'),
   meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/data',
    name: 'InteractiveData',
    component: () => import('../views/InteractiveDataView.vue'),
    meta: { requiresAuth: true, role: 'admin' } // 仅限管理员访问
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫：基于 Firebase 登录状态判断访问权限
let isAuthChecked = false

router.beforeEach(async (to, from, next) => {
  if (!isAuthChecked) {
    await new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const role = user.email === 'admin@monash.com' ? 'admin' : 'user'

          localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            uid: user.uid,
            role
          }))
        } else {
          localStorage.removeItem('currentUser')
        }

        unsubscribe()
        isAuthChecked = true
        resolve()
      })
    })
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  if (to.meta.requiresAuth) {
    if (!currentUser) {
      next('/login')
    } else if (to.meta.role && currentUser.role !== to.meta.role) {
      alert('Access denied: insufficient permissions')
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
