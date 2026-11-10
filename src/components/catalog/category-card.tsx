"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Boxes, TestTube, FlaskConical, Cpu } from "lucide-react";

const localIconMap: Record<string, any> = {
  Boxes,
  TestTube,
  FlaskConical,
  Cpu,
};

const IKAS_STORE_URL = "https://8z6s1-coregenbiyoteknoloji.myikas.com/";

export function CategoryCard({ category }: { category: any }) {
  const IconComponent = localIconMap[category.icon] || Boxes;
  const isLabDevices = (category.title || "").toLowerCase().includes("cihaz");
  const CardLink = isLabDevices ? "a" : Link;
  const destination = isLabDevices ? IKAS_STORE_URL : category.href;

  return (
    <CardLink
      href={destination}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-[#db2775] hover:shadow-md"
    >
      {/* Üst Kısım: Kare/Dikdörtgen Dengeli Görsel Alanı */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={category.image || "/images/placeholder.jpg"}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm text-[#db2775] shadow-sm">
          <IconComponent className="h-5 w-5" />
        </div>
      </div>

      {/* Alt Kısım: İçerik */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#db2775] transition-colors">
            {category.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
            {category.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-sm font-semibold text-[#db2775] group-hover:underline">
            {isLabDevices ? "Mağazaya Git" : "Kategoriyi İncele"}
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all group-hover:bg-[#db2775] group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </CardLink>
  );
}
