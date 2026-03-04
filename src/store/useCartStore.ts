import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) => 
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id);
          if (existingProduct) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((p) => p.id !== productId) })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'saaf-cart-storage' } 
  )
)