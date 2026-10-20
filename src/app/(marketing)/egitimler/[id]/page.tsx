"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ShoppingCart, MessageCircle, Users, Calendar, 
  CheckCircle2, CreditCard, ChevronLeft 
} from "lucide-react";

const egitimDetaylari = {
  "epigenetik-ve-epigenomik": {
    title: "Epigenetik ve Epigenomik: Teoriden Laboratuvar Analizlerine",
    description: "Epigenetik mekanizmaları keşfedin, epigenomik yaklaşımları tanıyın ve modern moleküler araştırmalarda kullanılan analiz yöntemlerinin mantığını öğrenin!",
    rawContent: `🧬 Epigenetik ve Epigenomik: Teoriden Laboratuvar Analizlerine
📅 Eğitim tarihi: 28–29 Ekim, Saat 20:00-21:00 
⏱️ Toplam süre: 4 saat
💻 Format: Canlı çevrim içi eğitim
📜 Program: 4 modül

CoreGen Biyoteknoloji tarafından düzenlenen bu eğitimde epigenetiğin moleküler temellerinden başlayarak epigenomik araştırmalarda kullanılan laboratuvar yöntemlerini, genom çapında analiz yaklaşımlarını ve bu yöntemlerin bilimsel araştırmalardaki kullanım amaçlarını ele alacağız.
DNA metilasyonu, histon modifikasyonları, kromatin erişilebilirliği ve gen ifadesi gibi temel konuları; MSP, ChIP-seq, ATAC-seq ve RNA-seq gibi yöntemlerle ilişkilendirerek inceleyeceğiz.

Eğitim İçeriği:
Modül 1 | Epigenetiğin Moleküler Temelleri
- Epigenetik kavramı ve genetikten farkı
- DNA metilasyonu ve demetilasyon
- Histon modifikasyonları ve kromatin organizasyonu
- Kodlamayan RNA'lar ve gen ifadesinin düzenlenmesi
- Epigenetik mekanizmaların hücresel farklılaşma ve hastalıklarla ilişkisi

Modül 2 | Epigenomik ve Genom Çapında Araştırmalar
- Epigenetik ve epigenomik arasındaki fark
- Epigenomun hücre tipi ve biyolojik koşullara göre değişimi
- DNA metilasyon profillemesi, ChIP-seq, ATAC-seq ve RNA-seq'e giriş
- Hedefli analizler ile genom çapında yaklaşımların karşılaştırılması
- Epigenomik yöntemlerin araştırma sorularına göre kullanım alanları

Modül 3 | Epigenetik Araştırmalarda Laboratuvar Yöntemleri
- DNA ve RNA izolasyonu ile örnek kalitesinin önemi
- DNA metilasyon analizleri: MSP ve bisülfit temelli yöntemler
- Histon modifikasyonlarının incelenmesi: ChIP-qPCR ve ChIP-seq
- Gen ifadesi analizi: RT-PCR ve RT-qPCR
- Deneysel kontroller, kalite kontrolü ve yöntemlerin sınırlılıkları

Modül 4 | Epigenomik Yaklaşımlar: Ne Ölçeriz, Neden Kullanırız?
- DNA metilasyon analizlerinin kullanım amaçları
- ChIP-seq ile histon işaretlerinin ve DNA ile ilişkili proteinlerin genom üzerindeki dağılımının incelenmesi
- ATAC-seq ile kromatin erişilebilirliğinin değerlendirilmesi
- RNA-seq ile genom çapında gen ifadesi analizi
- Yöntemlerden elde edilen çıktıların temel mantığı
- Araştırma sorusuna uygun yöntem seçimi ve biyolojik sonuçların yorumlanması

Kimler Katılabilir?
Moleküler biyoloji ve genetik, biyoteknoloji, biyoloji ve sağlık bilimleri alanlarında öğrenim gören öğrenciler; lisansüstü araştırmacılar ve epigenetik ile epigenomik araştırmalara ilgi duyan bilim insanları.

Not: Eğitim, epigenetik ve epigenomik yöntemlerin temel prensiplerini ve kullanım amaçlarını tanıtmaya yöneliktir. Kapsamlı biyoinformatik analiz uygulaması veya laboratuvarda deney gerçekleştirilmesi içermez.`,
    price: "2.500 ₺",
    features: ["4 Saat Canlı Çevrim İçi Eğitim", "28–29 Ekim (20:00-21:00)", "4 Kapsamlı Modül", "Katılım / Başarı Odaklı İçerik"],
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/epigenetik",
  },
  "akademik-yazim-ve-yayin-hazirligi": {
    title: "Akademik Yazım ve Yayın Hazırlığı Eğitimi",
    description: "Bilimsel fikrinizi akademik metne dönüştürün, makale yazımını öğrenin ve TÜBİTAK proje hazırlama sürecini keşfedin!",
    rawContent: `🧬 Akademik Yazım ve Yayın Hazırlığı Eğitimi | 12 Saat
📅 Eğitim Takvimi:
- 24 Ekim 2026: Akademik Yazıma Giriş
- 31 Ekim 2026: Literatür Taraması ve Yapay Zekâ
- 7 Kasım 2026: Makale, Yayın ve TÜBİTAK Proje Yazımı
- 14 Kasım 2026: Uygulamalı Makale Atölyesi
🕐 Saat: Cumartesi günleri, 12.00–15.00
⏱️ Toplam süre: 12 saat
💻 Format: Canlı çevrim içi eğitim

CoreGen Biyoteknoloji tarafından düzenlenen bu uygulamalı eğitimde akademik yazım, literatür taraması, yapay zekânın akademik süreçlerde etik kullanımı, bilimsel makale hazırlama ve TÜBİTAK proje yazımının temel ilkelerini öğreneceksiniz.

Eğitim İçeriği:
Modül 1 | Akademik Yazıma Giriş
- Akademik dil, bilimsel anlatım ve metin oluşturma
- Araştırma sorusu, amaç ve hipotez geliştirme
- Paragraf yapısı, bilimsel argüman ve akademik etik

Modül 2 | Literatür Taraması ve Yapay Zekâ
- PubMed ve Google Scholar ile literatür taraması
- Anahtar kelimeler ve Boolean operatörleri
- Bilimsel kaynakları değerlendirme ve literatür sentezi
- Zotero ile kaynak yönetimi
- Yapay zekânın akademik yazımda etik ve doğru kullanımı

Modül 3 | Makale, Yayın ve TÜBİTAK Proje Yazımı
- Bilimsel makalenin IMRaD yapısı ve temel bölümleri
- Özet, giriş, yöntem, bulgular ve tartışma yazımı
- Dergi seçimi, yayın başvurusu ve hakem değerlendirmesi
- TÜBİTAK projelerinde amaç, özgün değer, yöntem, iş paketleri, zaman planı ve bütçe

Modül 4 | Uygulamalı Makale Atölyesi
- Makale konusu ve taslağının oluşturulması
- Literatürün değerlendirilmesi ve kaynakların kullanılması
- Kısa bilimsel makale yazımı
- Akademik dil, kaynak kontrolü ve geliştirme önerileri
Eğitimin son modülünde katılımcılar, öğrendiklerini uygulayarak kendi kısa bilimsel makale taslaklarını hazırlayacaklardır.

Kimler Katılabilir?
Lisans ve lisansüstü öğrencileri, akademik kariyer hedefleyenler, araştırmacılar ve bilimsel makale ya da TÜBİTAK projesi hazırlama becerilerini geliştirmek isteyen tüm katılımcılar.

Not: Eğitim, akademik yazım ve proje hazırlama becerilerini geliştirmeye yöneliktir; yayın veya proje kabulü garantisi içermez.`,
    price: "3.500 ₺",
    features: ["12 Saat Uygulamalı Canlı Eğitim", "Cumartesi Günleri (12.00–15.00)", "Uygulamalı Makale Atölyesi", "TÜBİTAK Proje Hazırlama Rehberliği"],
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/akademik-yazim",
  },
  "biyoinformatik-101": {
    title: "Biyoinformatik 101 Eğitimi",
    description: "Biyoinformatiğe giriş ve temel veri analizi. NCBI, BLAST ve sekans hizalama yaklaşımlarıyla temel biyoinformatik okuryazarlığı.",
    rawContent: `🧬 Biyoinformatik 101 Eğitimi
📚 Erişim: Satın alma sonrası 7/24
💻 Eğitim: Online – Dijital
⏱️ Eğitim: Kendi hızınızda
🎓 Seviye: Başlangıç
📜 Katılım: Eğitim sonunda katılım sertifikası

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
- Biyoinformatik analizlerde veri kalitesinin önemi

🎯 Eğitim sonunda
Katılımcıların biyoinformatiğin temel çalışma prensiplerini anlaması, DNA, RNA ve protein sekans verilerini temel düzeyde inceleyebilmesi hedeflenmektedir.

Kimler katılabilir?
Biyoloji, moleküler biyoloji ve genetik, biyoteknoloji, biyomühendislik, tıp, veterinerlik, biyokimya, mikrobiyoloji ve ilgili alanlarda öğrenim gören veya çalışanlar katılabilir.`,
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
📜 Katılım: Eğitim sonunda katılım sertifikası

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
- Örnek gen sekansları üzerinden uygulamalı primer tasarımı

🎯 Eğitim sonunda
Katılımcıların bir hedef gen veya DNA bölgesi için PCR'a uygun primer çiftlerini tasarlayabilmesi hedeflenmektedir.

Kimler katılabilir?
Moleküler biyoloji ve genetik, biyoloji, biyoteknoloji, biyokimya, tıp, veterinerlik, biyomühendislik ve ilgili alanlarda öğrenim gören veya çalışanlar katılabilir.`,
    price: "2.500 ₺",
    features: ["Satın alma sonrası 7/24 erişim", "Online – Dijital Eğitim", "Başlangıç / Orta Seviye", "Katılım Sertifikası"],
    shopierUrl: "https://www.shopier.com/CoreGenBiyoteknoloji/46890580",
  }
};

export default function EgitimDetayPage() {
  const params = useParams();
  const id = params.id as string;
  
  const egitim = egitimDetaylari[id as keyof typeof egitimDetaylari] || egitimDetaylari["epigenetik-ve-epigenomik"];

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
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-32">
              <div className="text-center mb-6">
                <p className="text-sm text-slate-500 font-semibold mb-1">Eğitim Ücreti</p>
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
