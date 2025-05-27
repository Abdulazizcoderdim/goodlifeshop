// stores/useStore.ts
import type { IProduct } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface OptimizedStoreState {
  favorites: FavoriteItem[];
  cart: CartItem[];
  toggleFavorite: (product: IProduct) => void;
  addToCart: (product: IProduct) => void;
  isFavorite: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

interface FavoriteItem {
  productId: string;
  product: IProduct;
}

interface CartItem {
  productId: string;
  product: IProduct;
  quantity: number;
}

export const useStore = create<OptimizedStoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],

      toggleFavorite: (product) => {
        set((state) => {
          const isFavorite = state.favorites.some(
            (item) => item.productId === product.id
          );

          if (isFavorite) {
            return {
              favorites: state.favorites.filter(
                (item) => item.productId !== product.id
              ),
            };
          } else {
            return {
              favorites: [
                ...state.favorites,
                { productId: product.id, product },
              ],
            };
          }
        });
      },

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.productId === product.id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [
                ...state.cart,
                { productId: product.id, product, quantity: 1 },
              ],
            };
          }
        });
      },

      isFavorite: (productId) => {
        return get().favorites.some((item) => item.productId === productId);
      },

      isInCart: (productId) => {
        return get().cart.some((item) => item.productId === productId);
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },
    }),
    {
      name: "ecommerce-store", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // or sessionStorage
      // You can also whitelist or blacklist specific state keys
      // partialize: (state) => ({ favorites: state.favorites, cart: state.cart }),
    }
  )
);
