"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Dish } from "@/data/dishes";
import { formatPkr } from "@/components/CartContext";

type OrderFoodModalProps = {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number) => void;
};

type OrderFoodDialogProps = {
  dish: Dish;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number) => void;
};

function OrderFoodDialog({ dish, onClose, onAddToCart }: OrderFoodDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const headingId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const total = dish.price * quantity;
  const fullName = `${dish.firstWord} ${dish.secondWord}`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="relative z-10 w-full max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-[24px] border border-b-0 border-foreground/10 bg-background/95 px-5 pt-6 pb-[max(24px,env(safe-area-inset-bottom))] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_28px_56px_-20px_rgba(0,0,0,0.34)] backdrop-blur-xl md:w-[420px] md:max-h-[calc(100dvh-32px)] md:rounded-[22px] md:border-b md:p-6"
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 16 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
      }
      onClick={(e) => e.stopPropagation()}
    >
      <button
        ref={closeBtnRef}
        type="button"
        aria-label="Close order modal"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
      >
        <svg
          className="h-[18px] w-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 6 18 18M18 6 6 18" />
        </svg>
      </button>

      <div className="flex flex-col items-center text-center">
        <div
          className="relative mb-4 flex h-36 w-36 items-center justify-center rounded-full p-2"
          style={{
            background: `radial-gradient(circle, color-mix(in oklab, ${dish.accent} 28%, transparent) 0%, transparent 72%)`,
          }}
        >
          <span className="block h-32 w-32 rounded-full drop-shadow-[0_14px_20px_rgba(0,0,0,0.22)]">
            <span className="block aspect-square h-full w-full overflow-hidden rounded-full [transform:translateZ(0)]">
              <Image
                src={dish.image}
                alt={fullName}
                width={128}
                height={128}
                draggable={false}
                className="h-full w-full max-w-none origin-center scale-[1.24] select-none object-cover"
              />
            </span>
          </span>
        </div>

        <p className="text-[11px] font-semibold tracking-[0.02em] text-muted-foreground">
          {dish.rankLabel}
        </p>

        <h2
          id={headingId}
          className="mt-1 text-[26px] leading-tight tracking-[-0.02em] uppercase"
        >
          <span className="font-extralight">{dish.firstWord} </span>
          <span className="font-extrabold text-foreground/90">
            {dish.secondWord}
          </span>
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Prepared by {dish.chef}
        </p>

        <div
          className="mt-3 inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold tabular-nums"
          style={{
            background: `color-mix(in oklab, ${dish.accent} 24%, transparent)`,
          }}
        >
          {formatPkr(dish.price)} each
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3">
        <span className="text-xs font-medium text-muted-foreground">
          Quantity
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-foreground/15 text-sm font-semibold transition-colors hover:bg-foreground/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-primary"
          >
            -
          </button>
          <span
            aria-live="polite"
            className="min-w-[2ch] text-center text-base font-bold tabular-nums"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-foreground/15 text-sm font-semibold transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-primary"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between px-1">
        <span className="text-sm font-medium text-muted-foreground">
          Total price
        </span>
        <span className="text-xl font-bold tracking-[-0.02em] tabular-nums">
          {formatPkr(total)}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onAddToCart(dish, quantity)}
        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span>Add to cart</span>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">{formatPkr(total)}</span>
      </button>
    </motion.div>
  );
}

/** Animated modal displaying the selected dish, PKR pricing, quantity controls, and add-to-cart CTA. */
export function OrderFoodModal({
  dish,
  onClose,
  onAddToCart,
}: OrderFoodModalProps) {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {dish ? (
        <motion.div
          key="order-modal-backdrop"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-0 overscroll-contain backdrop-blur-xs md:items-center md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.2 }}
          onClick={onClose}
        >
          <OrderFoodDialog
            key={dish.id}
            dish={dish}
            onClose={onClose}
            onAddToCart={onAddToCart}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default OrderFoodModal;

