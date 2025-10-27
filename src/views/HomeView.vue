<template>
  <!-- Hero -->
  <section class="py-5 bg-light border-bottom">
    <div class="container">
      <div class="row align-items-center gy-4">
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold mb-3">Bienvenido</h1>
          <p class="lead text-muted">
            Plantilla base Vue 3 + TS + Bootstrap, limpia y escalable.
          </p>
          <div class="d-flex gap-3">
            <a href="#servicios" class="btn btn-primary">Ver servicios</a>
            <a href="#" class="btn btn-outline-secondary">Contáctanos</a>
          </div>
        </div>
        <div class="col-lg-6 text-center">
          <img src="https://picsum.photos/560/320" class="img-fluid rounded" alt="hero">
        </div>
      </div>
    </div>
  </section>

  <!-- Servicios -->
  <section id="servicios" class="py-5">
    <div class="container">
      <div class="mb-4">
        <h2 class="fw-semibold">Nuestros servicios</h2>
        <p class="text-muted mb-0">Un grid simple con tarjetas reutilizables.</p>
      </div>

      <div class="row g-4">
        <div class="col-12 col-sm-6 col-lg-4" v-for="s in services" :key="s.id">
          <ServiceCard :title="s.title" :description="s.desc" :icon="s.icon" />
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-5 bg-body-tertiary border-top border-bottom">
    <div class="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
      <div>
        <h3 class="h4 fw-semibold mb-1">¿Listo para empezar?</h3>
        <p class="text-muted mb-0">Escribe a nuestro equipo y agenda una demo.</p>
      </div>
      <a href="#contacto" class="btn btn-primary btn-lg">Contactar</a>
    </div>
  </section>

  <!-- Contacto (placeholder) -->
  <section id="contacto" class="py-5">
    <div class="container">
      <h2 class="fw-semibold mb-3">Contacto</h2>
      <div class="row g-4">
        <div class="col-md-6">
          <input class="form-control" placeholder="Tu nombre" />
        </div>
        <div class="col-md-6">
          <input class="form-control" placeholder="Tu email" />
        </div>
        <div class="col-12">
          <textarea class="form-control" rows="4" placeholder="Mensaje"></textarea>
        </div>
        <div class="col-12">
          <button class="btn btn-dark">Enviar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ServiceCard from '@/components/ServiceCard.vue'

const services = [
  { id: 1, title: 'Desarrollo API .NET', desc: 'APIs REST seguras, limpias y documentadas.', icon: 'bi bi-gear' },
  { id: 2, title: 'Frontend Vue 3', desc: 'SPAs rápidas, accesibles y responsivas.', icon: 'bi bi-layers' },
  { id: 3, title: 'Autenticación JWT', desc: 'Rutas protegidas y control de roles.', icon: 'bi bi-shield-lock' },
  { id: 4, title: 'Testing', desc: 'Unit, e2e y cobertura en CI/CD.', icon: 'bi bi-bug' },
  { id: 5, title: 'Despliegue', desc: 'Docker, Nginx y pipelines.', icon: 'bi bi-cloud-upload' },
  { id: 6, title: 'Mantenimiento', desc: 'Monitorización, logs y performance.', icon: 'bi bi-activity' },
]
</script>
