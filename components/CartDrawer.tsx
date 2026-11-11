"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatPkr, useCart } from "@/components/CartContext";

type CartDrawerProps = {
  id?: string;
  open: boolean;
  onClose: () => void;
};

type CartDrawerPanelProps = {
  id?: string;
  onClose: () => void;
};

function CartDrawerPanel({ id, onClose }: CartDrawerPanelProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const headingId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <motion.aside
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto overscroll-contain border-l-0 border-foreground/10 bg-background/95 px-5 py-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[-18px_0_44px_-18px_rgba(0,0,0,0.3)] backdrop-blur-xl md:w-[370px] md:border-l md:px-6 md:py-6"
      initial={prefersReduced ? { x: 0 } : { x: "100%" }}
      animate={{ x: 0 }}
      exit={prefersReduced ? { opacity: 0 } : { x: "100%" }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 360, damping: 36 }
      }
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
        <div className="flex items-center gap-2.5">
          <h2
            id={headingId}
            className="text-lg font-bold tracking-[-0.02em]"
          >
            Your Cart
          </h2>
          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-semibold tabular-nums">
            {totalItems}
          </span>
        </div>
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close cart"
          onClick={onClose}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-primary"
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
      </div>

      {orderPlaced && items.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="my-auto flex flex-col items-center px-3 py-10 text-center"
        >
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-foreground text-background">
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12.5 9.5 17 19 7.5" />
            </svg>
          </div>
          <p className="text-lg font-bold tracking-[-0.01em]">
            Thank you, order placed!
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Your Desi Bites order has been received by our demo kitchen.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 cursor-pointer rounded-xl bg-foreground px-5 py-2.5 text-xs font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Continue browsing
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="my-auto flex flex-col items-center px-3 py-10 text-center">
          <p className="text-sm font-semibold">Your cart is empty</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Choose a dish from the menu and click &ldquo;Order food&rdquo; to add items.
          </p>
        </div>
      ) : (
        <>
          <ul
            aria-label="Cart items"
            className="mt-4 flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain pr-0.5"
          >
            {items.map(({ dish, quantity }) => {
              const name = `${dish.firstWord} ${dish.secondWord}`;
              const subtotal = dish.price * quantity;
              return (
                <li
                  key={dish.id}
                  className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-3"
                >
                  <span className="mt-0.5 block h-12 w-12 shrink-0 rounded-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.16)]">
                    <span className="block aspect-square h-full w-full overflow-hidden rounded-full [transform:translateZ(0)]">
                      <Image
                        src={dish.image}
                        alt=""
                        width={48}
                        height={48}
                        draggable={false}
                        className="h-full w-full max-w-none origin-center scale-[1.24] select-none object-cover"
                      />
                    </span>
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-xs font-bold uppercase tracking-[-0.01em]">
                        {name}
                      </p>
                      <button
                        type="button"
                        aria-label={`Remove ${name} from cart`}
                        onClick={() => removeItem(dish.id)}
                        className="shrink-0 cursor-pointer text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mt-0.5 text-[11px] text-muted-foreground tabular-nums">
                      {formatPkr(dish.price)} each
                    </p>

                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-2 py-0.5">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${name}`}
                          onClick={() => updateQuantity(dish.id, quantity - 1)}
                          className="grid h-5 w-5 cursor-pointer place-items-center rounded-full text-xs font-semibold hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-primary"
                        >
                          -
                        </button>
                        <span className="min-w-[1.5ch] text-center text-xs font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${name}`}
                          onClick={() => updateQuantity(dish.id, quantity + 1)}
                          className="grid h-5 w-5 cursor-pointer place-items-center rounded-full text-xs font-semibold hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-primary"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold tabular-nums">
                        {formatPkr(subtotal)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 border-t border-foreground/10 pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Total
              </span>
              <span className="text-lg font-bold tracking-[-0.02em] tabular-nums">
                {formatPkr(totalPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-4 w-full cursor-pointer rounded-2xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </motion.aside>
  );
}

/** Animated slide-in cart drawer showing added dishes, quantities, total PKR, and demo checkout. */
export function CartDrawer({ id, open, onClose }: CartDrawerProps) {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="cart-drawer-backdrop"
          className="fixed inset-0 z-50 bg-black/30 overscroll-contain backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.22 }}
          onClick={onClose}
        >
          <CartDrawerPanel id={id} onClose={onClose} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default CartDrawer;

