<!-- src/views/ListDetailView.vue -->
<template>
  <div>
    <NavBar/>
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>{{ listName || 'Lista' }}</h4>
        <RouterLink class="btn btn-outline-secondary" to="/buscar">Añadir títulos</RouterLink>
      </div>

      <div v-if="loading">Cargando...</div>
      <div v-else class="row">
        <div v-for="e in elementos" :key="e.id" class="col-md-3 mb-3">
          <div class="card h-100">
            <img v-if="e.titulo?.imagenUrl" :src="e.titulo.imagenUrl" class="card-img-top"/>
            <div class="card-body d-flex flex-column">
              <h6 class="mb-1">{{ e.titulo?.nombre }}</h6>
              <small class="text-muted">{{ e.titulo?.tipo }} • {{ e.titulo?.genero }}</small>
              <button class="btn btn-outline-danger btn-sm mt-auto" @click="remove(e.id)">Quitar</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/lib/axios';
import { useListsStore } from '@/stores/lists';

// Nota: este ejemplo asume que tienes un endpoint para traer Elementos por lista.
// Si aún no lo expusiste, puedes resolverlo client-side o crear GET /api/ElementoLista?listaId=...
// Para mantenernos al Swagger, traemos todos y filtramos en cliente:
const route = useRoute();
const listaId = Number(route.params.id);
const elementos = ref<any[]>([]);
const listName = ref<string>(''); const loading = ref<boolean>(true);

async function load() {
  loading.value = true;
  try {
    // 1) nombre de la lista
    const { data: lista } = await api.get(`/ListaSeguimiento/${listaId}`); // :contentReference[oaicite:19]{index=19}
    listName.value = lista.name;

    // 2) elementos (traemos todos y filtramos)
    const { data: all } = await api.get('/ElementoLista'); // :contentReference[oaicite:20]{index=20}
    const mine = all.filter((x: any) => x.listaSeguimientoId === listaId);

    // 3) hydrate con títulos
    const ids = [...new Set<number>(mine.map((m: any) => m.tituloId))];
    const titles = await Promise.all(ids.map(id => api.get(`/Titulo/${id}`).then(r => r.data))); // :contentReference[oaicite:21]{index=21}
    elementos.value = mine.map((m:any)=> ({...m, titulo: titles.find((t:any)=>t.id===m.tituloId)}));
  } finally {
    loading.value = false;
  }
}
async function remove(elementoId:number){
  const lists = useListsStore();
  await lists.removeTitle(elementoId); // DELETE /ElementoLista/{id} :contentReference[oaicite:22]{index=22}
  await load();
}
onMounted(load);
</script>
