// src/store/useCartStore.ts
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
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      
      addToCart: (product) => 
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id);
          
          const qtyToAdd = product.quantity || 1; 

          if (existingProduct) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: (p.quantity || 1) + qtyToAdd } : p
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: qtyToAdd }] };
        }),
        
      removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((p) => p.id !== productId) })),
        
      // FIX: Added the missing updateQuantity function here
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p // Math.max prevents going below 1
          ),
        })),
        
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'saaf-cart-storage' } 
  )
)