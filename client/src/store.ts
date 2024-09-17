import { create } from "zustand";
import type { Salad } from "./pages/dashboard/Products";

type CartStore = {
  salads: Salad[];
  addSalad: (salad: Salad) => void;
  removeSalad: (salad: Salad) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  salads: [],
  addSalad: (salad) => {
    set((state) => ({
      salads: [...state.salads, salad],
    }));
  },
  removeSalad: (salad) => {
    set((state) => ({
      salads: state.salads.filter((el) => el.id !== salad.id),
    }));
  },
}));
