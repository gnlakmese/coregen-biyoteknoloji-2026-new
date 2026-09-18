"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ShoppingCart, MessageCircle, Users, GraduationCap, Calendar, 
  CheckCircle2, FileText, CreditCard, ChevronLeft 
} from "lucide-react";

const egitimDetaylari = {
  "uygulamali-protein-modelleme": {
    title: "Uygulamalı Protein Modelleme ve Yapısal Biyoinformatik Eğitimi",
    description: "Protein dizisinden 3B yapıya: Protein modelleme, Homology Modeling, AlphaFold kullanımı ve yapısal analiz süreçlerini öğrenin.",
    rawContent: `🧬 Uygulamalı Protein Modelleme ve Yapısal Biyoinformatik Eğitimi
📅 Tarih: 17–18 Ekim 2026
🕐 Saat: 12.00–15.00
💻 Eğitim: Online – Canlı
⏱️ Süre: 6 saat
🎓 Seviye: Başlangıç / Orta
📜 Katılım: Eğitim sonunda katılım sertifikası`,
    instructorName: "Gönül Akmeşe",
    price: "3.500 ₺",
    features: ["6 Saat Canlı Eğitim (17-18 Ekim)", "Online – Canlı", "Başlangıç / Orta Seviye", "Katılım Sertifikası"],
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/50977471",
  },
  "sitogenetik": {
    title: "Sitogenetik ve Sanal Uygulamalı Karyotipleme Eğitimi",
    description: "Kromozom yapısı, karyotip analizi, sayısal ve yapısal kromozomal anomaliler ile sanal karyotipleme uygulamaları.",
    rawContent: `🧬 Sitogenetik ve Sanal Uygulamalı Karyotipleme Eğitimi
💻 Eğitim: Online – Canlı
🎓 Seviye: Başlangıç / Orta
📜 Katılım: Eğitim sonunda katılım sertifikası`,
    instructorName: "Gönül Akmeşe",
    price: "4.500 ₺",
    features: ["Online – Canlı Eğitim", "Sanal Karyotipleme Pratiği", "Başlangıç / Orta Seviye", "Katılım Sertifikası"],
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/49958492",
  },
  "biyoinformatik-101": {
    title: "Biyoinformatik 101 Eğitimi",
    description: "Biyoinformatiğe giriş ve temel veri analizi. NCBI, BLAST ve sekans hizalama yaklaşımlarıyla temel biyoinformatik okuryazarlığı.",
    rawContent: `🧬 Biyoinformatik 101 Eğitimi
📚 Erişim: Satın alma sonrası 7/24
💻 Eğitim: Online – Dijital
⏱️ Eğitim: Kendi hızınızda
🎓 Seviye: Başlangıç
📜 Katılım: Eğitim sonunda katılım sertifikası`,
    instructorName: "Gönül Akmeşe",
    price: "3.500 ₺",
    features: ["Satın alma sonrası 7/24 erişim", "Online – Dijital Eğitim", "Başlangıç Seviyesi", "Katılım Sertifikası"],
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/46890607",
  },
  "uygulamali-primer-tasarimi": {
    title: "Uygulamalı Primer Tasarımı Eğitimi",
    description: "PCR için doğru ve özgül primer tasarımının temelleri. Tm, GC oranı, özgüllük ve Primer-BLAST kontrolleri.",
    rawContent: `🧬 Uygulamalı Primer Tasarımı Eğitimi
📚 Erişim: Satın alma sonrası 7/24
💻 Eğitim: Online – Dijital
⏱️ Eğitim: Kendi hızınızda
🎓 Seviye: Başlangıç / Orta
📜 Katılım: Eğitim sonunda katılım sertifikası`,
    instructorName: "Gönül Akmeşe",
    price: "2.500 ₺",
    features: ["Satın alma sonrası 7/24 erişim", "Online – Dijital Eğitim", "Başlangıç / Orta Seviye", "Katılım Sertifikası"],
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/46890580",
  }
};

export default function EgitimDetayPage() {
  const params = useParams();
  const id = params.id as string;
  
  const egitim = egitimDetaylari[id as keyof typeof egitimDetaylari] || egitimDetaylari["uygulamali-protein-modelleme"];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24 text-slate-800">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        
        <Link href="/egitimler" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-pink-600 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Eğitimlere Dön
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-cyan-600 bg-cyan-50 px-3 py-1.5 rounded-full mb-4">
                Sertifikalı Eğitim
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                {egitim.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-100 pb-8">
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-red-50 text-red-600 px-4 py-2 rounded-xl border border-red-100">
                  <Users className="w-4 h-4" />
                  <span className="font-bold">Kontenjan Dolmak Üzere!</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-xl">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">Sertifikalı Program</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Eğitim Detayları</h3>
                <div className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-6 rounded-2xl border border-slate-100 whitespace-pre-wrap font-medium">
                  {egitim.rawContent}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start">
              <div className="w-24 h-24 shrink-0 bg-pink-50 rounded-2xl flex items-center justify-center border-2 border-pink-100">
                <GraduationCap className="w-10 h-10 text-pink-500" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Eğitmen</span>
                <h3 className="text-xl font-bold text-slate-900">{egitim.instructorName}</h3>
                <p className="text-sm font-semibold text-pink-600 mb-4">Tıbbi Genetik Bilim Uzmanı (MSc.) | Biyoteknoloji Uzmanı</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Selçuk Üniversitesi Biyoteknoloji ve Tıbbi Genetik Yüksek Lisans mezunu. Moleküler biyoloji, klinik genetik ve biyoinformatik veri analizi alanlarında uzmanlaşmış CoreGen Biyoteknoloji kurucusu.
                </p>
                <button className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors">
                  <FileText className="w-4 h-4" /> Eğitmen CV'sini İncele
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-32">
              <div className="text-center mb-6">
                <p className="text-sm text-slate-500 font-semibold mb-1">Eğitim Ücretleri</p>
                <p className="text-4xl font-extrabold text-slate-900">{egitim.price}</p>
              </div>

              <div className="space-y-3 mb-8">
                {egitim.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <a 
                  href={egitim.shopierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-pink-600/20 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Sepete Ekle / Satın Al
                </a>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pb-2">
                  <CreditCard className="w-4 h-4" /> 256-bit SSL & Shopier Güvencesiyle
                </div>
                <a href="https://wa.me/905522207270?text=Merhaba,%20eğitimleriniz%20hakkında%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" /> WhatsApp'tan Bilgi Al
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
