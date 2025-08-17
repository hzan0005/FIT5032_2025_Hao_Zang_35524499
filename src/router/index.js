import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Page Imports
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
import MapView from '../views/MapView.vue';
import BookingView from '../views/BookingView.vue'; // ★ 导入 BookingView
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView, meta: { requiresAuth: true } },
  { path: '/health', name: 'health', component: HealthView, meta: { requiresAuth: true } },
  { path: '/community', name: 'community', component: CommunityView, meta: { requiresAuth: true } },
  { path: '/skills', name: 'skills', component: SkillsView, meta: { requiresAuth: true } },
  { path: '/caregiver', name: 'caregiver', component: CaregiverView, meta: { requiresAuth: true } },
  { path: '/help', name: 'help', component: HelpView, meta: { requiresAuth: true } },
  { path: '/donate', name: 'donate', component: DonateView, meta: { requiresAuth: true } },
  { path: '/map', name: 'MapView', component: MapView, meta: { requiresAuth: true } },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/data',
    name: 'InteractiveData',
    component: () => import('../views/InteractiveDataView.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/rating', name: 'rating', component: RatingView, meta: { requiresAuth: true } },
  {
   path: '/sendemail',
   name: 'SendEmail',
   component: () => import('../views/SendEmailView.vue'),
   meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/booking', // e.g., /booking/community/1
    name: 'BookingView',
    component: BookingView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// A function to get the current user's auth state reliably
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    const user = await getCurrentUser();
    if (user) {
      // User is logged in
      const userRole = user.email === 'admin@monash.com' ? 'admin' : 'user';
      const requiredRole = to.meta.role;

      if (requiredRole && userRole !== requiredRole) {
        // Role does not match, redirect to home
        alert('Access Denied: You do not have permission to view this page.');
        next('/');
      } else {
        // Authentication and authorization successful
        next();
      }
    } else {
      // User is not logged in, redirect to login page
      next('/login');
    }
  } else {
    // Page does not require authentication
    next();
  }
});

export default router