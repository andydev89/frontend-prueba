<template>
  <div>
    <NavBar />
    <div class="container py-4">
      <h4 class="mb-3">Buscar títulos</h4>

      <!-- Filtros principales -->
      <div class="row g-2 mb-4 align-items-end">
        <div class="col-md-5">
          <label class="form-label small text-muted">Nombre</label>
          <input
            v-model="q"
            class="form-control"
            placeholder="Ej: Matrix, Inception..."
          />
        </div>
        <div class="col-md-3">
          <label class="form-label small text-muted">Tipo</label>
          <select v-model="tipo" class="form-select">
            <option value="">Todos</option>
            <option value="pelicula">Películas</option>
            <option value="serie">Series</option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label small text-muted">Año</label>
          <input
            v-model.number="anio"
            type="number"
            min="1900"
            max="2100"
            class="form-control"
            placeholder="2020"
          />
        </div>
        <div class="col-md-2 d-grid">
          <button
            class="btn btn-dark"
            @click="() => buscar(1)"
            :disabled="titles.loading"
          >
            <span
              v-if="titles.loading"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            Buscar
          </button>
        </div>
      </div>

      <!-- Resultados -->
      <div class="row g-3">
        <div v-for="t in titles.items" :key="t.id" class="col-md-3 col-sm-6">
          <TitleCard :t="t" @add="openAddToList(t)" />
        </div>
      </div>

      <!-- Controles de paginación y orden -->
      <div
        class="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-3 border-top pt-3"
      >
        <!-- Select de cantidad por página -->
        <div class="d-flex align-items-center gap-2">
          <label class="small text-muted mb-0">Mostrar:</label>
          <select
            v-model.number="titles.pageSize"
            class="form-select form-select-sm w-auto"
            @change="buscar(1)"
          > <option :value="2">2</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
          <span class="small text-muted">por página</span>
        </div>

        <!-- Ordenar por -->
        <div class="d-flex align-items-center gap-2">
          <label class="small text-muted mb-0">Ordenar por:</label>
          <select
            v-model="titles.sortBy"
            class="form-select form-select-sm w-auto"
            @change="buscar(1)"
          >
            <option value="nombre">Nombre</option>
            <option value="año">Año</option>
            <option value="tipo">Tipo</option>
            <option value="genero">Género</option>
          </select>

          <select
            v-model="titles.sortDir"
            class="form-select form-select-sm w-auto"
            @change="buscar(1)"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <!-- Navegación de páginas -->
        <div class="btn-group">
          <button
            class="btn btn-outline-secondary btn-sm"
            :disabled="titles.page <= 1 || titles.loading"
            @click="changePage(titles.page - 1)"
          >
            <i class="bi bi-chevron-left"></i>
          </button>

          <button class="btn btn-outline-secondary btn-sm disabled" disabled>
            Página {{ titles.page }} / {{ totalPages }}
          </button>

          <button
            class="btn btn-outline-secondary btn-sm"
            :disabled="titles.page >= totalPages || titles.loading"
            @click="changePage(titles.page + 1)"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para añadir título -->
    <AddToListModal ref="addModal" @confirm="confirmAdd" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TitleCard from '@/components/TitleCard.vue'
import AddToListModal from '@/views/List/AddToListModal.vue'
import { useTitlesStore } from '@/stores/titles'
import { useListsStore } from '@/stores/lists'

const titles = useTitlesStore()
const lists = useListsStore()

// Filtros
const q = ref('')
const tipo = ref('')
const anio = ref<number | undefined>()

// Modal
const addModal = ref<any>(null)
const toAdd = ref<any>(null)

function openAddToList(t: any) {
  toAdd.value = t
  addModal.value.open(lists.items)
}

async function confirmAdd(listaId: number) {
  await lists.addTitle(listaId, toAdd.value.id)
}

// Paginación
const totalPages = computed(() =>
  Math.max(1, Math.ceil(titles.total / titles.pageSize))
)

async function buscar(page = 1) {
  await titles.search({
    nombre: q.value || undefined,
    tipo: tipo.value || undefined,
    año: anio.value || undefined,
    page,
    pageSize: titles.pageSize,
    sortBy: titles.sortBy,
    sortDir: titles.sortDir,
  })
}

function changePage(page: number) {
  buscar(page)
}

onMounted(() => buscar(1))
</script>

<style scoped>
select.form-select-sm {
  min-width: 100px;
}

.btn-group button {
  min-width: 36px;
}

.border-top {
  border-color: #e9ecef !important;
}
</style>
