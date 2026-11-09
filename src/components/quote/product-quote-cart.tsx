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

export function formatProductItems(items: ProductQuoteItem[]): string {
  return items.length ? items.map((item, index) =>
    `${index + 1}. ${item.title}${item.catalogCode ? ` | Katalog: ${item.catalogCode}` : ""} | Adet: ${item.quantity}${item.category ? ` | Kategori: ${item.category}` : ""}`
  ).join("\n") : "Yok";
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/905522207270?text=${encodeURIComponent(message)}`;
}

export function saveQuoteDraft(message: string): string {
  const url = whatsappUrl(message);
  // Personal form data is not stored in localStorage or the site's URL.
  try { window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ message, createdAt: Date.now() })); }
  catch { /* The current page still has a direct WhatsApp link. */ }
  return url;
}

export function readQuoteDraft(): string | null {
  try {
    const data = JSON.parse(window.sessionStorage.getItem(DRAFT_KEY) || "null");
    if (!data || typeof data.message !== "string" || typeof data.createdAt !== "number" ||
        Date.now() - data.createdAt > 30 * 60 * 1000) {
      window.sessionStorage.removeItem(DRAFT_KEY);
      return null;
    }
    return whatsappUrl(data.message);
  } catch { return null; }
}

export function ProductCartLink() {
  const { items } = useProductQuoteCart();
  return <Link href="/teklif-sepeti" className="inline-flex items-center gap-2 rounded-xl bg-[#db2775] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#be185d]">
    Teklif Sepetim ({items.length} ürün)
  </Link>;
}

export function ProductCartPanel() {
  const { items, updateQuantity, removeItem, storageWarning } = useProductQuoteCart();
  return <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8 space-y-4">
    <h2 className="text-xl font-bold text-gray-900">Ürün Teklif Sepetiniz</h2>
    {items.length === 0 ? <p className="text-sm text-gray-500">Sepetiniz boş. Ürünlerden seçim yapabilir veya aşağıdaki formdan talebinizi yazabilirsiniz.</p> :
      <ul className="divide-y divide-gray-100">{items.map(item => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
        <div className="min-w-0 flex-1"><p className="text-sm font-bold text-gray-900 break-words">{item.title}</p>
          <p className="text-xs text-gray-500">{item.category}{item.catalogCode ? ` · ${item.catalogCode}` : ""}</p></div>
        <input aria-label={`${item.title} adedi`} type="number" min="1" max="999999" step="1" value={item.quantity}
          onChange={event => updateQuantity(item.id, Number(event.target.value))}
          className="w-24 rounded-lg border border-slate-300 px-3 py-1.5 text-center text-sm font-medium text-slate-900 focus:border-[#db2775] focus:outline-none" />
        <button type="button" onClick={() => removeItem(item.id)} aria-label={`${item.title} ürününü sepetten çıkar`} className="text-sm font-medium text-pink-600 hover:underline">Çıkar</button>
      </li>)}</ul>}
    {storageWarning && <p role="status" className="text-sm text-gray-600">Tarayıcınız sepeti kalıcı kaydetmeye izin vermiyor. Sayfayı yenilerseniz ürünler silinebilir.</p>}
    <Link href="/urunler" className="inline-flex items-center gap-2 text-sm font-semibold text-[#db2775] hover:underline">Ürünlere Git / Ürün Eklemeye Devam Et →</Link>
  </div>;
}
