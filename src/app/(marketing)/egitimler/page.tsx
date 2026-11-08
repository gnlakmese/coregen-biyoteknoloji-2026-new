"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight, AlertCircle, PlayCircle, Radio, Megaphone, ShoppingCart } from "lucide-react";

const mockDuyurular = [
  "✦ Bu Ayın Özel Oturumu: Epigenetik Perspektif Eğitimine Kayıtlar Başladı!",
  "✦ CoreGen Eğitim Takvimi Güncellendi.",
  "✦ BIF 101 ve Rekombinant Protein Eğitimleri Aktif!"
];

const mockEgitimler = [
  {
    id: "bif-101",
    title: "BIF 101 Eğitimi",
    description: "Temel Biyoinformatik ve Veri Tabanları eğitimi ile veri analizi dünyasına ilk adımınızı atın.",
    price: "4.000 ₺",
    image: "/images/egitimler/bif-101.jpeg",
    category: "Dijital Eğitim",
    isDigital: true,
    paytrUrl: "https://www.paytr.com/link/ppBeqgg",
  },
  {
    id: "uygulamali-primer-tasarimi",
    title: "Uygulamalı Primer Tasarımı Eğitimi",
    description: "PCR için doğru ve özgül primer tasarımının temelleri. Tm, GC oranı, özgüllük ve Primer-BLAST kontrolleri.",
    price: "2.500 ₺",
    image: "/images/egitimler/uygulamali-primer-tasarimi.jpeg",
    category: "Dijital Eğitim",
    isDigital: true,
    paytrUrl: "https://www.paytr.com/link/gJXUlYO", 
  },
  {
    id: "biyoinformatik-101",
    title: "Biyoinformatik 101: Temel Biyoinformatik ve Veri Tabanları",
    description: "Biyoinformatiğe giriş ve temel veri analizi. NCBI, BLAST ve sekans hizalama yaklaşımlarıyla temel biyoinformatik okuryazarlığı.",
    price: "3.500 ₺",
    image: "/images/egitimler/biyoinformatik-101.jpeg",
    category: "Dijital Eğitim",
    isDigital: true,
    paytrUrl: "https://www.paytr.com/link/DOtkLu9",
  },
  {
    id: "rekombinant-protein-ve-plazmit-tasarimi",
    title: "Rekombinant Protein ve Plazmit Tasarımı Eğitimi",
    description: "Bir proteinin üretimi, doğru genetik tasarımla başlar. Rekombinant protein üretimi ve plazmit tasarımının temelleri.",
    price: "3.500 ₺",
    image: "/images/egitimler/rekombinant-protein.png",
    category: "Dijital Eğitim",
    isDigital: true,
    paytrUrl: "https://www.paytr.com/link/8A4zgHl", 
  },
  {
    id: "proje-ve-egitim-danismanligi",
    title: "Proje ve Eğitim Danışmanlığı",
    description: "Akademik ve bilimsel projeleriniz, TÜBİTAK başvurularınız ve özel eğitim yol haritalarınız için birebir profesyonel danışmanlık.",
    price: "1.500 ₺",
    image: "/images/egitimler/proje-danismanlik.jpg",
    category: "Danışmanlık",
    isDigital: false,
    paytrUrl: "https://www.paytr.com/link/j7ivdkf",
  },
  {
    id: "kariyer-ve-egitim-danismanligi",
    title: "Kariyer ve Eğitim Danışmanlığı",
    description: "Biyoteknoloji, moleküler biyoloji ve genetik alanlarında kariyer planlaması, lisansüstü hedef belirleme ve mentorluk desteği.",
    price: "1.000 ₺",
    image: "/images/egitimler/kariyer-danismanlik.jpg",
    category: "Danışmanlık",
    isDigital: false,
    paytrUrl: "https://www.paytr.com/link/Dpw812Z",
  }
];

