import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItems = {
  _id: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
};

type CartState = {
  items: CartItems[];
  addItem: (item: CartItems) => void;
  removeItem: (_id: string) => void;
  updateItem: (item: CartItems) => void;
  increaseQuantity: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i._id === item._id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
          };
        });
      },

      removeItem: (_id) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== _id),
        })),

      increaseQuantity: (_id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i._id === _id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),

      decreaseQuantity: (_id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i._id === _id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i,
          ),
        })),

      updateItem: (item) =>
        set((state) => ({
          items: state.items.map((i) =>
            i._id === item._id ? { ...i, ...item } : i,
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
    },
  ),
);
