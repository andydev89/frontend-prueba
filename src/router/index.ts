import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import DashboardView from '../views/DashboardView.vue'
import ListDetailView from '../views/List/ListDetailView.vue'
import TitleSearchView from '../views/Title/TitleSearchView.vue'
import TitleDetailView from '../views/Title/TitleDetailView.vue'

const routes: RouteRecordRaw[] = [
  //{ path: '/', component: HomeView },   
  { path: '/login', component: Login },
  { path: '/', component: DashboardView , meta: { requiresAuth: true }},
  { path: '/listas/:id', component:ListDetailView  , meta: { requiresAuth: true }},
  { path: '/buscar', component:TitleSearchView  , meta: { requiresAuth: true }},
  { path: '/titulos/:id', component:TitleDetailView   , meta: { requiresAuth: true }},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return '/login'
})

export default router
