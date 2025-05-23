import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StoreState } from "../types";

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],
      toggleFavorite: (product) => {
        const favorites = get().favorites;
        const isFav = favorites.some((p) => p.id === product.id);
        const updatedFavorites = isFav
          ? favorites.filter((p) => p.id !== product.id)
          : [...favorites, product];
        set({ favorites: updatedFavorites });
      },
      addToCart: (product) => {
        const cart = get().cart;
        if (cart.some((p) => p.id === product.id)) {
          set({
            cart: cart.map((p) =>
              p.id === product.id
                ? { ...p, quantity: (p.quantity ?? 1) + 1 }
                : p
            ),
          });
        } else {
          set({ cart: [...cart, product] });
        }
      },
      isFavorite: (productId) => {
        return get().favorites.some((p) => p.id === productId);
      },
      isInCart: (productId) => {
        return get().cart.some((p) => p.id === productId);
      },
      removeFromCart: (productId: number) => {
        set({
          cart: get().cart.filter((p) => p.id !== productId),
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      updateQuantity: (productId: number, quantity: number) => {
        set({
          cart: get().cart.map((p) =>
            p.id === productId ? { ...p, quantity } : p
          ),
        });
      },
    }),
    {
      name: "store-storage", // localStorage key
    }
  )
);
