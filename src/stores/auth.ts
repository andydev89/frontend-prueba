import { defineStore } from 'pinia'
import api from '@/lib/axios'

interface AuthState {
  token: string | null
  email: string | null
  role: string | null
}


export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({ token: localStorage.getItem('token'), email: null, role: null }),
  getters: { isAuthenticated: (s) => !!s.token },
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('/api/auth/login', { email, password })
      this.token = data.token; this.email = data.email; this.role = data.role
      localStorage.setItem('token', data.token)
    },
    logout() { this.token = null; this.email = null; this.role = null; localStorage.removeItem('token') }
  }
})
