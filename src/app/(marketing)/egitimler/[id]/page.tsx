"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart, MessageCircle, Users, Calendar, CheckCircle2, CreditCard, ChevronLeft } from "lucide-react";

const egitimDetaylari = {
  "bif-101": {
    title: "BIF 101 Eğitimi",
    image: "/images/egitimler/bif-101.jpeg",
    description: "Temel Biyoinformatik ve Veri Tabanları eğitimi ile veri analizi dünyasına ilk adımınızı atın.",
    rawContent: `BIF 101 Eğitimi
Erişim: Satın alma sonrası 7/24
Eğitim: Online – Dijital & Kendi hızınızda
Seviye: Başlangıç
Katılım: Eğitim sonunda katılım sertifikası

Eğitimde neler öğreneceksiniz?
- Biyoinformatiğe giriş ve temel kavramlar
- Biyolojik verilerin bilgisayar ortamında analiz edilmesi
- DNA, RNA ve protein dizilerinin temel özellikleri
- Nükleotid ve amino asit dizilerinin okunması
- Sekans verilerinin temel dosya formatları (FASTA vb.)
- Biyolojik veri tabanlarının temel mantığı ve NCBI kullanımı
- Gen ve protein bilgilerinin araştırılması
- BLAST nedir ve ne amaçla kullanılır? BLAST analizi yorumlama
- Sequence Alignment (sekans hizalama) mantığı (Pairwise & MSA)
- Sekans benzerliği ve biyolojik anlamı
- Protein dizilerinin temel biyoinformatik analizi
- Filogenetik analiz mantığına giriş
- Biyoinformatik analizlerde veri kalitesinin önemi`,
    price: "3.500 ₺",
    features: ["Satın alma sonrası 7/24 erişim", "Online – Dijital Eğitim", "Başlangıç Seviyesi", "Katılım Sertifikası"],
    paytrUrl: "https://www.paytr.com/link/ppBeqgg",
  },
  "biyoinformatik-101": {
    title: "Biyoinformatik 101: Temel Biyoinformatik ve Veri Tabanları",
    image: "/images/egitimler/Biyoinformatik-101.jpeg",
    description: "Biyoinformatiğe giriş ve temel veri analizi. NCBI, BLAST ve sekans hizalama yaklaşımlarıyla temel biyoinformatik okuryazarlığı.",
    rawContent: `Biyoinformatik 101 Eğitimi
Erişim: Satın alma sonrası 7/24
Eğitim: Online – Dijital & Kendi hızınızda
Seviye: Başlangıç
Katılım: Eğitim sonunda katılım sertifikası

Eğitimde neler öğreneceksiniz?
- Biyoinformatiğe giriş ve temel kavramlar
- Biyolojik verilerin bilgisayar ortamında analiz edilmesi
- NCBI, BLAST ve sekans hizalama yaklaşımları
- Gen ve protein bilgilerinin araştırılması`,
    price: "3.500 ₺",
    features: ["Satın alma sonrası 7/24 erişim", "Online – Dijital Eğitim", "Başlangıç Seviyesi", "Katılım Sertifikası"],
    paytrUrl: "https://www.paytr.com/link/DOtkLu9",
  },
  "uygulamali-primer-tasarimi": {
    title: "Uygulamalı Primer Tasarımı Eğitimi",
    image: "/images/egitimler/uygulamali-primer-tasarimi.jpeg",
    description: "PCR için doğru ve özgül primer tasarımının temelleri. Tm, GC oranı, özgüllük ve Primer-BLAST kontrolleri.",
    rawContent: `Uygulamalı Primer Tasarımı Eğitimi
Erişim: Satın alma sonrası 7/24
Eğitim: Online – Dijital
Seviye: Başlangıç / Orta
Katılım: Eğitim sonunda katılım sertifikası

Eğitimde neler öğreneceksiniz?
- PCR'ın temel prensibi ve primerin rolü
- Forward ve Reverse primer kavramları
- Hedef gen ve hedef bölgenin belirlenmesi
- Primer uzunluğu, GC oranı ve Tm değeri optimizasyonu
- Primer özgüllüğü (specificity) ve amplicon uzunluğu
- Primer-dimer ve hairpin (ikincil yapı) oluşumunun engellenmesi
- NCBI üzerinden hedef sekansın bulunması
- Primer tasarım araçlarının kullanılması
- Primer-BLAST kullanımı ve özgüllük kontrolü
- Örnek gen sekansları üzerinden uygulamalı primer tasarımı`,
    price: "2.500 ₺",
    features: ["Satın alma sonrası 7/24 erişim", "Online – Dijital Eğitim", "Başlangıç / Orta Seviye", "Katılım Sertifikası"],
    paytrUrl: "https://www.paytr.com/link/gJXUlYO",
  },
  "rekombinant-protein-ve-plazmit-tasarimi": {
    title: "Rekombinant Protein ve Plazmit Tasarımı Eğitimi",
    image: "/images/egitimler/rekombinant-protein-egitimi.png",
    description: "Bir proteinin üretimi, doğru genetik tasarımla başlar. Rekombinant protein üretimi ve plazmit tasarımının temelleri.",
    rawContent: `Rekombinant Protein ve Plazmit Tasarımı Eğitimi
Erişim: Satın alma sonrası 7/24
Eğitim: Online – Dijital
Seviye: Başlangıç / Orta
Katılım: Eğitim sonunda katılım sertifikası

CoreGen Biyoteknoloji güvencesiyle rekombinant protein üretimi, genetik yapı tasarımı ve plazmit optimizasyonu süreçlerini bu eğitimde detaylıca öğreneceksiniz.`,
    price: "3.500 ₺",
    features: ["Satın alma sonrası 7/24 erişim", "Online – Dijital Eğitim", "Plazmit Tasarım Temelleri", "Katılım Sertifikası"],
    paytrUrl: "https://www.paytr.com/link/8A4zgHl",
  },
  "proje-ve-egitim-danismanligi": {
    title: "Proje ve Eğitim Danışmanlığı",
    image: "/images/egitimler/proje-danismanlik.jpg",
    description: "Akademik ve bilimsel projeleriniz, TÜBİTAK başvurularınız ve özel eğitim yol haritalarınız için birebir profesyonel danışmanlık.",
    rawContent: `Proje ve Eğitim Danışmanlığı
Format: Birebir Çevrim İçi Görüşme ve Yol Haritası Planlaması

Akademik ve bilimsel araştırma projeleriniz, TÜBİTAK/KOSGEB başvuru süreçleriniz, laboratuvar kurulum ve optimizasyon çalışmalarınız için birebir uzman danışmanlık desteği alabilirsiniz.`,
    price: "5.000 ₺",
    features: ["Birebir Görüşme", "Proje Danışmanlığı", "TÜBİTAK Yol Haritası", "Uzman Desteği"],
    paytrUrl: "https://www.paytr.com/link/j7ivdkf",
  },
  "kariyer-ve-egitim-danismanligi": {
    title: "Kariyer ve Eğitim Danışmanlığı",
    image: "/images/egitimler/kariyer-danismanlik.jpg",
    description: "Biyoteknoloji, moleküler biyoloji ve genetik alanlarında kariyer planlaması, lisansüstü hedef belirleme ve mentorluk desteği.",
    rawContent: `Kariyer ve Eğitim Danışmanlığı
Format: Birebir Mentörlük ve Kariyer Planlama Oturumu

Biyoteknoloji, genetik ve yaşam bilimleri sektöründe kariyer hedefleyenler; lisansüstü eğitim (Yüksek Lisans / Doktora) planlaması yapanlar ve akademik yol haritasını çizenler için kişiselleştirilmiş mentorluk hizmetidir.`,
    price: "4.000 ₺",
    features: ["Kariyer Planlaması", "Mentorluk", "Akademik Yönlendirme", "Özgeçmiş İncelemesi"],
    paytrUrl: "https://www.paytr.com/link/Dpw812Z",
  }
};

