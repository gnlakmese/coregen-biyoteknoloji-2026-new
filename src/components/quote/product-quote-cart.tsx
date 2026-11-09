"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ShoppingCart, CheckCircle2, X } from "lucide-react";

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
const ADDED_EVENT_NAME = "coregen-product-quote-added";
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
      const nextQuantity = normalizeQuantity((found?.quantity || 0) + normalizeQuantity(item.quantity));
      const addedQuantity = nextQuantity - (found?.quantity || 0);
      writeCart(found
        ? current.map(existing => existing.id === item.id
          ? { ...existing, ...item, quantity: nextQuantity }
          : existing)
        : [...current, { ...item, quantity: nextQuantity }]);
      window.dispatchEvent(new CustomEvent(ADDED_EVENT_NAME, {
        detail: { title: item.title, quantity: addedQuantity, storageWarning },
      }));
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

interface AddedProductNotice {
  title: string;
  quantity: number;
  storageWarning: boolean;
}

// ProductCartLink mounts this once on each catalogue/category page.
// Repeated additions reset the timer; navigation and unmount clean it up.
export function ProductCartToast() {
  const [notice, setNotice] = useState<AddedProductNotice | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onAdded = (event: Event) => {
      const detail = (event as CustomEvent<AddedProductNotice>).detail;
      if (!detail || typeof detail.title !== "string" ||
          typeof detail.quantity !== "number" || !Number.isFinite(detail.quantity)) return;
      if (timer.current) clearTimeout(timer.current);
      setNotice(detail);
      timer.current = setTimeout(() => {
        setNotice(null);
        timer.current = null;
      }, 6000);
    };
    window.addEventListener(ADDED_EVENT_NAME, onAdded);
    return () => {
      window.removeEventListener(ADDED_EVENT_NAME, onAdded);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const dismiss = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setNotice(null);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] sm:left-auto sm:w-96">
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {notice ? (notice.quantity > 0
          ? `${notice.title}: ${notice.quantity} adet teklif sepetine eklendi.`
          : `${notice.title}: Sepetteki adet sınırına ulaşıldı.`) : ""}
      </div>
      {notice && (
        <div className="rounded-2xl border border-pink-200 bg-white p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-pink-600" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900">
                {notice.quantity > 0 ? "Sepete eklendi" : "Adet sınırına ulaşıldı"}
              </p>
              <p className="mt-1 break-words text-sm text-slate-600">
                {notice.title}{notice.quantity > 0 ? ` · ${notice.quantity} adet` : ""}
              </p>
              {notice.storageWarning && <p className="mt-2 text-xs text-slate-600">Sepet kalıcı kaydedilemiyor. Sayfayı yenilemeyin.</p>}
            </div>
            <button type="button" onClick={dismiss} aria-label="Bildirimi kapat"
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <Link href="/teklif-sepeti" onClick={dismiss}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#db2775] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#be185d]">
            <ShoppingCart className="h-4 w-4" aria-hidden="true" /> Teklif Sepetime Git
          </Link>
        </div>
      )}
    </div>
  );
}

export function ProductCartLink() {
  const { items } = useProductQuoteCart();
  return <>
    <Link href="/teklif-sepeti" aria-label={`Teklif Sepetim, ${items.length} farklı ürün`}
      className="inline-flex items-center gap-2 rounded-xl bg-[#db2775] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#be185d]">
      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
      <span>Teklif Sepetim</span>
      <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[#db2775]">
        {items.length}
      </span>
    </Link>
    <ProductCartToast />
  </>;
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
