
<template>
  <div>
    <NavBar/>
    <div class="container py-4" v-if="t">
      <div class="row">
        <div class="col-md-4">
          <img v-if="t.imagenUrl" :src="t.imagenUrl" class="img-fluid rounded"/>
        </div>
        <div class="col-md-8">
          <h3>{{ t.nombre }}</h3>
          <p class="text-muted">{{ t.tipo }} • {{ t.genero || 'Sin género' }} • {{ t.año || '—' }}</p>
          <p>{{ t.descripcion || 'Sin descripción' }}</p>
          <button class="btn btn-dark" @click="openAdd">Añadir a lista</button>
        </div>
      </div>
    </div>
    <AddToListModal ref="addModal" @confirm="confirmAdd"/>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTitlesStore } from '@/stores/titles';
import { useListsStore } from '@/stores/lists';
import AddToListModal from '@/views/List/AddToListModal.vue';

const route = useRoute();
const titles = useTitlesStore();
const lists = useListsStore();
const addModal = ref<any>(null);
const t = ref<any>(null);

async function load() {
  t.value = await titles.getById(Number(route.params.id)); // GET /Titulo/{id} :contentReference[oaicite:26]{index=26}
}
function openAdd(){ addModal.value.open(lists.items); }
async function confirmAdd(listaId:number){ await lists.addTitle(listaId, t.value.id); }

onMounted(async () => {
  await lists.fetchByUser(Number(localStorage.getItem('userId')||1));
  await load();
});
</script>