export default function EgitimDetayPage() {
  const params = useParams();
  const id = params.id as string;
  const egitim = egitimDetaylari[id as keyof typeof egitimDetaylari] || egitimDetaylari["bif-101"];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24 text-slate-800">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        <Link href="/egitimler" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-pink-600 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Eğitimlere Dön
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm overflow-hidden space-y-6">
              
              {/* Detay Sayfası Header Görseli */}
              <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden shadow-md">
                <Image src={egitim.image} alt={egitim.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <span className="text-white font-extrabold text-2xl md:text-3xl leading-tight">
                    {egitim.title}
                  </span>
                </div>
              </div>

              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-cyan-600 bg-cyan-50 px-3 py-1.5 rounded-full">
                Sertifikalı Program / Danışmanlık
              </span>

              <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-100 font-bold">
                  <Users className="w-4 h-4" /> Kontenjan Dolmak Üzere!
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-xl font-semibold">
                  <Calendar className="w-4 h-4 text-blue-500" /> Profesyonel İçerik
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Eğitim Detayları & İçerik</h3>
                <div className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-6 rounded-2xl border border-slate-100 whitespace-pre-wrap font-medium">
                  {egitim.rawContent}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-32 space-y-6">
              <div className="text-center">
                <p className="text-sm text-slate-500 font-semibold mb-1">Eğitim Ücreti</p>
                <p className="text-4xl font-extrabold text-slate-900">{egitim.price}</p>
              </div>

              <div className="space-y-3">
                {egitim.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <a 
                  href={egitim.paytrUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-pink-600/20 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> PayTR ile Hemen Satın Al
                </a>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pb-2">
                  <CreditCard className="w-4 h-4" /> 256-bit SSL & PayTR Güvencesiyle
                </div>
                <a 
                  href="https://wa.me/905522207270?text=Merhaba,%20eğitimleriniz%20hakkında%20bilgi%20almak%20istiyorum." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
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
