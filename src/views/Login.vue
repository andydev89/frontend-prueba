<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-6 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-3">Iniciar sesión</h5>
            <form @submit.prevent="onSubmit" class="vstack gap-3">
              <input v-model="email" class="form-control" placeholder="Email" />
              <input v-model="password" type="password" class="form-control" placeholder="Password" />
              <button class="btn btn-dark w-100">Entrar</button>
            </form>
            <small class="text-muted d-block mt-2">admin@demo.com / Admin123!</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('admin@demo.com')
const password = ref('Admin123!')
const auth = useAuthStore()
const router = useRouter()

const onSubmit = async () => {
  await auth.login(email.value, password.value)
  router.push('/')
}
</script>
