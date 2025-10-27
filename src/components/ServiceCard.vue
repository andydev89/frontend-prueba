<template>
  <div class="card h-100 shadow-sm">
    <div v-if="icon" class="p-3 pb-0 fs-2 text-primary">
      <i :class="icon" aria-hidden="true"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text text-muted mb-3">{{ description }}</p>
      <slot name="actions">
        <button class="btn btn-outline-primary btn-sm" @click="$emit('click')">
          Ver más
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon?: string
}>()
defineEmits<{ (e: 'click'): void }>()
</script>
