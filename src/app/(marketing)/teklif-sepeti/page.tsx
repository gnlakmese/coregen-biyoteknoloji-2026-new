"use client";

import { useState } from "react";
import { useQuoteCart } from "@/components/quote/quote-cart-context";
import Link from "next/link";
import Image from "next/image";
import { Send, CheckCircle2, ArrowLeft, Building, User, Mail, Phone, FileText, ReceiptText, Wrench, Package, CheckSquare, Square, Upload, Info, MessageSquare } from "lucide-react";

const ALL_SERVICES_40 = [
  { id: "1", name: "1. Nükleik Asit ve Protein İzolasyonu" },
  { id: "2", name: "2. Primer ve Oligonükleotid Tasarımı ve Sentezi" },
  { id: "3", name: "3. Jel Elektroforezi" },
  { id: "4", name: "4. Nükleik Asitlerde Miktar Tayini" },
  { id: "5", name: "5. PCR Analizi" },
  { id: "6", name: "6. Gerçek Zamanlı PCR (RT-PCR / qPCR)" },
  { id: "7", name: "7. Sanger Dizileme" },
  { id: "8", name: "8. Whole Genome Sequencing (WGS)" },
  { id: "9", name: "9. Whole Exome Sequencing (WES)" },
  { id: "10", name: "10. Targeted Sequencing" },
  { id: "11", name: "11. Transkriptom Analizi (RNA-Seq)" },
  { id: "12", name: "12. Shotgun Metagenomics" },
  { id: "13", name: "13. 16S rRNA Analizi" },
  { id: "14", name: "14. Western Blot Analizi" },
  { id: "15", name: "15. ELISA Analizi" },
  { id: "16", name: "16. Rekombinant Protein Analizi" },
  { id: "17", name: "17. NGS Veri Analizi" },
  { id: "18", name: "18. RNA-Seq Analizi" },
  { id: "19", name: "19. Diferansiyel Gen Ekspresyonu" },
  { id: "20", name: "20. Varyant Analizi" },
  { id: "21", name: "21. Filogenetik Analiz" },
  { id: "22", name: "22. Metagenomik Veri Analizi" },
  { id: "23", name: "23. Proje Danışmanlığı" },
  { id: "24", name: "24. Yerinde Hizmet Modülü" },
  { id: "25", name: "25. Kurumsal ve Akademik Eğitimler" },
  { id: "26", name: "26. Deney Tasarımı" },
  { id: "27", name: "27. İstatistiksel Analiz" },
  { id: "28", name: "28. Bilimsel Raporlama" },
  { id: "29", name: "29. Yayın Danışmanlığı" },
  { id: "30", name: "30. Oksidatif Stres Analizleri" },
  { id: "31", name: "31. Biyokimya Test Analizleri" },
  { id: "32", name: "32. Spesifik Test Analizleri" },
  { id: "33", name: "33. ELISA Test Analizleri" },
  { id: "34", name: "34. İmmünohistokimya (IHC) Boyama" },
  { id: "35", name: "35. İlaç Geliştirme ve Toksisite Testleri" },
  { id: "36", name: "36. Hücre Kültürü Tabanlı ELISA Uygulamaları" },
  { id: "37", name: "37. Proliferasyon ve Migrasyon (Yara İyileşmesi) Deneyleri" },
  { id: "38", name: "38. Genetik Mühendisliği ve Transfeksiyon Teknolojileri" },
  { id: "39", name: "39. Kök Hücre Teknolojileri" },
  { id: "40", name: "BİLGİ ALMAK İSTİYORUM" },
];

