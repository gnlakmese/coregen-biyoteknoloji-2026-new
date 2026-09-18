"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight, BookOpen, AlertCircle, PlayCircle, Radio, Megaphone, ShoppingCart } from "lucide-react";

// Admin panelinden gelecek duyuruların listesi
const mockDuyurular = [
  "🔥 Bu Ayın Özel Oturumu: Epigenetik Perspektif Eğitimine Kayıtlar Başladı!",
  "📢 CoreGen Genetik Akademi 2026 Eğitim Takvimi Güncellendi.",
  "💡 Uygulamalı Protein Modelleme ve Yapısal Biyoinformatik Eğitimi için Kayıtlar Açıldı!"
];

const mockEgitimler = [
  {
    id: "uygulamali-protein-modelleme",
    title: "Uygulamalı Protein Modelleme ve Yapısal Biyoinformatik Eğitimi",
    description: "Protein dizisinden 3B yapıya: Protein modelleme, Homology Modeling, AlphaFold kullanımı ve yapısal analiz süreçlerini öğrenin.",
    price: "3.000 ₺",
    image: "/images/coregen genetik akademisi.png", 
    isDigital: false,
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/50977471",
  },
  {
    id: "sitogenetik",
    title: "Sitogenetik Eğitimi",
    description: "Kromozom yapısı, karyotip analizi, sayısal ve yapısal kromozomal anomaliler ile sitogenetik değerlendirme temelleri.",
    price: "2.553 ₺",
    image: "/images/sitogenetik sanal uygulama .png",
    isDigital: true,
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/49958492",
  },
  {
    id: "biyoinformatik-101",
    title: "Biyoinformatik 101 Eğitimi",
    description: "Biyoinformatiğe giriş ve temel veri analizi. NCBI, BLAST ve sekans hizalama yaklaşımlarıyla temel biyoinformatik okuryazarlığı.",
    price: "2.956 ₺",
    image: "/images/biyoinformatik 101.jpeg",
    isDigital: true,
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/46890607",
  },
  {
    id: "uygulamali-primer-tasarimi",
    title: "Uygulamalı Primer Tasarımı Eğitimi",
    description: "PCR için doğru ve özgül primer tasarımının temelleri. Tm, GC oranı, özgüllük ve Primer-BLAST kontrolleri.",
    price: "1.928 ₺",
    image: "/images/primer tasarımı eğitimi.jpeg",
    isDigital: true,
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/46890580",
  }
];

export default function EgitimlerPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24 text-slate-800 overflow-hidden">
      
      {/* CSS Animasyonu (Kayan Yazı İçin) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 35s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* BÜYÜK VE PREMİUM DUYURU BANDI (MARQUEE) */}
      <div className="relative w-full bg-slate-900 border-y border-pink-500/20 py-5 mt-8 flex items-center shadow-2xl">
        
        {/* Sol Taraftaki Sabit 'Duyurular' Etiketi (Fade Efektli) */}
        <div className="absolute left-0 z-10 bg-gradient-to-r from-slate-900 via-slate-900 to-transparent w-64 h-full flex items-center pl-6 pointer-events-none">
          <span className="flex items-center gap-2 text-pink-500 font-extrabold uppercase tracking-widest text-sm bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20 backdrop-blur-md">
            <Megaphone className="w-5 h-5 animate-pulse" /> DUYURULAR
          </span>
        </div>

        {/* Kayan Yazılar */}
        <div className="w-full overflow-hidden pl-64">
          <div className="animate-scroll flex items-center gap-16 text-lg font-medium tracking-wide text-slate-200 cursor-default">
            {[...mockDuyurular, ...mockDuyurular].map((duyuru, index) => (
              <span key={index} className="flex items-center gap-6 whitespace-nowrap hover:text-white transition-colors">
                 {duyuru}
                 <span className="text-cyan-500/40 text-2xl">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-12 mt-16">
        
        <div className="text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 bg-pink-50 px-3.5 py-1.5 rounded-full mb-4">
            CoreGen Genetik Akademi
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-cyan-600">Eğitimler</span>
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {mockEgitimler.map((egitim) => (
            <div key={egitim.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              
              <div className="relative h-56 bg-slate-100 overflow-hidden">
                <Image src={egitim.image} alt={egitim.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-sm z-10">
                  {egitim.price}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative z-10 bg-white">
                
                {egitim.isDigital ? (
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider uppercase text-purple-700 bg-purple-50 px-2.5 py-1.5 rounded-lg mb-3 w-max border border-purple-100">
                    <PlayCircle className="w-3.5 h-3.5" /> Dijital Eğitim (Video)
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg mb-3 w-max border border-emerald-100">
                    <Radio className="w-3.5 h-3.5 animate-pulse" /> Canlı Eğitim
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-pink-600 transition-colors">
                  {egitim.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 line-clamp-3">
                  {egitim.description}
                </p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-center text-xs border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1.5 text-red-600 px-3 py-1 rounded-full font-bold text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                      Kontenjan Dolmak Üzere!
                    </div>
                  </div>

                  {/* Butonlar: Detay ve Shopier Satın Al */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      href={`/egitimler/${egitim.id}`} 
                      className="inline-flex items-center justify-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 px-3 rounded-2xl font-bold text-xs transition-colors border border-slate-200"
                    >
                      Detaylar <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a 
                      href={egitim.shopierUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 bg-pink-600 hover:bg-pink-700 text-white py-3 px-3 rounded-2xl font-bold text-xs transition-colors shadow-sm shadow-pink-500/20"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Satın Al
                    </a>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
