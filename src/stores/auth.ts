import { defineStore } from 'pinia'
import api from '@/lib/axios'

interface AuthState {
  token: string | null
  email: string | null
  role: string | null
  id: number | null
  nombre: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role'),
    id: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
    nombre: localStorage.getItem('nombre'),
  }),

  getters: {
    isAuthenticated: (s) => !!s.token,
  },

  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('/auth/login', { email, password });

      this.token = data.token;
      this.email = data.email;
      this.role = data.role;
      this.id = data.id;
      this.nombre = data.nombre;

      // 🔹 Guardamos todo en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', String(data.id));
      localStorage.setItem('nombre', data.nombre);
    },

    logout() {
      this.token = null;
      this.email = null;
      this.role = null;
      this.id = null;
      this.nombre = null;

      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      localStorage.removeItem('nombre');
    },
  },
});
