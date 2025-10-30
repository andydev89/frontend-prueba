<!-- src/views/TitleSearchView.vue -->
<template>
  <div>
    <NavBar/>
    <div class="container py-4">
      <h4 class="mb-3">Buscar títulos</h4>
      <div class="row g-2 mb-3">
        <div class="col-md-5">
          <input v-model="q" class="form-control" placeholder="Nombre (ej. Matrix)"/>
        </div>
        <div class="col-md-3">
          <select v-model="tipo" class="form-select">
            <option value="">Todos</option>
            <option value="pelicula">Películas</option>
            <option value="serie">Series</option>
          </select>
        </div>
        <div class="col-md-3">
          <input v-model.number="anio" type="number" min="1900" max="2100" class="form-control" placeholder="Año"/>
        </div>
        <div class="col-md-1 d-grid">
          <button class="btn btn-dark" @click="buscar">Filtrar</button>
        </div>
      </div>

      <div class="row">
        <div v-for="t in filtrados" :key="t.id" class="col-md-3 mb-3">
          <TitleCard :t="t" @add="openAddToList(t)"/>
        </div>
      </div>
    </div>

    <AddToListModal ref="addModal" @confirm="confirmAdd"/>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTitlesStore } from '@/stores/titles';
import { useListsStore } from '@/stores/lists';
import TitleCard from '@/components/TitleCard.vue';
import AddToListModal from '@/views/List/AddToListModal.vue';

const titles = useTitlesStore();
const lists = useListsStore();
const q = ref(''); const tipo = ref(''); const anio = ref<number|undefined>();
const addModal = ref<any>(null);
const toAdd = ref<any>(null);

interface Title {
  id: number;
  nombre: string;
  tipo: string;
  año: number;
}

const filtrados = computed(() => {
  return titles.items.filter((t: Title) => {
    const okNombre = !q.value || t.nombre.toLowerCase().includes(q.value.toLowerCase());
    const okTipo   = !tipo.value || t.tipo === tipo.value;
    const okAnio   = !anio.value || t.año === anio.value;
    return okNombre && okTipo && okAnio;
  });
});

function buscar() {/* filtros en cliente; si usas /Titulo/buscar, muévelo al store */}

function openAddToList(t:any){
  toAdd.value = t;
  addModal.value.open(lists.items);
}

async function confirmAdd(listaId:number){
  await lists.addTitle(listaId, toAdd.value.id); // POST /ListaSeguimiento/{listaId}/titulos/{tituloId} :contentReference[oaicite:23]{index=23}
}

onMounted(async () => {
  await titles.fetchAll();           // GET /Titulo :contentReference[oaicite:24]{index=24}
  await lists.fetchByUser(Number(localStorage.getItem('userId')||1)); // GET /ListaSeguimiento/usuario/{id} :contentReference[oaicite:25]{index=25}
});
</script>
