<template>
  <div class="card title-card h-100 border-0 shadow-sm overflow-hidden">
    <div class="position-relative">
      <img
        v-if="t.imagenUrl"
        :src="t.imagenUrl"
        class="card-img-top img-fluid"
        :alt="t.nombre"
      />
      <!-- Overlay tipo -->
      <span
        class="badge position-absolute top-0 start-0 m-2 px-3 py-2 bg-dark bg-opacity-75 text-uppercase small fw-semibold"
      >
        {{ t.tipo }}
      </span>
    </div>

    <div class="card-body d-flex flex-column p-3">
      <h6 class="fw-semibold text-truncate mb-1">{{ t.nombre }}</h6>
      <small class="text-muted">
        {{ t.genero || 'Sin género' }}
        <span v-if="t.año"> • {{ t.año }}</span>
      </small>

      <div class="mt-auto">
        <RouterLink
          class="btn btn-outline-secondary btn-sm w-100 mt-3 d-flex align-items-center justify-content-center gap-1"
          :to="`/titulos/${t.id}`"
        >
          <i class="bi bi-eye"></i> Ver ficha
        </RouterLink>
        <button
          class="btn btn-danger btn-sm w-100 mt-2 d-flex align-items-center justify-content-center gap-1"
          @click="$emit('add', t)"
        >
          <i class="bi bi-plus-circle"></i> Añadir a lista
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ t: any }>()
defineEmits<{ (e: 'add', t: any): void }>()
</script>

<style scoped>
.title-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border-radius: 0.75rem;
}

.title-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.title-card img {
  transition: transform 0.4s ease;
  object-fit: cover;
  height: 280px;
  width: 100%;
}

.title-card:hover img {
  transform: scale(1.05);
}

.title-card h6 {
  color: #212529;
}

.btn-outline-secondary {
  border-color: #ced4da;
}

.btn-outline-secondary:hover {
  background-color: #f1f3f5;
}

.btn-danger {
  background-color: #e50914;
  border: none;
}

.btn-danger:hover {
  background-color: #b00610;
}
</style>