export default function TeklifSepetiPage() {
  const { items, clearCart } = useQuoteCart();
  const [submitted, setSubmitted] = useState(false);

  const [aktifForm, setAktifForm] = useState<"hizmet" | "sarf" | null>(null);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [serviceDetails, setServiceDetails] = useState<Record<string, Record<string, any>>>({});

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    kurum: "",
    departman: "",
    email: "",
    telefon: "",
    biyoguvenlikRiski: "yok",
    biyoguvenlikAciklama: "",
    tcVkn: "",
    faturaAdresi: "",
    amaci: "",
    aciklama: "",
  });

  const [sarfFormData, setSarfFormData] = useState({
    ad: "",
    soyad: "",
    kurum: "",
    departman: "",
    email: "",
    telefon: "",
    tcVkn: "",
    faturaAdresi: "",
    urunAdi: "",
    markasi: "",
    katalogKodu: "",
    miktari: "",
    reaksiyonOrnek: "",
    notlar: "",
  });

  const toggleServiceSelection = (id: string) => {
    setSelectedServiceIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDetailChange = (serviceId: string, field: string, value: any) => {
    setServiceDetails(prev => ({
      ...prev,
      [serviceId]: {
        ...(prev[serviceId] || {}),
        [field]: value
      }
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSarfChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSarfFormData({ ...sarfFormData, [e.target.name]: e.target.value });
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServiceIds.length === 0) {
      alert("Lütfen en az bir hizmet seçiniz.");
      return;
    }

    const secilenHizmetlerMetin = selectedServiceIds.map((id, index) => {
      const s = ALL_SERVICES_40.find(item => item.id === id);
      const details = serviceDetails[id] ? JSON.stringify(serviceDetails[id]) : "";
      return `${index + 1}. ${s?.name} ${details ? `(Detaylar: ${details})` : ""}`;
    }).join("\n");

    const mesaj = `🔬 *YENİ LABORATUVAR HİZMET TEKLİf TALEBİ*\n\n` +
      `👤 *Ad Soyad:* ${formData.ad} ${formData.soyad}\n` +
      `🏢 *Kurum/Departman:* ${formData.kurum} / ${formData.departman}\n` +
      `📧 *E-posta:* ${formData.email}\n` +
      `📞 *Telefon:* ${formData.telefon}\n` +
      `🧪 *Biyogüvenlik Riski:* ${formData.biyoguvenlikRiski === "var" ? "Evet (" + formData.biyoguvenlikAciklama + ")" : "Yok"}\n` +
      `🎯 *Çalışmanın Amacı:* ${formData.amaci || "Belirtilmedi"}\n` +
      `📝 *Açıklama:* ${formData.aciklama || "Belirtilmedi"}\n` +
      `🧾 *Fatura VKN/TC & Adres:* ${formData.tcVkn} - ${formData.faturaAdresi}\n\n` +
      `📋 *Seçilen Hizmetler ve Analizler:*\n${secilenHizmetlerMetin}\n\n` +
      `🛒 *Ürün Sepetindeki Ekstra Ürünler:* ${items.length > 0 ? items.map(i => i.name).join(", ") : "Yok"}`;

    const encodedMessage = encodeURIComponent(mesaj);
    window.open(`https://wa.me/905522207270?text=${encodedMessage}`, "_blank");
    
    setSubmitted(true);
    clearCart();
  };

  const handleSubmitSarfQuote = (e: React.FormEvent) => {
    e.preventDefault();

    const mesaj = `📦 *YENİ SARF MALZEME / CİHAZ TALEBİ*\n\n` +
      `👤 *Ad Soyad:* ${sarfFormData.ad} ${sarfFormData.soyad}\n` +
      `🏢 *Kurum/Departman:* ${sarfFormData.kurum} / ${sarfFormData.departman}\n` +
      `📧 *E-posta:* ${sarfFormData.email}\n` +
      `📞 *Telefon:* ${sarfFormData.telefon}\n\n` +
      `📦 *Ürün/Cihaz Adı:* ${sarfFormData.urunAdi}\n` +
      `🏷️ *Markası:* ${sarfFormData.markasi}\n` +
      `🔢 *Katalog Kodu:* ${sarfFormData.katalogKodu}\n` +
      `📊 *Miktarı:* ${sarfFormData.miktari}\n` +
      `🧪 *Reaksiyon/Örnek:* ${sarfFormData.reaksiyonOrnek || "Belirtilmedi"}\n` +
      `🧾 *Fatura VKN/TC & Adres:* ${sarfFormData.tcVkn} - ${sarfFormData.faturaAdresi}\n` +
      `📝 *Notlar:* ${sarfFormData.notlar || "Yok"}`;

    const encodedMessage = encodeURIComponent(mesaj);
    window.open(`https://wa.me/905522207270?text=${encodedMessage}`, "_blank");

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 flex items-center justify-center px-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-10 max-w-lg w-full text-center shadow-sm space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Talebiniz WhatsApp'a Aktarıldı!</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Form detaylarınız hazırlandı ve WhatsApp üzerinden ekibimize iletildi. En kısa sürede sizinle iletişime geçilecektir.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-24 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {aktifForm === null ? (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-wider font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                Teklif ve Talep Merkezi
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">Talep Türünü Seçin</h1>
              <p className="text-sm text-gray-500">
                Laboratuvar hizmetleri için sepetinizi oluşturun ya da sarf malzeme ve cihaz talebi için formu doldurun.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
              
              <div
                onClick={() => setAktifForm("hizmet")}
                className="bg-white border-2 border-gray-100 hover:border-pink-500 rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col items-center justify-between group aspect-square"
              >
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden shadow-md mb-4 border border-gray-100">
                  <Image
                    src="/form-görsel/lab-hizmet-form.jpg"
                    alt="Laboratuvar Hizmet Talep Formu"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-extrabold text-gray-900 group-hover:text-pink-600 transition-colors">
                    Laboratuvar Hizmet Talebi
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed px-4">
                    Dizileme, PCR, Western Blot, Biyoinformatik ve diğer tüm bilimsel analiz hizmetlerimiz için teklif isteyin.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 pt-2">
                  Hizmet Talep Formunu Aç →
                </span>
              </div>

              <div
                onClick={() => setAktifForm("sarf")}
                className="bg-white border-2 border-gray-100 hover:border-cyan-500 rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col items-center justify-between group aspect-square"
              >
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden shadow-md mb-4 border border-gray-100">
                  <Image
                    src="/form-görsel/lab-sarf-cihaz-form.jpg"
                    alt="Sarf Malzeme ve Cihaz Talep Formu"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-extrabold text-gray-900 group-hover:text-cyan-700 transition-colors">
                    Sarf Malzeme ve Cihaz Talebi
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed px-4">
                    Laboratuvarınız için ihtiyaç duyduğunuz sarf malzemeleri, kitler ve cihazlar için katalog kodlu hızlı teklif isteyin.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 pt-2">
                  Talep Formunu Aç →
                </span>
              </div>

            </div>
          </div>
        ) : (

          <div>
            <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
              <button
                type="button"
                onClick={() => setAktifForm(null)}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Talep Türü Seçimine Geri Dön
              </button>
            </div>

            {aktifForm === "sarf" ? (
              <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-sm max-w-5xl mx-auto">
                <div className="mb-6 border-b border-gray-100 pb-4">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                    Ürün & Cihaz Tedariği
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">Sarf Malzeme ve Cihaz Talep Formu</h2>
                  <p className="text-xs text-gray-500 mt-1">Aradığınız ürünün kodunu, markasını ve miktarını belirterek WhatsApp üzerinden hızlıca teklif isteyin.</p>
                </div>

                <form onSubmit={handleSubmitSarfQuote} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">Ad <span className="text-cyan-600">*</span></label>
                      <input
                        type="text"
                        name="ad"
                        required
                        placeholder="Adınız"
                        value={sarfFormData.ad}
                        onChange={handleSarfChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">Soyad <span className="text-cyan-600">*</span></label>
                      <input
                        type="text"
                        name="soyad"
                        required
                        placeholder="Soyadınız"
                        value={sarfFormData.soyad}
                        onChange={handleSarfChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">Kurum / Kuruluş <span className="text-cyan-600">*</span></label>
                      <input
                        type="text"
                        name="kurum"
                        required
                        placeholder="Üniversite, Hastane veya Şirket Adı"
                        value={sarfFormData.kurum}
                        onChange={handleSarfChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">Departman / Anabilim Dalı <span className="text-cyan-600">*</span></label>
                      <input
                        type="text"
                        name="departman"
                        required
                        placeholder="Örn: Biyoloji Bölümü / AR-GE"
                        value={sarfFormData.departman}
                        onChange={handleSarfChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">E-posta Adresi <span className="text-cyan-600">*</span></label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="ornek@kurum.edu.tr"
                        value={sarfFormData.email}
                        onChange={handleSarfChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">Telefon Numarası <span className="text-cyan-600">*</span></label>
                      <input
                        type="tel"
                        name="telefon"
                        required
                        placeholder="05XX XXX XX XX"
                        value={sarfFormData.telefon}
                        onChange={handleSarfChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="bg-cyan-50/50 border border-cyan-100 rounded-2xl p-5 space-y-4 mt-2">
                    <h3 className="font-bold text-xs text-cyan-900 flex items-center gap-1.5 uppercase tracking-wider">
                      <Package className="w-4 h-4 text-cyan-700" /> Talep Edilen Ürün / Cihaz Detayları
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Ürün / Cihaz Adı <span className="text-cyan-600">*</span></label>
                        <input
                          type="text"
                          name="urunAdi"
                          required
                          placeholder="Örn: Pipet Ucu / Termosiklör"
                          value={sarfFormData.urunAdi}
                          onChange={handleSarfChange}
                          className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Markası <span className="text-cyan-600">*</span></label>
                        <input
                          type="text"
                          name="markasi"
                          required
                          placeholder="Örn: Eppendorf / Merck"
                          value={sarfFormData.markasi}
                          onChange={handleSarfChange}
                          className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Katalog Numarası <span className="text-cyan-600">*</span></label>
                        <input
                          type="text"
                          name="katalogKodu"
                          required
                          placeholder="Ürün Katalog Kodu"
                          value={sarfFormData.katalogKodu}
                          onChange={handleSarfChange}
                          className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Kaç Adet / Miktar <span className="text-cyan-600">*</span></label>
                        <input
                          type="text"
                          name="miktari"
                          required
                          placeholder="Örn: 5 Kutu / 1 Adet"
                          value={sarfFormData.miktari}
                          onChange={handleSarfChange}
                          className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Kaç Reaksiyon / Örnek</label>
                        <input
                          type="text"
                          name="reaksiyonOrnek"
                          placeholder="Örn: 250 Reaksiyon"
                          value={sarfFormData.reaksiyonOrnek}
                          onChange={handleSarfChange}
                          className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                    <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5 uppercase tracking-wider">
                      <ReceiptText className="w-4 h-4 text-cyan-700" /> Fatura Bilgileri
                    </h3>
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">TC Kimlik No / Vergi No <span className="text-cyan-600">*</span></label>
                      <input
                        type="text"
                        name="tcVkn"
                        required
                        placeholder="TCKN veya Vergi Numarası"
                        value={sarfFormData.tcVkn}
                        onChange={handleSarfChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">Fatura Adresi <span className="text-cyan-600">*</span></label>
                      <textarea
                        name="faturaAdresi"
                        required
                        rows={2}
                        placeholder="Açık fatura adresi..."
                        value={sarfFormData.faturaAdresi}
                        onChange={handleSarfChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-6 rounded-xl text-sm transition-all shadow-md"
                    >
                      <MessageSquare className="w-5 h-5" /> WhatsApp ile Sarf / Cihaz Talebi Gönder
                    </button>
                  </div>
                </form>
              </div>
            ) : (

              <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-sm max-w-5xl mx-auto space-y-8">
                
                <div className="border-b border-gray-100 pb-4">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                    Laboratuvar Analizleri
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">Laboratuvar Hizmet Talep Formu</h2>
                  <p className="text-xs text-gray-500 mt-1">Lütfen talebinize uygun hizmetleri aşağıdan seçin, detayları doldurun ve WhatsApp ile doğrudan teklif isteyin.</p>
                </div>

                <form onSubmit={handleSubmitQuote} className="space-y-8">
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5 uppercase tracking-wider border-b pb-2">
                      <Wrench className="w-4 h-4 text-pink-600" /> Talep Edilen Hizmetler ve Analizler <span className="text-pink-600">*</span>
                    </h3>
                    <p className="text-xs text-gray-500">Çalışmanız için gerekli olan hizmetleri aşağıdan işaretleyin.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 p-3 rounded-2xl bg-gray-50/50 border border-gray-100">
                      {ALL_SERVICES_40.map((srv) => {
                        const isSelected = selectedServiceIds.includes(srv.id);
                        return (
                          <div
                            key={srv.id}
                            onClick={() => toggleServiceSelection(srv.id)}
                            className={`flex items-start gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                              isSelected 
                                ? "bg-pink-50 border-pink-500 shadow-sm" 
                                : "bg-white border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="mt-0.5 text-pink-600 shrink-0">
                              {isSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5 text-gray-400" />}
                            </div>
                            <div className="min-w-0">
                              <span className={`text-[10px] font-normal leading-tight block mt-0.5 ${isSelected ? "text-pink-900 font-medium" : "text-gray-700"}`}>
                                {srv.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {selectedServiceIds.length > 0 && (
                    <div className="space-y-4 bg-pink-50/30 border border-pink-100 rounded-2xl p-6">
                      <h3 className="font-bold text-xs text-pink-900 uppercase tracking-wider border-b border-pink-100 pb-2">
                        Seçilen Hizmetlere Ait Özel Detaylar
                      </h3>

                      <div className="space-y-6">
                        {selectedServiceIds.map((id) => {
                          const srv = ALL_SERVICES_40.find(item => item.id === id);
                          const d = serviceDetails[id] || {};

                          return (
                            <div key={id} className="bg-white border border-pink-200 rounded-2xl p-5 space-y-4 shadow-sm">
                              <h4 className="text-xs font-bold text-pink-700 flex items-center gap-2 border-b pb-2">
                                <span className="w-2 h-2 rounded-full bg-pink-600" /> {srv?.name}
                              </h4>

                              {id === "40" && (
                                <div className="space-y-4 text-xs">
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Bilgi Almak İstediğiniz Konu / Kapsam:</label>
                                    <input type="text" placeholder="Örn: Fiyatlandırma, süreç veya teknik detaylar hakkında..." value={d.bilgiKonu || ""} onChange={e => handleDetailChange(id, "bilgiKonu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" />
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Detaylı Sorunuz veya Mesajınız:</label>
                                    <textarea rows={3} placeholder="Merak ettiğiniz hususları detaylıca yazabilirsiniz..." value={d.bilgiMesaj || ""} onChange={e => handleDetailChange(id, "bilgiMesaj", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" />
                                  </div>
                                </div>
                              )}

                              {/* Diğer hizmet detay alanları */}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pt-2">
                    <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5 uppercase tracking-wider border-b pb-2">
                      <Building className="w-4 h-4 text-pink-600" /> Kurumsal & İletişim Bilgileri
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Ad <span className="text-pink-600">*</span></label>
                        <input
                          type="text"
                          name="ad"
                          required
                          placeholder="Adınız"
                          value={formData.ad}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Soyad <span className="text-pink-600">*</span></label>
                        <input
                          type="text"
                          name="soyad"
                          required
                          placeholder="Soyadınız"
                          value={formData.soyad}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Kurum / Kuruluş <span className="text-pink-600">*</span></label>
                        <input
                          type="text"
                          name="kurum"
                          required
                          placeholder="Üniversite, Hastane veya Şirket Adı"
                          value={formData.kurum}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Departman / Anabilim Dalı <span className="text-pink-600">*</span></label>
                        <input
                          type="text"
                          name="departman"
                          required
                          placeholder="Örn: Tıbbi Genetik / Ar-Ge"
                          value={formData.departman}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">E-posta Adresi <span className="text-pink-600">*</span></label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="ornek@kurum.edu.tr"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Telefon Numarası <span className="text-pink-600">*</span></label>
                        <input
                          type="tel"
                          name="telefon"
                          required
                          placeholder="05XX XXX XX XX"
                          value={formData.telefon}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all shadow-md"
                    >
                      <MessageSquare className="w-5 h-5" /> WhatsApp ile Hizmet Teklif Talebini Gönder
                    </button>
                  </div>
                </form>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
