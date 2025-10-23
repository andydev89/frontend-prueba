export interface ProductDto {
  id: number
  name: string
  price: number
  stock: number
  createdAt: string
}
export interface PageResponse<T> {
  total: number
  items: T[]
}
