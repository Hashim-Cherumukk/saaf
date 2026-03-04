// src/store/useWishlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/data';

interface WishlistState {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const isExistent = currentWishlist.find((item) => item.id === product.id);

        if (isExistent) {
          set({ wishlist: currentWishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...currentWishlist, product] });
        }
      },
      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId);
      },
    }),
    { name: 'wishlist-storage' }
  )
);