<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container">
      <RouterLink class="navbar-brand fw-semibold" to="/">Netflix Tracker</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navMain" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto align-items-lg-center">
           <li class="nav-item"><RouterLink to="/" class="nav-link">Mis listas</RouterLink></li>
        <li class="nav-item"><RouterLink to="/buscar" class="nav-link">Buscar</RouterLink></li>
<!-- Si usas auth: muestra login/logout aquí -->

   <a class="nav-link d-flex align-items-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              v-if="auth.isAuthenticated"
            >
              <i class="bi bi-person-circle fs-5 me-2"></i>
              <span class="fw-semibold">{{ auth.nombre || auth.email }}</span>
            </a>

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
import { Dropdown } from 'bootstrap'
import { onMounted } from 'vue'


const auth = useAuthStore()
const router = useRouter()

function handleLogout() { 
  auth.logout()
  router.push('/login')
}
onMounted(() => {  
  const elements = document.querySelectorAll('[data-bs-toggle="dropdown"]')
  elements.forEach((el) => new window.bootstrap.Dropdown(el))
})
</script>
