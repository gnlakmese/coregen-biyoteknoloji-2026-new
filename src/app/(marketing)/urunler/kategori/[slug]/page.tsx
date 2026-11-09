"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { MessageCircle, FileText, CheckCircle2, ArrowLeft, ExternalLink, ShoppingBag, Store } from "lucide-react";
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

  const { addItem, storageWarning } = useProductQuoteCart();
  const [notice, setNotice] = useState("");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    Object.fromEntries(rawProducts.map((p) => [p.id, 1]))
  );

  const handleQuantityChange = (id: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [id]: normalizeQuantity(val) }));
  };

  if (!category) notFound();

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
          <p role="status" aria-live="polite" className="text-sm text-slate-600">{notice}{storageWarning ? " Sepet bu tarayıcıda kalıcı kaydedilemiyor; sayfayı yenilemeyin." : ""}</p>
        </div>
      </section>

      {/* EĞER "LABORATUVAR CİHAZLARI" İSE İKAS MAĞAZASINA YÖNLENDİR */}
      {isLabDevices ? (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 lg:p-16 text-center max-w-3xl mx-auto shadow-sm space-y-6">
            <div className="w-20 h-20 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mx-auto border border-pink-100 shadow-inner">
              <Store className="w-10 h-10" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Laboratuvar Cihazları İkas Mağazamızda!
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
                Laboratuvar cihazlarımız güncel stoklar ve resmi e-ticaret altyapımızla satışa sunulmuştur. Tüm cihaz çeşitlerini incelemek için mağazamızı ziyaret edebilirsiniz.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={ikasStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                  <ShoppingBag className="w-5 h-5" /> İkas Mağazasında Görüntüle <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              <Link
                href="/urunler"
                className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-6 py-4 rounded-xl text-sm transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Tüm Ürünlere Dön
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* DİĞER KATEGORİLER İÇİN ÜRÜN LİSTESİ VE TEKLİF SEPETİ SİSTEMİ */
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
