
<template>
  <dialog ref="dlg" class="p-0 rounded-3 border-0" style="max-width:420px;">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Añadir a una lista</h5>
        <select v-model="listaId" class="form-select">
          <option v-for="l in listas" :key="l.id" :value="l.id">{{ l.name }}</option>
        </select>
        <div class="d-flex justify-content-end gap-2 mt-3">
          <button class="btn btn-outline-secondary" @click="close">Cancelar</button>
          <button class="btn btn-dark" @click="confirm" :disabled="!listaId">Añadir</button>
        </div>
      </div>
    </div>
  </dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const dlg = ref<HTMLDialogElement|null>(null);
const listas = ref<any[]>([]);
const listaId = ref<number|undefined>();

function open(items: any[]) { listas.value = items; listaId.value = undefined; dlg.value?.showModal(); }
function close() { dlg.value?.close(); }
function confirm() { if (listaId.value) { emit('confirm', listaId.value); close(); } }

const emit = defineEmits<{(e:'confirm', listaId:number):void}>();
defineExpose({ open, close });
</script>
