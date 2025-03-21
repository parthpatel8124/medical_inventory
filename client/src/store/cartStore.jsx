import { create } from "zustand";

const useCart = create((set) => ({
  cart: [], // Ensures cart is always an array
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item._id === product._id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== id),
    })),
}));

export default useCart;