import { ProductCartLink } from "@/components/quote/product-quote-cart";
import type { Metadata } from "next";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { CategoryCard } from "@/components/catalog/category-card";
import { CtaSection } from "@/components/sections/cta-section";
import { productCategories } from "@/content/products";

const PAGE_TITLE = "Ürün Kataloğu";
const PAGE_DESCRIPTION =
  "CoreGen Biyoteknoloji bilimsel tedarik kataloğudur. Fiyat bilgisi için doğrudan talep oluşturabilirsiniz.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/urunler",
  },
  openGraph: {
    title: `${PAGE_TITLE} | CoreGen Biyoteknoloji`,
    description: PAGE_DESCRIPTION,
    url: "/urunler",
    type: "website",
  },
};

export default function CatalogPage() {
  return (
    <>
      {/* Üst Alan: Header'ın altında kalmaması için yeterli üst boşluk (pt-24 / pt-28) verildi */}
      <section className="relative border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumb items={[{ label: "Ürünler" }]} />
          <Reveal>
            <div className="max-w-3xl space-y-3">
              <span className="inline-block rounded-full bg-[#db2775]/10 px-3.5 py-1 font-mono text-xs uppercase tracking-[0.14em] text-[#db2775]">
                Bilimsel Tedarik Kataloğu
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                İhtiyacınıza Uygun Kategoriyi Seçin
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                CoreGen Biyoteknoloji bilimsel tedarik kataloğudur. Fiyat bilgisi için doğrudan talep oluşturabilirsiniz.
              </p>
            </div>
          </Reveal>
          <ProductCartLink />
        </div>
      </section>

      {/* Kategori Grid Alanı */}
      <section className="py-12 lg:py-16 bg-slate-50/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-2">
          {productCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
            />
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
