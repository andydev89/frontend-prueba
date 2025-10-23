<template>
  <div id="app">
    <!-- Navbar Bootstrap -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom mb-3">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">Demo Productos</RouterLink>

        <div class="ms-auto d-flex align-items-center gap-2">
          <span v-if="auth.isAuthenticated" class="text-muted small">
            {{ auth.email }} ({{ auth.role || 'user' }})
          </span>
          <RouterLink v-if="!auth.isAuthenticated" class="btn btn-outline-dark btn-sm" to="/login">
            Iniciar sesión
          </RouterLink>
          <button v-else class="btn btn-outline-secondary btn-sm" @click="logout">
            Salir
          </button>
        </div>
      </div>
    </nav>

    <!-- Contenido -->
   
    <main class="container py-3">
      <RouterView />
    </main>
    
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<!-- Estilos opcionales del layout -->
<style>
html, body, #app {
  height: 100%;
}
</style>
