
<template>
  <div>
    <NavBar />
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Mis listas</h4>
        <button class="btn btn-success" @click="openNew">Nueva lista</button>
      </div>

      <div class="row">
        <div v-for="l in lists.items" :key="l.id" class="col-md-4 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ l.name }}</h5>
              <p class="text-muted">{{ l.description }}</p>
              <div class="d-flex justify-content-between">
                <RouterLink class="btn btn-outline-primary btn-sm" :to="`/listas/${l.id}`">Abrir</RouterLink>
                <button class="btn btn-outline-danger btn-sm" @click="remove(l.id)">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog ref="dlg" class="p-0 rounded-3 border-0" style="max-width:420px;">
        <div class="card"><div class="card-body">
          <h5>Nueva lista</h5>
          <input v-model="name" class="form-control mb-2" placeholder="Nombre" />
          <input v-model="description" class="form-control mb-3" placeholder="Descripción" />
          <button class="btn btn-dark w-100" @click="create">Guardar</button>
        </div></div>
      </dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useListsStore } from '@/stores/lists';

const lists = useListsStore();
const dlg = ref<HTMLDialogElement|null>(null);
const name = ref(''); const description = ref('');

function openNew(){ dlg.value?.showModal(); }
async function create(){
  const userId = Number(localStorage.getItem('userId') || 1);
  await lists.create({ userId, name: name.value, description: description.value });
  dlg.value?.close(); name.value=''; description.value='';
  await lists.fetchByUser(userId);
}
async function remove(id:number){
  if (confirm('¿Eliminar lista?')) {
    await lists.remove(id);
    await lists.fetchByUser(Number(localStorage.getItem('userId')||1));
  }
}
onMounted(() => lists.fetchByUser(Number(localStorage.getItem('userId')||1)));
</script>
