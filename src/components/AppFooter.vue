<template>
  <footer class="border-top bg-light mt-5">
    <div class="container py-4">
      <div class="row gy-3">
        <div class="col-md-6">
          <div class="fw-semibold">netflix Tracker</div>
          <small class="text-muted">© {{ year }} Todos los derechos reservados</small>
        </div>
        <div class="col-md-6 text-md-end">
         
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
