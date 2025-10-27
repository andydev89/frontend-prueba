<template>
  <div id="app" class="min-vh-100 d-flex flex-column">
  <!--  <AppNavbar /> -->

    <main class="flex-fill">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