export default function EgitimlerPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [cart, setCart] = useState<typeof mockEgitimler>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredEgitimler = selectedCategory === "Tümü" 
    ? mockEgitimler 
    : mockEgitimler.filter(e => e.category === selectedCategory);

  const addToCart = (egitim: typeof mockEgitimler[0]) => {
    if (!cart.some(item => item.id === egitim.id)) {
      setCart([...cart, egitim]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => {
    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ""));
    return sum + numericPrice;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24 text-slate-800 overflow-hidden relative">
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

      {/* DUYURU BANDI (AKAR YAZI) */}
      <div className="relative w-full bg-slate-900 border-y border-pink-500/20 py-5 mt-8 flex items-center shadow-2xl">
        <div className="absolute left-0 z-10 bg-gradient-to-r from-slate-900 via-slate-900 to-transparent w-64 h-full flex items-center pl-6 pointer-events-none">
          <span className="flex items-center gap-2 text-pink-500 font-extrabold uppercase tracking-widest text-sm bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20 backdrop-blur-md">
            <Megaphone className="w-5 h-5 animate-pulse" /> DUYURULAR
          </span>
        </div>
        <div className="w-full overflow-hidden pl-64">
          <div className="animate-scroll flex items-center gap-16 text-lg font-medium tracking-wide text-slate-200 cursor-default">
            {[...mockDuyurular, ...mockDuyurular].map((duyuru, index) => (
              <span key={index} className="flex items-center gap-6 whitespace-nowrap hover:text-white transition-colors">
                {duyuru}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SEPET BUTONU */}
      <div className="fixed top-28 right-8 z-40">
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm hover:bg-slate-800 transition-all border border-slate-700"
        >
          <ShoppingCart className="w-5 h-5 text-pink-500" />
          <span>Sepetim</span>
          <span className="bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
            {cart.length}
          </span>
        </button>
      </div>

      {/* SEPET PANELİ */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-pink-600" /> Sepetim ({cart.length})
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
              </div>

              <div className="divide-y divide-slate-100 overflow-y-auto max-h-[60vh] my-4">
                {cart.length === 0 ? (
                  <p className="text-slate-500 text-center py-12 text-sm font-medium">Sepetinizde henüz eğitim veya danışmanlık bulunmuyor.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                        <span className="text-xs font-semibold text-pink-600">{item.price}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1">Kaldır</button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-slate-900">
                <span>Toplam Tutar:</span>
                <span className="text-xl text-pink-600">{totalPrice.toLocaleString()} ₺</span>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={() => {
                  if(cart.length > 0) {
                    window.location.href = cart[0].paytrUrl;
                  }
                }}
                className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
              >
                PayTR ile Güvenle Satın Al <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 space-y-10 mt-12">
        <div className="text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 bg-pink-50 px-3.5 py-1.5 rounded-full mb-4">
            CoreGen Genetik Akademi
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-cyan-600">Eğitimler & Danışmanlık</span>
          </h1>
        </div>

        {/* KATEGORİ FİLTRELEME */}
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {["Tümü", "Dijital Eğitim", "Canlı Eğitim", "Danışmanlık"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                selectedCategory === cat 
                  ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3'LÜ GRID KARTLARI */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEgitimler.map((egitim) => (
            <div key={egitim.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              
              {/* Kare Görsel Alanı (1x1) & Başlık Üzerinde */}
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <Image 
                  src={egitim.image} 
                  alt={egitim.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-white font-extrabold text-xl leading-snug drop-shadow-md">
                    {egitim.title}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-sm z-10">
                  {egitim.price}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative z-10 bg-white">
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider uppercase text-purple-700 bg-purple-50 px-2.5 py-1.5 rounded-lg mb-3 w-max border border-purple-100">
                  <PlayCircle className="w-3.5 h-3.5" /> Dijital Eğitim (Video)
                </div>

                <p className="text-sm text-slate-600 mb-6 line-clamp-3">
                  {egitim.description}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-center text-xs border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1.5 text-red-600 px-3 py-1 rounded-full font-bold text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5 animate-pulse" /> Kontenjan Dolmak Üzere!
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      href={`/egitimler/${egitim.id}`} 
                      className="inline-flex items-center justify-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 px-3 rounded-2xl font-bold text-xs transition-colors border border-slate-200"
                    >
                      Detaylar <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a 
                      href={egitim.paytrUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-1 bg-pink-600 hover:bg-pink-700 text-white py-3 px-3 rounded-2xl font-bold text-xs transition-colors shadow-sm shadow-pink-500/20"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Satın Al
                    </a>
                  </div>
                  <button 
                    onClick={() => addToCart(egitim)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-2xl font-bold text-xs transition-all"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
