<template>
  <!-- Mismo layout del ejemplo: centro vertical, fondo terciario -->
  <div class="d-flex align-items-center py-4 bg-body-tertiary min-vh-100">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="onSubmit" novalidate>
        <!-- Logo (opcional) 
        <img class="mb-4" src="../assets/vue.svg" alt="logo" width="72" height="57" />-->

        <h1 class="h3 mb-3 fw-normal">Iniciar sesión</h1>

        <div class="form-floating mb-2">
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            autocomplete="username"
            required
          />
          <label for="floatingInput">Correo electrónico</label>
        </div>

        <div class="form-floating">
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            autocomplete="current-password"
            required
          />
          <label for="floatingPassword">Contraseña</label>
        </div>

        <div class="form-check text-start my-3">
          <input class="form-check-input" type="checkbox" id="remember" v-model="remember" />
          <label class="form-check-label" for="remember">Recordarme</label>
        </div>

        <button class="btn btn-primary w-100 py-2" type="submit" :disabled="submitting">
          <span v-if="!submitting">Entrar</span>
          <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>

        <p class="mt-5 mb-3 text-body-secondary">&copy; {{ year }}</p>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('admin@demo.com')
const password = ref('Admin123!')
const remember = ref(true)
const submitting = ref(false)
const year = new Date().getFullYear()

const auth = useAuthStore()
const router = useRouter()

const onSubmit = async () => {
  submitting.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/')
  } finally {
    submitting.value = false
  }
}
</script>

<!-- Importa el CSS del ejemplo (no scoped) -->
<style src="../assets/sign-in.css"></style>
