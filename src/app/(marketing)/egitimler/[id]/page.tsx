"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart, MessageCircle, Users, Calendar, CheckCircle2, CreditCard, ChevronLeft } from "lucide-react";

const noticeText = "Merhaba. Eğitim detaylarımız, WhatsApp grubu linki ve eğitim sınıfı linki 24 saat içerisinde mail adresinizde olacak. Mail ulaşmadığı takdirde spam klasörünüzü kontrol etmeyi ve bizlere mesaj atmanızı rica ederiz. Wp: 0552 220 7270\n\n";

const consultationNotice = "Merhaba, kayıttan sonra randevu gün ve saatini belirlemek için sizlere mesaj gönderilecektir.\n\n";

const egitimDetaylari = {
  "bif-101": {
    title: "BIF101: NGS ve RNA-seq Veri Analizi Eğitim Programı",
    image: "/images/egitimler/bif-101.jpg",
    description: "Ham dizileme verisinden biyolojik yoruma uzanan analiz süreçlerini öğrenin!",
    dateInfo: "25-26-27 Kasım 2026 | 20.00-23.00 (3 gün, 9 saat, uygulamalı eğitim)",
    rawContent: noticeText + `BIF101 | NGS ve RNA-seq Veri Analizi Eğitim Programı
Ham dizileme verisinden biyolojik yoruma uzanan analiz süreçlerini öğrenin!

Eğitim Tarihi: 25-26-27 Kasım 2026 | Saat: 20.00-23.00
Eğitmen: Alperen Göçmen
Süre: 3 gün / toplam 9 saat (Günlük 3 saat, 50 dk ders + 10 dk ara)

1. GÜN | GENETİK VE NGS TEMELLERİ
- Biyoinformatik ve moleküler biyoloji
- DNA, RNA, protein ve gen ekspresyonu
- Sanger ve NGS teknolojileri (Illumina, Nanopore, PacBio)
- Single-end ve paired-end sequencing
- FASTA, FASTQ, SAM, BAM ve VCF formatları
- Phred kalite skoru, Q20 ve Q30

2. GÜN | NGS VERİ ANALİZİ VE KALİTE KONTROL
- FastQC ve kalite kontrol parametreleri
- GC content, adapter contamination ve sequence duplication
- Trimming ve fastp
- MultiQC ile raporlama
- Alignment ve read mapping (STAR ve HISAT2)
- SAM/BAM çıktılarının değerlendirilmesi

3. GÜN | RNA-seq VE GEN EKSPRESYONU
- Bulk RNA-seq ve deneysel tasarım
- Biyolojik replikat ve batch effect
- Count matrix ve featureCounts
- TPM ve DESeq2 normalizasyonu
- PCA analizi, DESeq2 ve edgeR
- log2FC ve adjusted p-value, Volcano plot yorumlama
- GO ve KEGG enrichment

Uygulamalı Çalışmalar: Gerçek FastQC ve MultiQC raporları, diferansiyel ekspresyon tabloları ve volcano plot çıktıları üzerinden değerlendirme ve biyolojik yorumlama çalışmaları yapılacaktır.

CoreGen Biyoteknoloji
Bilimin Işığında, Geleceğin İzindeyiz!`,
    price: "4.000 ₺",
    features: ["25-26-27 Kasım 2026 (20.00-23.00)", "3 Gün / Toplam 9 Saat", "Eğitmen: Alperen Göçmen", "Uygulamalı Canlı Eğitim"],
    paytrUrl: "https://www.paytr.com/link/ppBeqgg",
  },
  "biyoinformatik-101": {
    title: "Biyoinformatik 101: Temel Biyoinformatik ve Veri Tabanları Video Eğitimi",
    image: "/images/egitimler/Biyoinformatik-101.jpeg",
    description: "Biyoinformatiğe giriş ve temel veri analizi. NCBI, BLAST ve sekans hizalama yaklaşımlarıyla temel biyoinformatik okuryazarlığı.",
    dateInfo: "Ömür Boyu 7/24 Dijital Erişim",
    rawContent: noticeText + `Biyoinformatik 101: Temel Biyoinformatik ve Veri Tabanları Eğitimi
Biyoinformatiğe nereden başlayacağınızı bilmiyor musunuz? Diziler nasıl hizalanır? BLAST sonuçları nasıl okunur?

Eğitim Kapsamı:
01 | Biyoinformatik Okuryazarlığı ve Dijital Veri Mimarisi
02 | Küresel Kütüphaneler – Biyolojik Veritabanları
03 | Algoritmik Mantık – Hizalamanın Doğası (Global, Local, Dinamik programlama)
04 | BLAST ve Heuristik Arama (Nucleotide, Protein, Global Align)
05 | Çoklu Dizi Hizalama (MSA) (FASTA, Clustal Omega, MUSCLE, T-Coffee)
06 | Filogenetik Analiz (NGPhylogeny, PhyML uygulamaları)

Elde ettiğiniz biyoinformatik sonuçları yalnızca görmek değil, biyolojik açıdan değerlendirmek ve yorumlamak üzerine odaklanıyoruz.

Dijital Eğitim: Video dersler + uygulama videoları, ömür boyu erişim, kendi hızınızda öğrenme.

CoreGen Biyoteknoloji
Bilimin Işığında, Geleceğin İzindeyiz!`,
    price: "3.500 ₺",
    features: ["Satın alma sonrası 7/24 erişim", "Online – Dijital Video Eğitim", "Teorik + Uygulamalı Analizler", "Katılım Sertifikası"],
    paytrUrl: "https://www.paytr.com/link/DOtkLu9",
  },
  "uygulamali-primer-tasarimi": {
    title: "Uygulamalı Primer Tasarımı Eğitimi",
    image: "/images/egitimler/uygulamali-primer-tasarimi.jpeg",
    description: "PCR için doğru ve özgül primer tasarımının temelleri. Tm, GC oranı, özgüllük ve Primer-BLAST kontrolleri.",
    dateInfo: "Ömür Boyu 7/24 Dijital Erişim",
    rawContent: noticeText + `Uygulamalı Primer Tasarımı Eğitimi
- Primer Nedir? Neden Gereklidir?
- Primer Tasarımında Teknik Noktalar Nelerdir?
- Primer uzunluğu ve spesifiklik ayarları.
- Primer Tasarlama Araçları ve Kullanımı.
- Sipariş Sürecinde Kritik Kontroller.
- Uygulama Örneği.
- Sertifika Projesi: Hedef gen sekansı tasarımı ve raporlama.

CoreGen Biyoteknoloji
Bilimin Işığında, Geleceğin İzindeyiz!`,
    price: "2.500 ₺",
    features: ["Satın alma sonrası 7/24 erişim", "Online – Dijital Eğitim", "Sertifika Projesi Dahil", "Katılım Belgesi"],
    paytrUrl: "https://www.paytr.com/link/gJXUlYO",
  },
  "rekombinant-protein-ve-plazmit-tasarimi": {
    title: "Rekombinant Protein ve Plazmit Tasarımı Eğitimi",
    image: "/images/egitimler/rekombinant-protein-egitimi.jpg",
    description: "Bir proteinin üretimi, doğru genetik tasarımla başlar. Rekombinant protein üretimi ve plazmit tasarımının temelleri.",
    dateInfo: "19-20 Kasım 2026 | 20.00-23.00 (6 saat)",
    rawContent: noticeText + `Rekombinant Protein ve Plazmit Tasarımı Eğitimi
Eğitim Tarihi: 19-20 Kasım 2026 | Saat: 20:00-23:00 (Toplam 6 Saat)

Bir proteinin biyoteknolojik üretimi, doğru genetik tasarımla başlar. Rekombinant DNA teknolojisinin temel prensiplerinden plazmit tasarımına, klonlama stratejilerinden ekspresyon sistemlerine uzanan bu eğitimde, rekombinant protein üretiminin moleküler temellerini öğreneceksiniz.

Eğitim İçeriği:
1. Rekombinant DNA Teknolojisinin Temelleri
2. Plazmit Yapısı ve Tasarımı (Promotör, terminatör, seçici belirteçler, Ori)
3. Klonlama Stratejileri (Restriksiyon enzimleri, gen klonlama)
4. Ekspresyon Sistemleri (Prokaryotik ve ökaryotik sistemler)
5. Rekombinant Protein Üretimi ve Doğrulama

CoreGen Biyoteknoloji
Bilimin Işığında, Geleceğin İzindeyiz!`,
    price: "3.500 ₺",
    features: ["19-20 Kasım 2026 (20:00-23:00)", "Toplam 6 Saat Canlı Eğitim", "Plazmit Tasarım Temelleri", "Katılım Sertifikası"],
    paytrUrl: "https://www.paytr.com/link/8A4zgHl",
  },
  "proje-ve-egitim-danismanligi": {
    title: "Proje ve Bilimsel Danışmanlık",
    image: "/images/egitimler/proje-danismanlik.jpg",
    description: "Akademik ve bilimsel projeleriniz, TÜBİTAK başvurularınız ve özel eğitim yol haritalarınız için birebir profesyonel danışmanlık.",
    dateInfo: "Birebir Görüşme (1 Saat - Randevulu)",
    rawContent: consultationNotice + `Proje ve Bilimsel Araştırma Danışmanlığı – Birebir Görüşme
Bilimsel araştırmalarınızı planlamak, akademik çalışmalarınızı geliştirmek veya projelerinizi daha sistematik bir şekilde yürütmek için uzman desteği alın.

Danışmanlık Kapsamı:
- Bilimsel araştırma konusu ve araştırma sorusunun belirlenmesi
- Literatür tarama stratejisinin oluşturulması
- Makale hazırlama ve bilimsel yazım süreçlerine yönelik danışmanlık
- Yüksek lisans ve doktora tez çalışmalarına yönelik bilimsel rehberlik
- Araştırma projesi geliştirme, planlama ve TÜBİTAK destek programları danışmanlığı
- Deney taslağı, deneysel çalışma planı ve yöntem seçimi
- Veri analizi, istatistiksel değerlendirme, grafik ve tablo yorumlama

Görüşme ve Hizmet Detayları:
- Birebir (1:1) çevrim içi görüşme, her seans 1 saat sürmektedir.

Önemli Bilgilendirme: Bu hizmet bilimsel danışmanlık ve akademik rehberliği kapsar. Tez veya projelerin adınıza yazılması hizmete dahil değildir.

CoreGen Biyoteknoloji
Bilimin Işığında, Geleceğin İzindeyiz!`,
    price: "1.500 ₺",
    features: ["Birebir Görüşme (1'e 1)", "Her Seans 1 Saat", "TÜBİTAK & Proje Desteği", "Uzman Rehberliği"],
    paytrUrl: "https://www.paytr.com/link/j7ivdkf",
  },
  "kariyer-ve-egitim-danismanligi": {
    title: "Kariyer ve Eğitim Danışmanlığı",
    image: "/images/egitimler/kariyer-danismanlik.jpg",
    description: "Biyoteknoloji, moleküler biyoloji ve genetik alanlarında kariyer planlaması, lisansüstü hedef belirleme ve mentorluk desteği.",
    dateInfo: "Birebir Görüşme (1 Saat - Randevulu)",
    rawContent: consultationNotice + `Kariyer ve Eğitim Danışmanlığı – Birebir Görüşme
Kariyer hedeflerinizi belirlemek, akademik yolculuğunuzu planlamak veya yurt dışındaki eğitim fırsatlarını değerlendirmek için profesyonel danışmanlık desteği alın.

Danışmanlık Kapsamı:
- Kariyer planlama ve profesyonel yönlendirme
- CV hazırlama, düzenleme ve geliştirme
- Akademik kariyer planlaması, yüksek lisans ve doktora süreçleri
- Yurt dışı üniversite, eğitim programları, burs ve akademik fırsatların araştırılması
- Niyet mektubu (Motivation Letter) hazırlama desteği

Görüşme ve Hizmet Detayları:
- Birebir (1:1) çevrim içi görüşme, her seans 1 saat sürmektedir.

CoreGen Biyoteknoloji
Bilimin Işığında, Geleceğin İzindeyiz!`,
    price: "1.000 ₺",
    features: ["Birebir Görüşme (1'e 1)", "Her Seans 1 Saat", "CV & Kariyer Planlaması", "Yurt Dışı Eğitim Rehberliği"],
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
                {egitim.dateInfo}
              </span>

              <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-100 font-bold">
                  <Users className="w-4 h-4" /> Kontenjan Dolmak Üzere!
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-xl font-semibold">
                  <Calendar className="w-4 h-4 text-blue-500" /> {egitim.dateInfo}
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Ürün Açıklaması & Detaylar</h3>
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
