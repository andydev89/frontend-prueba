<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container">
      <RouterLink class="navbar-brand fw-semibold" to="/">MiSitio</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navMain" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item"><RouterLink class="nav-link" to="/">Inicio</RouterLink></li>
          <li class="nav-item"><a class="nav-link" href="#servicios">Servicios</a></li>
          <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
<!-- Si usas auth: muestra login/logout aquí -->
<li class="nav-item ms-lg-3" v-if="auth.isAuthenticated">
  <button class="btn btn-outline-dark btn-sm" @click="handleLogout">Cerrar sesión</button>
</li>
<li class="nav-item ms-lg-3" v-else>
  <RouterLink to="/login" class="btn btn-outline-dark btn-sm">Acceder</RouterLink>
</li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  // Si tu store define una acción logout, la llamamos; si no, forzamos la flag
  auth.logout()
  router.push('/login')
}
</script>
