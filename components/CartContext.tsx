"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Dish } from "@/data/dishes";

export type CartItem = {
  dish: Dish;
  quantity: number;
};

export type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (dish: Dish, quantity?: number) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  removeItem: (dishId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Formats an integer PKR amount deterministically for SSR and client rendering. */
export function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString("en-US")}`;
}

/** Provides cart items, derived totals, and cart actions to client descendants. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((dish: Dish, quantity = 1) => {
    const qty = Math.max(1, Math.floor(quantity));
    setItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (!existing) return [...prev, { dish, quantity: qty }];
      return prev.map((item) =>
        item.dish.id === dish.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    });
  }, []);

  const updateQuantity = useCallback((dishId: string, quantity: number) => {
    const nextQty = Math.floor(quantity);
    if (nextQty <= 0) {
      setItems((prev) => prev.filter((item) => item.dish.id !== dishId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity: nextQty } : item
      )
    );
  }, []);

  const removeItem = useCallback((dishId: string) => {
    setItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      totalPrice,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, totalItems, totalPrice, addItem, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Reads the cart state and mutation actions from `CartProvider`. */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

