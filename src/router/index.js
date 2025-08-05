import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/denied', name: 'AccessDenied', component: AccessDenied },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/firebase-signin',
    name: 'FirebaseSignin',
    component: FirebaseSigninView
  },
  {
    path: '/fireregister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/add-book',
    name: 'AddBook',
    component: AddBookView,
    meta: { requiresAuth: true }
  },
  {
    path: '/WeatherCheck',
    name: 'GetWeather',  
    component: WeatherView, 
  },
  {
    path: '/countbookapi',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
  path: '/getallbookapi',
  name: 'GetAllBookAPI',
  component: GetAllBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/denied')
  } else {
    next()
  }
})

export default router
