"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { notFound, redirect, useParams } from "next/navigation";
import { MessageCircle, FileText, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getProductCategoryBySlug, getProductsByCategory } from "@/content/products";
import { useProductQuoteCart, ProductCartLink, normalizeQuantity } from "@/components/quote/product-quote-cart";

export default function CategoryDetailPage() {
  const params = useParams<{ slug: string }>();
  const category = getProductCategoryBySlug(params.slug);
  const rawProducts = getProductsByCategory(params.slug);


  // Sadece "Laboratuvar Cihazları" kategorisi İkas mağazasına yönlendirilecek
  const isLabDevices = (category?.title || "").toLowerCase().includes("cihaz");
  const ikasStoreUrl = "https://8z6s1-coregenbiyoteknoloji.myikas.com/";

  const { items, addItem, storageWarning } = useProductQuoteCart();
  const [addedProducts, setAddedProducts] = useState<Record<string, boolean>>({});
  const addedTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    setAddedProducts({});
    return () => {
      Object.values(addedTimers.current).forEach(clearTimeout);
      addedTimers.current = {};
    };
  }, [params.slug]);

  const showAdded = (id: string) => {
    if (addedTimers.current[id]) clearTimeout(addedTimers.current[id]);
    setAddedProducts(previous => ({ ...previous, [id]: true }));
    addedTimers.current[id] = setTimeout(() => {
      setAddedProducts(previous => ({ ...previous, [id]: false }));
      delete addedTimers.current[id];
    }, 2500);
  };
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    Object.fromEntries(rawProducts.map((p) => [p.id, 1]))
  );

  const handleQuantityChange = (id: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [id]: normalizeQuantity(val) }));
  };

  if (!category) notFound();
  if (isLabDevices) redirect(ikasStoreUrl);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Üst Banner Alanı */}
      <section className="border-b border-slate-200 bg-white pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumb
            items={[
              { label: "Ürünler", href: "/urunler" },
              { label: category.title },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {category.title}
            </h1>
            <p className="text-base text-slate-600">
              {category.description || "Bu kategorideki profesyonel ürünleri inceleyip teklif sepetine ekleyebilir ve WhatsApp üzerinden hızlıca teklif talep edebilirsiniz."}
            </p>
          </div>
          <ProductCartLink />
          {storageWarning && <p role="status" className="text-sm text-slate-600">Sepet bu tarayıcıda kalıcı kaydedilemiyor; sayfayı yenilemeyin.</p>}
        </div>
      </section>

      {/* Ürün listesi ve teklif sepeti */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {rawProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-500">Bu kategoride henüz ürün bulunmuyor.</p>
              <Link
                href="/urunler"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#db2775] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Tüm Ürünlere Dön
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rawProducts.map((product) => {
                const qty = quantities[product.id] || 1;
                const cartQuantity = items.find(item => item.id === product.id)?.quantity || 0;
                const justAdded = !!addedProducts[product.id] && cartQuantity > 0;
                const atLimit = cartQuantity >= 999999;
                const whatsappUrl = `https://wa.me/905522207270?text=${encodeURIComponent(
                  `Merhaba, ${qty} adet ${product.name} ürünü hakkında bilgi ve fiyat teklifi almak istiyorum.`
                )}`;

                return (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div>
                      {/* Ürün Görseli */}
                      <div className="relative mb-4 h-52 w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                        <Image
                          src={product.image || "/images/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h3 className="font-display text-lg font-bold text-slate-900">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Nedir / Neden Kullanılır */}
                      {(product.whatIsIt || product.whyUsed) && (
                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 space-y-1.5 border border-slate-100">
                          {product.whatIsIt && (
                            <p><strong>Nedir?</strong> {product.whatIsIt}</p>
                          )}
                          {product.whyUsed && (
                            <p><strong>Neden Kullanılır?</strong> {product.whyUsed}</p>
                          )}
                        </div>
                      )}

                      {/* Özellikler */}
                      {product.features && product.features.length > 0 && (
                        <div className="mt-4 space-y-1">
                          {product.features.slice(0, 3).map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#db2775] shrink-0" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
                      {cartQuantity > 0 && (
                        <Link href="/teklif-sepeti" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#db2775] hover:underline">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          Sepetinizde {cartQuantity} adet var · Sepeti Gör
                        </Link>
                      )}
                      {/* Manuel Adet Girişi */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Adet:</span>
                        <input
                          type="number"
                          min="1"
                          max="999999"
                          step="1"
                          aria-label={`${product.name} adedi`}
                          value={qty}
                          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                          className="w-24 rounded-lg border border-slate-300 px-3 py-1.5 text-center text-sm font-medium text-slate-900 focus:border-[#db2775] focus:outline-none"
                        />
                      </div>

                      {/* Butonlar: Teklif Sepetine Ekle + WhatsApp */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={atLimit}
                          aria-label={`${product.name}: ${atLimit ? "Adet sınırına ulaşıldı" : `${qty} adet teklif sepetine ekle`}`}
                          onClick={() => {
                            addItem({
                              id: product.id,
                              slug: product.slug,
                              title: product.name,
                              category: product.categoryName,
                              quantity: qty,
                              image: product.image,
                            });
                            showAdded(product.id);
                          }}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#db2775] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#be185d]"
                        >
                          {justAdded
                            ? <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                            : <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />}
                          {atLimit ? "Adet Sınırına Ulaşıldı" : justAdded ? "Sepete Eklendi" : "Teklif Sepetine Ekle"}
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center rounded-xl bg-emerald-600 p-2.5 text-white transition-colors hover:bg-emerald-700"
                          title="WhatsApp ile Bilgi Al"
                        >
                          <MessageCircle className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
    </div>
  );
}
