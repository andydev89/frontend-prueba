// src/stores/lists.ts
import { defineStore } from 'pinia';
import api from '@/lib/axios'
import { showToast } from '@/utils/toast';

export interface Lista {
  id: number;
  userId: number;
  name: string;
  description?: string;
  createdAt: string;
}
export interface ElementoLista {
  id: number;
  listaSeguimientoId: number;
  tituloId: number;
  addAt: string;
}

export const useListsStore = defineStore('lists', {
  state: () => ({
    items: [] as Lista[],
    loading: false,
  }),
  actions: {
    async fetchByUser(userId: number) {
      this.loading = true;
      try {
        const { data } = await api.get(`/ListaSeguimiento/usuario/${userId}`); // :contentReference[oaicite:11]{index=11}
        this.items = data;
      } finally {
        this.loading = false;
      }
    },
    async create(payload: { userId: number; name: string; description?: string }) {
      await api.post('/ListaSeguimiento', payload); // :contentReference[oaicite:12]{index=12}
      showToast('success', 'Lista creada');
    },
    async update(id: number, payload: { name?: string; description?: string }) {
      await api.put(`/ListaSeguimiento/${id}`, payload); // :contentReference[oaicite:13]{index=13}
      showToast('success', 'Lista actualizada');
    },
    async remove(id: number) {
      await api.delete(`/ListaSeguimiento/${id}`); // :contentReference[oaicite:14]{index=14}
      showToast('success', 'Lista eliminada');
    },
    async addTitle(listaId: number, tituloId: number) {
      await api.post(`/ListaSeguimiento/${listaId}/titulos/${tituloId}`); // :contentReference[oaicite:15]{index=15}
      showToast('success', 'Añadido a la lista');
    },
    async removeTitle(elementoId: number) {
      await api.delete(`/ElementoLista/${elementoId}`); // :contentReference[oaicite:16]{index=16}
      showToast('success', 'Eliminado de la lista');
    },
  },
});
