"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useProductQuoteCart, ProductCartPanel, formatProductItems, saveQuoteDraft } from "@/components/quote/product-quote-cart";

const ALL_SERVICES = [
  "Nükleik Asit ve Protein İzolasyonu", "Primer / Prob Tasarımı", "Jel Elektroforezi", "NanoDrop / Qubit Miktar Tayini",
  "PCR Analizi", "qPCR / RT-qPCR", "Sanger Dizileme", "WGS / WES / Targeted Sequencing", "RNA-Seq", 
  "Shotgun Metagenomics", "16S rRNA Analizi", "Western Blot", "ELISA", "Rekombinant Protein", 
  "Biyoinformatik Hizmetleri", "Oksidatif Stres / Biyokimya / Spesifik Testler", "İmmünohistokimya (IHC)", 
  "Hücre Kültürü Analizleri", "Proje Danışmanlığı", "Yerinde Hizmet", "Eğitim Hizmetleri", 
  "Deney Tasarımı", "İstatistiksel Analiz", "Bilimsel Raporlama / Yayın Danışmanlığı"
];

export default function TeklifFormPage() {
  const { items } = useProductQuoteCart();
  const [preparedUrl, setPreparedUrl] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Form input state'leri
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    unvan: "",
    kurum: "",
    departman: "",
    telefon: "",
    email: "",
    city: "",
    faturaBilgileri: "",
    notlar: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0 && items.length === 0) {
      alert("Lütfen en az bir hizmet seçin veya sepete ürün ekleyin.");
      return;
    }
    setLoading(true);
    const message = [
      "*COREGEN TEKLİF TALEBİ*",
      `Ad Soyad: ${formData.unvan} ${formData.ad} ${formData.soyad}`.trim(),
      `Kurum: ${formData.kurum}`, `Departman: ${formData.departman}`,
      `Telefon: ${formData.telefon}`, `E-posta: ${formData.email}`, `Şehir: ${formData.city}`,
      `Fatura Bilgileri: ${formData.faturaBilgileri || "Belirtilmedi"}`,
      `Notlar: ${formData.notlar || "Yok"}`,
      "", "*Ürünler:*", formatProductItems(items),
      "", "*Hizmetler:*", selectedServices.join("\n") || "Yok",
    ].join("\n");
    const url = saveQuoteDraft(message);
    setPreparedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24 text-slate-800">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 bg-pink-50 px-4 py-2 rounded-full mb-6 border border-pink-100">
            Laboratuvar & Analiz Platformu
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Kapsamlı Teklif Sepeti
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Araştırma projeleriniz için en uygun yöntemi ve fiyatlandırmayı belirleyebilmemiz için lütfen aşağıdaki detaylı formu doldurun.
          </p>
        </div>

        <ProductCartPanel />
        {preparedUrl && <div role="status" className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <p>Mesajınız hazır. Talebinizi iletmek için WhatsApp’ta Gönder düğmesine basın. Sepetiniz korunur.</p>
          <a href={preparedUrl} target="_blank" rel="noopener noreferrer" className="block font-bold text-pink-600 hover:underline">WhatsApp’ı Aç / Yeniden Dene</a>
          <Link href="/teklif-sepeti/onay?kanal=whatsapp" className="block text-sm text-slate-600 hover:underline">Talep Sonraki Adımı →</Link>
        </div>}
        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* BÖLÜM 1: ORTAK MÜŞTERİ BİLGİLERİ */}
