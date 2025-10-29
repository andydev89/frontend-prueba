<template>
  <div id="app" class="min-vh-100 d-flex flex-column">
  <AppNavbar /> 

    <main class="flex-fill">
      <RouterView />
    </main>
    <!-- contenedor para toasts -->
   <div class="toast-container position-fixed top-0 end-0 p-3" id="toast-container"></div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
