<template>
  <div class="card h-100">
    <img v-if="t.imagenUrl" :src="t.imagenUrl" class="card-img-top" :alt="t.nombre" />
    <div class="card-body d-flex flex-column">
      <h6 class="mb-1">{{ t.nombre }}</h6>
      <small class="text-muted">{{ t.tipo }} • {{ t.genero || 'Sin género' }}</small>
      <div class="mt-auto">
        <RouterLink class="btn btn-outline-secondary btn-sm w-100 mt-2" :to="`/titulos/${t.id}`">Ver ficha</RouterLink>
        <button class="btn btn-dark btn-sm w-100 mt-2" @click="$emit('add', t)">Añadir a lista</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ t: any }>();
defineEmits<{ (e: 'add', t: any): void }>();
</script>
