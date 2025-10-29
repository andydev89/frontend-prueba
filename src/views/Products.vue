<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="input-group" style="max-width:420px;">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input v-model="store.q" @input="store.fetch" class="form-control" placeholder="Buscar productos...">
      </div>
      <button class="btn btn-success" @click="openNew"><i class="bi bi-plus"></i> Nuevo</button>
    </div>

    <div class="table-responsive">
      <table class="table table-striped align-middle">
        <thead class="table-light">
          <tr><th>Nombre</th><th class="text-end">Precio</th><th class="text-end">Stock</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="p in store.items" :key="p.id">
            <td>{{ p.name }}</td>
            <td class="text-end">{{ p.price.toFixed(2) }}</td>
            <td class="text-end">{{ p.stock }}</td>
            <td class="text-end">
              <button class="btn btn-outline-secondary btn-sm me-2" @click="edit(p)">Editar</button>
              <button class="btn btn-outline-danger btn-sm" @click="del(p.id)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-between align-items-center">
      <div>Total: <strong>{{ store.total }}</strong></div>
      <div class="btn-group">
        <button class="btn btn-outline-primary" :disabled="store.page===1" @click="store.page--; store.fetch()">Prev</button>
        <button class="btn btn-outline-primary" @click="store.page++; store.fetch()">Next</button>
      </div>
    </div>

    <dialog ref="dlg" class="p-0 rounded-3 border-0" style="max-width:480px;">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ form.id ? 'Editar' : 'Crear' }} producto</h5>
          <div class="vstack gap-3">
            <input v-model="form.name" class="form-control" placeholder="Nombre" />
            <input v-model.number="form.price" type="number" min="0" step="0.01" class="form-control" placeholder="Precio" />
            <input v-model.number="form.stock" type="number" min="0" step="1" class="form-control" placeholder="Stock" />
          </div>
          <div class="d-flex justify-content-end gap-2 mt-3">
            <button class="btn btn-outline-secondary" @click="closeDlg">Cancelar</button>
            <button class="btn btn-dark" @click="save" :disabled="isSaving" :aria-busy="isSaving">
             <span v-if="isSaving" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
             {{ isSaving ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { showToast } from '@/utils/toast'
import { onMounted, reactive, ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import type { ProductDto } from '@/types/product'
const isSaving = ref(false)
const store = useProductsStore()
const dlg = ref<HTMLDialogElement | null>(null)
const form = reactive<Partial<ProductDto> & { price: number; stock: number }>({ id: 0, name: '', price: 0, stock: 0, createdAt: '' })

const openNew = () => { Object.assign(form, { id: 0, name: '', price: 0, stock: 0 }); dlg.value?.showModal() }
const edit = (p: ProductDto) => { Object.assign(form, p); dlg.value?.showModal() }
const closeDlg = () => dlg.value?.close()



const save = async () => {
    isSaving.value = true
    const payload = { name: form.name ?? '', price: +form.price, stock: +form.stock }
    try {
      if (form.id) {
        await store.update(form.id as number, payload)
        showToast('success', 'Producto editado correctamente')
      } else {
        await store.create(payload)
        showToast('success', 'Producto creado correctamente')
      }
      closeDlg()
    } catch (err: any) {
      showToast('error', err?.message ?? 'Error al guardar producto')
      throw err
    } finally {
      isSaving.value = false
    }
  }
const del = async (id: number) => {
 if (!confirm('¿Borrar?')) return
 try {
    await store.remove(id)
    showToast('success', 'Producto eliminado correctamente')
    await store.fetch()
} catch (err: any) {
   showToast('error', err?.message ?? 'Error al borrar producto')
    throw err
}
}
onMounted(store.fetch)
</script>
