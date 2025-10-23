import { defineStore } from 'pinia'
import api from '@/lib/axios'
import type { ProductDto, PageResponse } from '@/types/product'

interface State {
  items: ProductDto[]
  total: number
  page: number
  pageSize: number
  q: string
}

export const useProductsStore = defineStore('products', {
  state: (): State => ({ items: [], total: 0, page: 1, pageSize: 10, q: '' }),
  actions: {
    async fetch() {
      const { data } = await api.get<PageResponse<ProductDto>>('/api/products', {
        params: { page: this.page, pageSize: this.pageSize, q: this.q }
      })
      this.items = data.items
      this.total = data.total
    },
    async create(payload: { name: string; price: number; stock: number }) {
      await api.post('/api/products', payload); await this.fetch()
    },
    async update(id: number, payload: { name: string; price: number; stock: number }) {
      await api.put(`/api/products/${id}`, payload); await this.fetch()
    },
    async remove(id: number) {
      await api.delete(`/api/products/${id}`); await this.fetch()
    },
  }
})
