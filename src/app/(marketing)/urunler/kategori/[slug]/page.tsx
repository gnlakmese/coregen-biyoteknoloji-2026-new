"use client";

import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft, ShoppingBag, Store, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getProductCategoryBySlug } from "@/content/products";

interface CategoryDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const category = getProductCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  // İkas mağazandaki resmi lab ürünleri ve cihazlar sayfan
  const ikasStoreUrl = "https://8z6s1-coregenbiyoteknoloji.myikas.com/";

  // WhatsApp üzerinden direkt genel kategori veya lab cihazları bilgi talebi için
  const whatsappUrl = `https://wa.me/905522207270?text=${encodeURIComponent(
    `Merhaba, ${category.title} kategorisindeki laboratuvar cihazları ve ürünler hakkında bilgi ve fiyat teklifi almak istiyorum.`
  )}`;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
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
              {category.description || "Bu kategorideki profesyonel laboratuvar cihazları ve sarf malzemeleri için resmi İkas e-ticaret mağazamızı ziyaret edebilir ya da WhatsApp üzerinden doğrudan teklif talep edebilirsiniz."}
            </p>
          </div>
        </div>
      </section>

      {/* İkas Mağaza ve WhatsApp Yönlendirme Alanı */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 lg:p-16 text-center max-w-3xl mx-auto shadow-sm space-y-6">
          <div className="w-20 h-20 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mx-auto border border-pink-100 shadow-inner">
            <Store className="w-10 h-10" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {category.title} ve Lab Cihazları İkas Mağazamızda!
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              CoreGen Biyoteknoloji laboratuvar cihazları, kitler ve tüm ürün çeşitleri güncel stoklar ve güvenli ödeme altyapısıyla resmi İkas mağazamızda satışa sunulmuştur. Dilerseniz hemen mağazamızı inceleyebilir ya da WhatsApp hattımız üzerinden doğrudan teklif alabilirsiniz.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ikasStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" /> İkas Mağazasında Görüntüle <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp ile Teklif Al (0552 220 72 70)
              </button>
            </a>
          </div>

          <div className="pt-2">
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Tüm Ürün Kategorilerine Dön
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
