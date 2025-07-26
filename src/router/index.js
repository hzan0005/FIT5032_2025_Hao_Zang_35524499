import { createRouter, createWebHistory } from 'vue-router'

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
    meta: { requiresAuth: true, role: 'admin' }  // 👈 只允许 admin 访问
  },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/rating', name: 'rating', component: RatingView, meta: { requiresAuth: true } }
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  if (to.meta.requiresAuth) {
    if (!currentUser) {
      next('/login')
    } else if (to.meta.role && to.meta.role !== currentUser.role) {
      // 没有权限访问该角色页面
      alert('Access denied: insufficient permissions')
      next('/')  // 跳转主页或其他通用页
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
