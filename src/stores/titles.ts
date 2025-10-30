// src/stores/titles.ts
import { defineStore } from 'pinia';
import api from '@/lib/axios'

export interface Titulo {
  id: number;
  nombre: string;
  tipo: 'pelicula' | 'serie';
  año: number;
  genero?: string;
  descripcion?: string;
  imagenUrl?: string;
  createdAt?: string;
}

export const useTitlesStore = defineStore('titles', {
  state: () => ({
    items: [] as any[],
    total: 0,
    page: 1,
    pageSize: 20,
    sortBy: 'nombre',
    sortDir: 'asc' as 'asc' | 'desc',
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const { data } = await api.get('/Titulo'); // :contentReference[oaicite:17]{index=17}
        this.items = data;
      } finally {
        this.loading = false;
      }
    },
    async getById(id: number) {
      const { data } = await api.get(`/Titulo/${id}`); // :contentReference[oaicite:18]{index=18}
      return data as Titulo;
    },
     async search(params: {
      nombre?: string
      tipo?: string
      genero?: string
      año?: number
      page?: number
      pageSize?: number
      sortBy?: string
      sortDir?: 'asc' | 'desc'
    }) {
      this.loading = true
      try {
        const { data } = await api.get('/Titulo/buscar', { params })
        this.items = data.items
        this.total = data.total
        this.page = data.page
        this.pageSize = data.pageSize
        this.sortBy = data.sortBy
        this.sortDir = data.sortDir
      } finally {
        this.loading = false
      }
    },
  
  },
});
