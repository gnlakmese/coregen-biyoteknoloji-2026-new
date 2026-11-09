"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

export interface ProductQuoteItem {
  id: string;
  slug?: string;
  title: string;
  category?: string;
  quantity: number;
  image?: string;
  catalogCode?: string;
}

const STORAGE_KEY = "coregen-product-quote-cart-v1";
const EVENT_NAME = "coregen-product-quote-cart-change";
const DRAFT_KEY = "coregen-whatsapp-quote-draft";
let memory = "[]";
let storageWarning = false;

export function normalizeQuantity(value: number): number {
  return Number.isFinite(value) ? Math.min(999999, Math.max(1, Math.floor(value))) : 1;
}

export function parseCart(raw: string): ProductQuoteItem[] {
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((item): item is ProductQuoteItem =>
      !!item && typeof item === "object" && typeof item.id === "string" &&
      typeof item.title === "string" && typeof item.quantity === "number" &&
      Number.isFinite(item.quantity) && item.quantity >= 1
    ).map(item => ({
      id: item.id, title: item.title, quantity: normalizeQuantity(item.quantity),
      slug: typeof item.slug === "string" ? item.slug : undefined,
      category: typeof item.category === "string" ? item.category : undefined,
      image: typeof item.image === "string" ? item.image : undefined,
      catalogCode: typeof item.catalogCode === "string" ? item.catalogCode : undefined,
    }));
  } catch { return []; }
}

function getSnapshot(): string {
  if (storageWarning) return memory;
  try { return window.localStorage.getItem(STORAGE_KEY) ?? memory; }
  catch { return memory; }
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      memory = "[]";
      storageWarning = false;
      callback();
    }
  };
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", onStorage);
  };
}

function writeCart(items: ProductQuoteItem[]) {
  memory = JSON.stringify(items);
  try { window.localStorage.setItem(STORAGE_KEY, memory); storageWarning = false; }
  catch { storageWarning = true; }
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useProductQuoteCart() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const items = parseCart(snapshot);
  return {
    items,
    storageWarning,
    addItem(item: ProductQuoteItem) {
      const current = parseCart(getSnapshot());
      const found = current.find(existing => existing.id === item.id);
      writeCart(found
        ? current.map(existing => existing.id === item.id
          ? { ...existing, ...item, quantity: normalizeQuantity(existing.quantity + normalizeQuantity(item.quantity)) }
          : existing)
        : [...current, { ...item, quantity: normalizeQuantity(item.quantity) }]);
    },
    updateQuantity(id: string, quantity: number) {
      writeCart(parseCart(getSnapshot()).map(item => item.id === id
        ? { ...item, quantity: normalizeQuantity(quantity) } : item));
    },
    removeItem(id: string) { writeCart(parseCart(getSnapshot()).filter(item => item.id !== id)); },
    clearCart() { writeCart([]); },
  };
}
