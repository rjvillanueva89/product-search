import { create } from "zustand"

type Product = {
  id?: string
  name?: string
  cost?: number
  quantity?: number
  total?: number
}

type Store = {
  products: Product[]
  add: (product: Product) => void
  delete: (id: string) => void
  empty: VoidFunction
}

export const useCart = create<Store>((set) => ({
  products: [],
  add: (product) =>
    set((state) => ({
      products: [...state.products, { ...product }],
    })),
  delete: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
  empty: () => set((state) => ({ products: [] })),
}))
