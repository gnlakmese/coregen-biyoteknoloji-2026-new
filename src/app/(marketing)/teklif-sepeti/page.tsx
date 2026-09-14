"use client";

import { useState } from "react";
import { useQuoteCart } from "@/components/quote/quote-cart-context";
import Link from "next/link";
import Image from "next/image";
import { Send, CheckCircle2, ArrowLeft, Building, User, Mail, Phone, FileText, ReceiptText, Wrench, Package, CheckSquare, Square, Upload, Info } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

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
    amaci: "",       // Eksik olduğu için eklendi
    aciklama: "",    // Eksik olduğu için eklendi
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

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedServicesData = selectedServiceIds.map(id => {
        const s = ALL_SERVICES_40.find(item => item.id === id);
        return {
          id,
          name: s?.name,
          details: serviceDetails[id] || {}
        };
      });

      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          selectedServices: selectedServicesData, 
          items, 
          talepTuru: selectedServiceIds.includes("40") ? "bilgi-alma" : "hizmet" 
        }),
      });

      if (!response.ok) throw new Error("Teklif kaydedilemedi.");

      setLoading(false);
      setSubmitted(true);
      clearCart();
    } catch (error) {
      console.error("Hata:", error);
      alert("Teklif gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  const handleSubmitSarfQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...sarfFormData, talepTuru: "sarf-malzeme-cihaz" }),
      });

      if (!response.ok) throw new Error("Talep kaydedilemedi.");

      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Hata:", error);
      alert("Talep gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 flex items-center justify-center px-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-10 max-w-lg w-full text-center shadow-sm space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Talebiniz Başarıyla Alındı!</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Bilgileriniz ve talep ettiğiniz detaylar veritabanımıza kaydedilmiştir. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.
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
                    src="/form-gorselleri/lab-hizmet-form.jpg"
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
                    src="/form-gorselleri/lab-sarf-cihaz-form.jpg"
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
                  <p className="text-xs text-gray-500 mt-1">Aradığınız ürünün kodunu, markasını ve miktarını belirterek doğrudan teklif isteyin.</p>
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
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md disabled:opacity-50"
                    >
                      {loading ? "Gönderiliyor..." : "Sarf Malzeme / Cihaz Talebini Gönder"}
                      <Send className="w-4 h-4" />
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
                  <p className="text-xs text-gray-500 mt-1">Lütfen talebinize uygun hizmetleri aşağıdan seçin ve açılan özel soruları yanıtlayın.</p>
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

                              {id === "1" && (
                                <div className="space-y-4 text-xs">
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1.5">İzole Edilecek Materyal:</label>
                                    <div className="flex flex-wrap gap-4">{["DNA", "RNA", "miRNA", "Protein", "Diğer"].map(m => <label key={m} className="flex items-center gap-1.5 cursor-pointer text-gray-600"><input type="radio" name={`mat-${id}`} checked={d.materyal === m} onChange={() => handleDetailChange(id, "materyal", m)} /> {m}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü / Organizma:</label><input type="text" value={d.numuneTuruOrg || ""} onChange={e => handleDetailChange(id, "numuneTuruOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Her Numunenin Yaklaşık Miktarı/Hacmi:</label><input type="text" value={d.miktarHacim || ""} onChange={e => handleDetailChange(id, "miktarHacim", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1.5">Numunelerin Mevcut Durumu:</label>
                                    <div className="flex flex-wrap gap-3">{["Taze", "-20°C", "-80°C", "Fiksatif içinde", "Diğer"].map(dur => <label key={dur} className="flex items-center gap-1.5 cursor-pointer text-gray-600"><input type="radio" name={`durum-${id}`} checked={d.mevcutDurum === dur} onChange={() => handleDetailChange(id, "mevcutDurum", dur)} /> {dur}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1.5">İzolasyon Sonrası Kullanım Amacı:</label>
                                    <div className="flex flex-wrap gap-3">{["PCR", "qPCR", "NGS", "Western Blot", "Diğer"].map(amac => <label key={amac} className="flex items-center gap-1.5 cursor-pointer text-gray-600"><input type="radio" name={`amac-${id}`} checked={d.kullanimAmaci === amac} onChange={() => handleDetailChange(id, "kullanimAmaci", amac)} /> {amac}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1.5">Ek Kalite Kontrol Talebi:</label>
                                    <div className="flex flex-wrap gap-3">{["NanoDrop", "Qubit", "Jel Kontrolü", "Diğer"].map(kq => <label key={kq} className="flex items-center gap-1.5 cursor-pointer text-gray-600"><input type="radio" name={`kq-${id}`} checked={d.kaliteKontrol === kq} onChange={() => handleDetailChange(id, "kaliteKontrol", kq)} /> {kq}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "2" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.org || ""} onChange={e => handleDetailChange(id, "org", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Hedef Gen / Bölge:</label><input type="text" value={d.hedefGen || ""} onChange={e => handleDetailChange(id, "hedefGen", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Gene ID / Accession No / Referans Dizi (varsa):</label><input type="text" value={d.geneId || ""} onChange={e => handleDetailChange(id, "geneId", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Kullanım Amacı:</label>
                                    <div className="flex flex-wrap gap-3">{["PCR", "qPCR", "Sekanslama", "Klonlama", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ka-${id}`} checked={d.kullanimAmaci === x} onChange={() => handleDetailChange(id, "kullanimAmaci", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Primer Tasarımı:</label>
                                    <div className="flex gap-4">{["Evet", "Hayır, diziler mevcut"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`pt-${id}`} checked={d.primerTasarimi === x} onChange={() => handleDetailChange(id, "primerTasarimi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Primer Dizileri (mevcutsa):</label><input type="text" value={d.primerDizileri || ""} onChange={e => handleDetailChange(id, "primerDizileri", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Probe Talebi:</label>
                                    <div className="flex gap-4">{["Evet", "Hayır"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`probe-${id}`} checked={d.probeTalebi === x} onChange={() => handleDetailChange(id, "probeTalebi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Primer/Oligo Sentezi:</label>
                                    <div className="flex gap-4">{["Evet", "Hayır"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`sentez-${id}`} checked={d.oligoSentezi === x} onChange={() => handleDetailChange(id, "oligoSentezi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "3" && (
                                <div className="space-y-3 text-xs">
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Analiz Edilecek Materyal:</label>
                                    <div className="flex gap-4">{["DNA", "RNA", "Protein"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`mat-${id}`} checked={d.materyal === x} onChange={() => handleDetailChange(id, "materyal", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Beklenen Bant / Ürün Boyutu:</label><input type="text" value={d.bantBoyutu || ""} onChange={e => handleDetailChange(id, "bantBoyutu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Jel Tipi:</label>
                                    <div className="flex gap-4">{["Agaroz", "PAGE", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`jel-${id}`} checked={d.jelTipi === x} onChange={() => handleDetailChange(id, "jelTipi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Görüntüleme Talebi:</label>
                                    <div className="flex gap-4">{["Evet", "Hayır"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`goruntuleme-${id}`} checked={d.goruntuleme === x} onChange={() => handleDetailChange(id, "goruntuleme", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Ek Talep:</label>
                                    <div className="flex gap-4">{["Bant Kesimi", "Bant Saflaştırma", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ektalep-${id}`} checked={d.ekTalep === x} onChange={() => handleDetailChange(id, "ekTalep", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "4" && (
                                <div className="space-y-3 text-xs">
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Ölçülecek Materyal:</label>
                                    <div className="flex gap-4">{["DNA", "RNA", "Protein"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`mat-${id}`} checked={d.materyal === x} onChange={() => handleDetailChange(id, "materyal", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Her Numunenin Yaklaşık Hacmi:</label><input type="text" value={d.hacim || ""} onChange={e => handleDetailChange(id, "hacim", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Ölçüm:</label>
                                    <div className="flex gap-4">{["NanoDrop", "Qubit", "Her İkisi"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`olcum-${id}`} checked={d.istenilenOlcum === x} onChange={() => handleDetailChange(id, "istenilenOlcum", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Sonuç:</label>
                                    <div className="flex gap-4">{["Konsantrasyon", "Saflık Değerlendirmesi", "Her İkisi"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`sonuc-${id}`} checked={d.talepEdilenSonuc === x} onChange={() => handleDetailChange(id, "talepEdilenSonuc", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "5" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Hedef Gen / Bölge:</label><input type="text" value={d.hedefGen || ""} onChange={e => handleDetailChange(id, "hedefGen", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Primer Durumu:</label>
                                    <div className="flex gap-4">{["Mevcut", "Tasarlanacak"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`pcr-durum-${id}`} checked={d.primerDurumu === x} onChange={() => handleDetailChange(id, "primerDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Primer Dizileri (mevcutsa):</label><input type="text" value={d.primerDizileri || ""} onChange={e => handleDetailChange(id, "primerDizileri", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Beklenen PCR Ürün Boyutu (varsa):</label><input type="text" value={d.urunBoyutu || ""} onChange={e => handleDetailChange(id, "urunBoyutu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Ek Talep:</label>
                                    <div className="flex gap-4">{["Jel Görüntüleme", "PCR Ürünü Saflaştırma", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`pcr-ek-${id}`} checked={d.ekTalep === x} onChange={() => handleDetailChange(id, "ekTalep", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "6" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Genler:</label><input type="text" value={d.calisilicakGenler || ""} onChange={e => handleDetailChange(id, "calisilicakGenler", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Analiz Türü:</label>
                                    <div className="flex flex-wrap gap-3">{["mRNA", "miRNA", "DNA", "SNP", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`at-${id}`} checked={d.analizTuru === x} onChange={() => handleDetailChange(id, "analizTuru", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Primer/Probe Durumu:</label>
                                    <div className="flex gap-4">{["Mevcut", "Tasarlanacak"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`pp-${id}`} checked={d.primerProbeDurumu === x} onChange={() => handleDetailChange(id, "primerProbeDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Referans / Housekeeping Gen (varsa):</label><input type="text" value={d.referansGen || ""} onChange={e => handleDetailChange(id, "referansGen", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Sistemi:</label>
                                    <div className="flex gap-4">{["SYBR Green", "TaqMan / Prob", "Belirtilmedi"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cs-${id}`} checked={d.calismaSistemi === x} onChange={() => handleDetailChange(id, "calismaSistemi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Ct Değerleri", "ΔΔCt / Fold Change", "İstatistiksel Analiz ve Grafik"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ia-${id}`} checked={d.istenenAnaliz === x} onChange={() => handleDetailChange(id, "istenenAnaliz", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "7" && (
                                <div className="space-y-3 text-xs">
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Numune Türü:</label>
                                    <div className="flex gap-4">{["PCR Ürünü", "Plazmit", "Saf DNA"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`st-${id}`} checked={d.numuneTuru === x} onChange={() => handleDetailChange(id, "numuneTuru", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Primer Durumu:</label>
                                    <div className="flex gap-4">{["Mevcut", "Tasarlanacak"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`spd-${id}`} checked={d.primerDurumu === x} onChange={() => handleDetailChange(id, "primerDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Primer Dizisi:</label><input type="text" value={d.primerDizisi || ""} onChange={e => handleDetailChange(id, "primerDizisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Dizileme Yönü:</label>
                                    <div className="flex gap-4">{["Tek Yönlü", "Çift Yönlü"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`dy-${id}`} checked={d.dizilemeYonü === x} onChange={() => handleDetailChange(id, "dizilemeYonü", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Referans Dizi (varsa):</label><input type="text" value={d.referansDizi || ""} onChange={e => handleDetailChange(id, "referansDizi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Ek Analiz:</label>
                                    <div className="flex gap-4">{["Referans ile Karşılaştırma", "Sadece Ham Sekans Verisi"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ea-${id}`} checked={d.ekAnaliz === x} onChange={() => handleDetailChange(id, "ekAnaliz", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "8" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">DNA Durumu:</label>
                                    <div className="flex gap-4">{["Hazır", "İzolasyon Gerekli"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`dna-${id}`} checked={d.dnaDurumu === x} onChange={() => handleDetailChange(id, "dnaDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışmanın Amacı:</label>
                                    <div className="flex flex-wrap gap-3">{["Varyant Analizi", "De Novo Assembly", "Karşılaştırmalı Genom Analizi", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ca-${id}`} checked={d.calismaAmaci === x} onChange={() => handleDetailChange(id, "calismaAmaci", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Referans Genom / Versiyon (varsa):</label><input type="text" value={d.referansGenom || ""} onChange={e => handleDetailChange(id, "referansGenom", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">İstenen Coverage (varsa):</label><input type="text" value={d.coverage || ""} onChange={e => handleDetailChange(id, "coverage", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Çıktılar:</label>
                                    <div className="flex flex-wrap gap-3">{["FASTQ", "BAM", "VCF", "Analiz Raporu"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.cikti) && d.cikti.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.cikti) ? d.cikti : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "cikti", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "9" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">DNA Durumu:</label>
                                    <div className="flex gap-4">{["Hazır", "İzolasyon Gerekli"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`dna-${id}`} checked={d.dnaDurumu === x} onChange={() => handleDetailChange(id, "dnaDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Analiz Tipi:</label>
                                    <div className="flex flex-wrap gap-3">{["Bireysel", "Aile/Trio", "Somatik", "Germline"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`at-${id}`} checked={d.analizTipi === x} onChange={() => handleDetailChange(id, "analizTipi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Araştırılan Genler / Fenotip / Çalışma Konusu:</label><input type="text" value={d.fenotip || ""} onChange={e => handleDetailChange(id, "fenotip", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Referans Genom / Versiyon:</label><input type="text" value={d.referansGenom || ""} onChange={e => handleDetailChange(id, "referansGenom", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Çıktılar:</label>
                                    <div className="flex flex-wrap gap-3">{["FASTQ", "BAM", "VCF", "Analiz Raporu"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.cikti) && d.cikti.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.cikti) ? d.cikti : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "cikti", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "10" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Hedef Gen / Gen Paneli:</label><input type="text" value={d.hedefGen || ""} onChange={e => handleDetailChange(id, "hedefGen", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Hedef Bölge:</label>
                                    <div className="flex gap-4">{["Hazır Panel", "Özel Panel Tasarımı"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`hb-${id}`} checked={d.hedefBolge === x} onChange={() => handleDetailChange(id, "hedefBolge", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">DNA Durumu:</label>
                                    <div className="flex gap-4">{["Hazır", "İzolasyon Gerekli"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`dna-${id}`} checked={d.dnaDurumu === x} onChange={() => handleDetailChange(id, "dnaDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Referans Genom / Versiyon:</label><input type="text" value={d.referansGenom || ""} onChange={e => handleDetailChange(id, "referansGenom", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Varyant Analizi", "Varyant Anotasyonu", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ia-${id}`} checked={d.istenenAnaliz === x} onChange={() => handleDetailChange(id, "istenenAnaliz", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "11" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Gruplar / Karşılaştırmalar:</label><input type="text" value={d.gruplar || ""} onChange={e => handleDetailChange(id, "gruplar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">RNA Durumu:</label>
                                    <div className="flex gap-4">{["Hazır", "İzolasyon Gerekli"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`rna-${id}`} checked={d.rnaDurumu === x} onChange={() => handleDetailChange(id, "rnaDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Kütüphane Tercihi:</label>
                                    <div className="flex gap-4">{["Poly-A", "rRNA Depletion", "Belirtilmedi"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`kut-${id}`} checked={d.kutuphaneTercihi === x} onChange={() => handleDetailChange(id, "kutuphaneTercihi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Ham Veri", "Diferansiyel Gen Ekspresyonu", "GO Analizi", "KEGG / Pathway Analizi", "Grafik ve Raporlama"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.analiz) && d.analiz.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.analiz) ? d.analiz : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "analiz", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "12" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü:</label><input type="text" value={d.numuneTuru || ""} onChange={e => handleDetailChange(id, "numuneTuru", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numunenin Kaynağı / Organizma:</label><input type="text" value={d.kaynakOrg || ""} onChange={e => handleDetailChange(id, "kaynakOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Gruplar / Karşılaştırmalar:</label><input type="text" value={d.gruplar || ""} onChange={e => handleDetailChange(id, "gruplar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">DNA Durumu:</label>
                                    <div className="flex gap-4">{["Hazır", "İzolasyon Gerekli"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`dna-${id}`} checked={d.dnaDurumu === x} onChange={() => handleDetailChange(id, "dnaDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Taksonomik Profil", "Fonksiyonel Analiz", "Antibiyotik Direnç Genleri", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.analiz) && d.analiz.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.analiz) ? d.analiz : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "analiz", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Ham Veri ve Biyoinformatik Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Birlikte", "Sadece Sekanslama", "Sadece Veri Analizi"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`biyo-${id}`} checked={d.biyoinformatikAnaliz === x} onChange={() => handleDetailChange(id, "biyoinformatikAnaliz", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "13" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü:</label><input type="text" value={d.numuneTuru || ""} onChange={e => handleDetailChange(id, "numuneTuru", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numunenin Kaynağı / Organizma:</label><input type="text" value={d.kaynakOrg || ""} onChange={e => handleDetailChange(id, "kaynakOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Gruplar / Karşılaştırmalar:</label><input type="text" value={d.gruplar || ""} onChange={e => handleDetailChange(id, "gruplar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">DNA Durumu:</label>
                                    <div className="flex gap-4">{["Hazır", "İzolasyon Gerekli"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`dna-${id}`} checked={d.dnaDurumu === x} onChange={() => handleDetailChange(id, "dnaDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Hedef Bölge:</label>
                                    <div className="flex gap-4">{["V3–V4", "V4", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`hb-${id}`} checked={d.hedefBolge === x} onChange={() => handleDetailChange(id, "hedefBolge", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Taksonomik Analiz", "Alfa Çeşitlilik", "Beta Çeşitlilik", "Gruplar Arası Karşılaştırma", "Raporlama"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.analiz) && d.analiz.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.analiz) ? d.analiz : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "analiz", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "14" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü / Organizma:</label><input type="text" value={d.numuneTuruOrg || ""} onChange={e => handleDetailChange(id, "numuneTuruOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label>
                                    <div className="flex flex-wrap gap-3">{["Doku", "Hücre", "Protein Ekstraktı", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`nt-${id}`} checked={d.numuneTipi === x} onChange={() => handleDetailChange(id, "numuneTipi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Hedef Proteinler / Antikorlar:</label><input type="text" value={d.hedefProteinler || ""} onChange={e => handleDetailChange(id, "hedefProteinler", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Antikor Durumu:</label>
                                    <div className="flex gap-4">{["Müşteri Tarafından Sağlanacak", "CoreGen Tarafından Temin Edilecek"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ad-${id}`} checked={d.antikorDurumu === x} onChange={() => handleDetailChange(id, "antikorDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Referans / Housekeeping Protein (varsa):</label><input type="text" value={d.refProtein || ""} onChange={e => handleDetailChange(id, "refProtein", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Western Blot Görüntüsü", "Band Yoğunluk Analizi", "Normalizasyon", "İstatistiksel Analiz"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.analiz) && d.analiz.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.analiz) ? d.analiz : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "analiz", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numunelerin Jele Yüklenme Sırası veya Özel Not:</label><input type="text" value={d.yuklenmeSirasi || ""} onChange={e => handleDetailChange(id, "yuklenmeSirasi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "15" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü / Organizma:</label><input type="text" value={d.numuneTuruOrg || ""} onChange={e => handleDetailChange(id, "numuneTuruOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label>
                                    <div className="flex flex-wrap gap-3">{["Serum", "Plazma", "Doku", "Hücre Süpernatantı", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`nt-${id}`} checked={d.numuneTipi === x} onChange={() => handleDetailChange(id, "numuneTipi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Her Numunenin Yaklaşık Hacmi / Miktarı:</label><input type="text" value={d.hacimMiktar || ""} onChange={e => handleDetailChange(id, "hacimMiktar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Test / Analit:</label><input type="text" value={d.analit || ""} onChange={e => handleDetailChange(id, "analit", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">ELISA Kiti:</label>
                                    <div className="flex gap-4">{["Müşteri Tarafından Sağlanacak", "CoreGen Tarafından Temin Edilecek"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ek-${id}`} checked={d.elisaKiti === x} onChange={() => handleDetailChange(id, "elisaKiti", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Sonuç:</label>
                                    <div className="flex gap-4">{["Konsantrasyon Sonucu", "Gruplar Arası Karşılaştırma", "İstatistiksel Analiz"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`sonuc-${id}`} checked={d.istenenSonuc === x} onChange={() => handleDetailChange(id, "istenenSonuc", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "16" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Hedef Protein / Gen:</label><input type="text" value={d.hedefProteinGen || ""} onChange={e => handleDetailChange(id, "hedefProteinGen", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Protein / Gen Dizisi veya Accession No:</label><input type="text" value={d.diziAccession || ""} onChange={e => handleDetailChange(id, "diziAccession", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Hizmet:</label>
                                    <div className="flex flex-wrap gap-3">{["Rekombinant Protein Üretimi", "Saflaştırma", "Protein Analizi", "Doğrulama"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.hizmet) && d.hizmet.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.hizmet) ? d.hizmet : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "hizmet", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">İstenen Protein Miktarı:</label><input type="text" value={d.proteinMiktari || ""} onChange={e => handleDetailChange(id, "proteinMiktari", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Hedef Saflık:</label><input type="text" value={d.hedefSaflik || ""} onChange={e => handleDetailChange(id, "hedefSaflik", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Tercih Edilen Ekspresyon Sistemi (varsa):</label><input type="text" value={d.ekspresyonSistemi || ""} onChange={e => handleDetailChange(id, "ekspresyonSistemi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Doğrulama Talebi:</label>
                                    <div className="flex gap-4">{["SDS-PAGE", "Western Blot", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`dt-${id}`} checked={d.dogrulamaTalebi === x} onChange={() => handleDetailChange(id, "dogrulamaTalebi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "17" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Veri Türü:</label><input type="text" value={d.veriTuru || ""} onChange={e => handleDetailChange(id, "veriTuru", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Sekanslama Platformu:</label><input type="text" value={d.sekanslamaPlatformu || ""} onChange={e => handleDetailChange(id, "sekanslamaPlatformu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Veri Formatı:</label>
                                    <div className="flex flex-wrap gap-3">{["FASTQ", "BAM", "VCF", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`vf-${id}`} checked={d.veriFormati === x} onChange={() => handleDetailChange(id, "veriFormati", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Gruplar / Karşılaştırmalar:</label><input type="text" value={d.gruplar || ""} onChange={e => handleDetailChange(id, "gruplar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Kalite Kontrol", "Trimming", "Alignment", "Assembly", "Variant Calling", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.analiz) && d.analiz.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.analiz) ? d.analiz : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "analiz", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Referans Genom / Veri Tabanı (varsa):</label><input type="text" value={d.referansGenom || ""} onChange={e => handleDetailChange(id, "referansGenom", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">İstenen Çıktılar:</label><input type="text" value={d.istenenCiktilar || ""} onChange={e => handleDetailChange(id, "istenenCiktilar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "18" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Veri Formatı:</label>
                                    <div className="flex gap-4">{["FASTQ", "BAM", "Count Matrix"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`vf-${id}`} checked={d.veriFormati === x} onChange={() => handleDetailChange(id, "veriFormati", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Gruplar / Karşılaştırmalar:</label><input type="text" value={d.gruplar || ""} onChange={e => handleDetailChange(id, "gruplar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Referans Genom / Versiyon (varsa):</label><input type="text" value={d.referansGenom || ""} onChange={e => handleDetailChange(id, "referansGenom", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Kalite Kontrol", "Diferansiyel Gen Ekspresyonu", "GO Analizi", "KEGG / Pathway", "PCA", "Heatmap", "Volcano Plot", "Raporlama"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.analiz) && d.analiz.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.analiz) ? d.analiz : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "analiz", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "19" && (
                                <div className="space-y-3 text-xs">
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Veri Formatı:</label>
                                    <div className="flex gap-4">{["Count Matrix", "Normalize Veri", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`vf-${id}`} checked={d.veriFormati === x} onChange={() => handleDetailChange(id, "veriFormati", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Gruplar:</label><input type="text" value={d.gruplar || ""} onChange={e => handleDetailChange(id, "gruplar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Yapılacak Karşılaştırmalar:</label><input type="text" value={d.karsilastirmalar || ""} onChange={e => handleDetailChange(id, "karsilastirmalar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Çıktılar:</label>
                                    <div className="flex flex-wrap gap-3">{["DEG Listesi", "Heatmap", "PCA", "Volcano Plot", "GO", "KEGG / Pathway", "Raporlama"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.cikti) && d.cikti.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.cikti) ? d.cikti : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "cikti", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "20" && (
                                <div className="space-y-3 text-xs">
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Veri Formatı:</label>
                                    <div className="flex gap-4">{["FASTQ", "BAM", "VCF"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`vf-${id}`} checked={d.veriFormati === x} onChange={() => handleDetailChange(id, "veriFormati", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma:</label><input type="text" value={d.organizma || ""} onChange={e => handleDetailChange(id, "organizma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Referans Genom / Versiyon:</label><input type="text" value={d.referansGenom || ""} onChange={e => handleDetailChange(id, "referansGenom", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Analiz Türü:</label>
                                    <div className="flex gap-4">{["Germline", "Somatik"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`at-${id}`} checked={d.analizTuru === x} onChange={() => handleDetailChange(id, "analizTuru", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Hedef Gen / Bölge (varsa):</label><input type="text" value={d.hedefGenBolge || ""} onChange={e => handleDetailChange(id, "hedefGenBolge", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Varyant Tipi:</label>
                                    <div className="flex gap-4">{["SNV", "Indel", "CNV", "SV"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.varyantTipi) && d.varyantTipi.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.varyantTipi) ? d.varyantTipi : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "varyantTipi", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Çıktı:</label>
                                    <div className="flex flex-wrap gap-3">{["Varyant Listesi", "Anotasyon", "Filtreleme", "Raporlama"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.cikti) && d.cikti.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.cikti) ? d.cikti : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "cikti", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "21" && (
                                <div className="space-y-3 text-xs">
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Dizi Türü:</label>
                                    <div className="flex gap-4">{["DNA", "RNA", "Protein"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`dt-${id}`} checked={d.diziTuru === x} onChange={() => handleDetailChange(id, "diziTuru", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Dizi Sayısı:</label><input type="text" value={d.diziSayisi || ""} onChange={e => handleDetailChange(id, "diziSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Veri Formatı:</label><input type="text" value={d.veriFormati || ""} onChange={e => handleDetailChange(id, "veriFormati", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Organizma / Tür Grubu:</label><input type="text" value={d.organizmaTurGrubu || ""} onChange={e => handleDetailChange(id, "organizmaTurGrubu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Referans Diziler:</label>
                                    <div className="flex gap-4">{["Dahil", "Hariç"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`rd-${id}`} checked={d.referansDiziler === x} onChange={() => handleDetailChange(id, "referansDiziler", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Analiz Talebi:</label>
                                    <div className="flex flex-wrap gap-3">{["Filogenetik Ağaç", "Bootstrap Analizi", "Karşılaştırmalı Analiz"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.analizTalebi) && d.analizTalebi.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.analizTalebi) ? d.analizTalebi : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "analizTalebi", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "22" && (
                                <div className="space-y-3 text-xs">
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Veri Türü:</label>
                                    <div className="flex gap-4">{["16S", "Shotgun Metagenomics"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`vt-${id}`} checked={d.veriTuru === x} onChange={() => handleDetailChange(id, "veriTuru", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Veri Formatı:</label><input type="text" value={d.veriFormati || ""} onChange={e => handleDetailChange(id, "veriFormati", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune Sayısı:</label><input type="text" value={d.toplamNumuneSayisi || ""} onChange={e => handleDetailChange(id, "toplamNumuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Gruplar / Karşılaştırmalar:</label><input type="text" value={d.gruplar || ""} onChange={e => handleDetailChange(id, "gruplar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Sekanslama Platformu:</label><input type="text" value={d.sekanslamaPlatformu || ""} onChange={e => handleDetailChange(id, "sekanslamaPlatformu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Taksonomik Analiz", "Alfa Çeşitlilik", "Beta Çeşitlilik", "Diferansiyel Bolluk", "Fonksiyonel Analiz", "Raporlama"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.analiz) && d.analiz.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.analiz) ? d.analiz : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "analiz", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "23" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Proje Konusu:</label><input type="text" value={d.projeKonusu || ""} onChange={e => handleDetailChange(id, "projeKonusu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Araştırma Sorusu / Amaç:</label><input type="text" value={d.arastirmaSorusAmac || ""} onChange={e => handleDetailChange(id, "arastirmaSorusAmac", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Planlanan Yöntem veya Deneyler:</label><input type="text" value={d.planlananYontem || ""} onChange={e => handleDetailChange(id, "planlananYontem", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Proje Türü:</label>
                                    <div className="flex flex-wrap gap-3">{["TÜBİTAK", "KOSGEB", "BAP", "TÜSEB", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`pt-${id}`} checked={d.projeTuru === x} onChange={() => handleDetailChange(id, "projeTuru", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Talep Edilen Danışmanlık Kapsamı:</label><input type="text" value={d.danismanlikKapsami || ""} onChange={e => handleDetailChange(id, "danismanlikKapsami", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Mevcut Proje Taslağı:</label>
                                    <div className="flex gap-4">{["Var", "Yok"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`mpt-${id}`} checked={d.mevcutTaslak === x} onChange={() => handleDetailChange(id, "mevcutTaslak", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Başvuru / Teslim Tarihi:</label><input type="text" value={d.basvuruTarihi || ""} onChange={e => handleDetailChange(id, "basvuruTarihi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "24" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Yapılması İstenen Hizmet / Analiz:</label><input type="text" value={d.yapilmasiIstenen || ""} onChange={e => handleDetailChange(id, "yapilmasiIstenen", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune / Materyal Türü:</label><input type="text" value={d.numuneMateryalTuru || ""} onChange={e => handleDetailChange(id, "numuneMateryalTuru", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Mevcut Laboratuvar Altyapısı / Cihazlar:</label><input type="text" value={d.mevcutAltyapi || ""} onChange={e => handleDetailChange(id, "mevcutAltyapi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">CoreGen Tarafından Yapılması İstenen İşlemler:</label><input type="text" value={d.coregenIslemler || ""} onChange={e => handleDetailChange(id, "coregenIslemler", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Sarf ve Reaktif Durumu:</label>
                                    <div className="flex gap-4">{["Mevcut", "Temin Edilecek"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`srd-${id}`} checked={d.sarfReaktif === x} onChange={() => handleDetailChange(id, "sarfReaktif", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Tahmini Çalışma Süresi:</label><input type="text" value={d.tahminiSure || ""} onChange={e => handleDetailChange(id, "tahminiSure", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "25" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Eğitim Konusu:</label><input type="text" value={d.egitimKonusu || ""} onChange={e => handleDetailChange(id, "egitimKonusu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Katılımcı Profili / Seviyesi:</label><input type="text" value={d.katilimciProfili || ""} onChange={e => handleDetailChange(id, "katilimciProfili", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Tahmini Katılımcı Sayısı:</label><input type="text" value={d.tahminiKatilimci || ""} onChange={e => handleDetailChange(id, "tahminiKatilimci", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Eğitim Türü:</label>
                                    <div className="flex gap-4">{["Online", "Yüz Yüze"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`et-${id}`} checked={d.egitimTuru === x} onChange={() => handleDetailChange(id, "egitimTuru", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Eğitim İçeriği:</label>
                                    <div className="flex gap-4">{["Teorik", "Uygulamalı", "Her İkisi"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ei-${id}`} checked={d.egitimIcerigi === x} onChange={() => handleDetailChange(id, "egitimIcerigi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Talep Edilen Eğitim Süresi:</label><input type="text" value={d.egitimSuresi || ""} onChange={e => handleDetailChange(id, "egitimSuresi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Kullanılacak Cihaz / Yazılım / Altyapı:</label><input type="text" value={d.kullanilacakAltyapi || ""} onChange={e => handleDetailChange(id, "kullanilacakAltyapi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "26" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Araştırma Konusu:</label><input type="text" value={d.arastirmaKonusu || ""} onChange={e => handleDetailChange(id, "arastirmaKonusu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Araştırma Sorusu / Amaç:</label><input type="text" value={d.arastirmaSorusu || ""} onChange={e => handleDetailChange(id, "arastirmaSorusu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Planlanan Numune / Model:</label><input type="text" value={d.planlananModel || ""} onChange={e => handleDetailChange(id, "planlananModel", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Ölçülmek İstenen Parametreler:</label><input type="text" value={d.olcusecekParametreler || ""} onChange={e => handleDetailChange(id, "olcusecekParametreler", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Planlanan Gruplar:</label><input type="text" value={d.planlananGruplar || ""} onChange={e => handleDetailChange(id, "planlananGruplar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Mevcut Laboratuvar İmkânları:</label><input type="text" value={d.mevcutImkanlar || ""} onChange={e => handleDetailChange(id, "mevcutImkanlar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Bütçe veya Süre Kısıtlaması (varsa):</label><input type="text" value={d.butceSure || ""} onChange={e => handleDetailChange(id, "butceSure", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "27" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Veri Dosyası Formatı:</label><input type="text" value={d.veriFormat || ""} onChange={e => handleDetailChange(id, "veriFormat", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Toplam Numune / Gözlem Sayısı:</label><input type="text" value={d.toplamGozlem || ""} onChange={e => handleDetailChange(id, "toplamGozlem", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Gruplar:</label><input type="text" value={d.gruplar || ""} onChange={e => handleDetailChange(id, "gruplar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Yapılacak Karşılaştırmalar:</label><input type="text" value={d.yapilacakKarsilastirmalar || ""} onChange={e => handleDetailChange(id, "yapilacakKarsilastirmalar", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Tanımlayıcı İstatistik", "Grup Karşılaştırması", "Korelasyon", "Regresyon", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.analiz) && d.analiz.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.analiz) ? d.analiz : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "analiz", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Talep Edilen Grafikler (varsa):</label><input type="text" value={d.grafikler || ""} onChange={e => handleDetailChange(id, "grafikler", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "28" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Raporlanacak Çalışma / Analiz:</label><input type="text" value={d.raporlanacakCalisma || ""} onChange={e => handleDetailChange(id, "raporlanacakCalisma", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Mevcut Veri ve Sonuçlar:</label><input type="text" value={d.mevcutVeriSonuc || ""} onChange={e => handleDetailChange(id, "mevcutVeriSonuc", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Yapılan Yöntemler:</label><input type="text" value={d.yapilanYontemler || ""} onChange={e => handleDetailChange(id, "yapilanYontemler", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Rapor Dili:</label>
                                    <div className="flex gap-4">{["Türkçe", "İngilizce"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`rd-${id}`} checked={d.raporDili === x} onChange={() => handleDetailChange(id, "raporDili", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Rapor İçeriği:</label>
                                    <div className="flex flex-wrap gap-3">{["Sonuç", "Yöntem", "Grafik / Tablo", "Yorumlama", "Tam Bilimsel Rapor"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.raporIcerigi) && d.raporIcerigi.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.raporIcerigi) ? d.raporIcerigi : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "raporIcerigi", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "29" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışma Konusu:</label><input type="text" value={d.calismaKonusu || ""} onChange={e => handleDetailChange(id, "calismaKonusu", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Mevcut Aşama:</label>
                                    <div className="flex flex-wrap gap-3">{["Taslak Hazırlık", "Veri Analizi", "Makale Yazımı", "Revizyon"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ma-${id}`} checked={d.mevcutAsama === x} onChange={() => handleDetailChange(id, "mevcutAsama", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Destek:</label>
                                    <div className="flex flex-wrap gap-3">{["İstatistik", "Veri Analizi", "Makale Yazımı", "Dil Düzenleme", "Figür / Tablo", "Dergi Seçimi"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.destekTalebi) && d.destekTalebi.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.destekTalebi) ? d.destekTalebi : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "destekTalebi", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Hedef Dergi (varsa):</label><input type="text" value={d.hedefDergi || ""} onChange={e => handleDetailChange(id, "hedefDergi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "30" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü / Organizma:</label><input type="text" value={d.numuneTuruOrg || ""} onChange={e => handleDetailChange(id, "numuneTuruOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label>
                                    <div className="flex gap-4">{["Serum", "Plazma", "Doku", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`nt-${id}`} checked={d.numuneTipi === x} onChange={() => handleDetailChange(id, "numuneTipi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışılacak Parametreler:</label>
                                    <div className="flex flex-wrap gap-3">{["MDA", "SOD", "CAT", "GSH", "GPx", "TAC", "TOS", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.parametreler) && d.parametreler.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.parametreler) ? d.parametreler : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "parametreler", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstatistiksel Analiz:</label>
                                    <div className="flex gap-4">{["Evet", "Hayır"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ia-${id}`} checked={d.istatistikselAnaliz === x} onChange={() => handleDetailChange(id, "istatistikselAnaliz", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "31" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü / Organizma:</label><input type="text" value={d.numuneTuruOrg || ""} onChange={e => handleDetailChange(id, "numuneTuruOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Test / Parametreler:</label><input type="text" value={d.testParametreler || ""} onChange={e => handleDetailChange(id, "testParametreler", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstatistiksel Analiz:</label>
                                    <div className="flex gap-4">{["Evet", "Hayır"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ia-${id}`} checked={d.istatistikselAnaliz === x} onChange={() => handleDetailChange(id, "istatistikselAnaliz", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "32" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü / Organizma:</label><input type="text" value={d.numuneTuruOrg || ""} onChange={e => handleDetailChange(id, "numuneTuruOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Test / Parametre:</label><input type="text" value={d.testParametre || ""} onChange={e => handleDetailChange(id, "testParametre", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Tercih Edilen Yöntem veya Kit (varsa):</label><input type="text" value={d.yontemKit || ""} onChange={e => handleDetailChange(id, "yontemKit", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "33" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü / Organizma:</label><input type="text" value={d.numuneTuruOrg || ""} onChange={e => handleDetailChange(id, "numuneTuruOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label>
                                    <div className="flex flex-wrap gap-3">{["Serum", "Plazma", "Doku", "Tam Kan", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`nt-${id}`} checked={d.numuneTipi === x} onChange={() => handleDetailChange(id, "numuneTipi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Test / Analit:</label><input type="text" value={d.analit || ""} onChange={e => handleDetailChange(id, "analit", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">ELISA Kit Durumu:</label>
                                    <div className="flex gap-4">{["Müşteride Mevcut", "Temin Edilecek"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ek-${id}`} checked={d.elisaKitDurumu === x} onChange={() => handleDetailChange(id, "elisaKitDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">İstenen Sonuç:</label>
                                    <div className="flex gap-4">{["Konsantrasyon", "İstatistik", "Raporlama"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`sonuc-${id}`} checked={d.istenenSonuc === x} onChange={() => handleDetailChange(id, "istenenSonuc", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "34" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Türü / Organizma:</label><input type="text" value={d.numuneTuruOrg || ""} onChange={e => handleDetailChange(id, "numuneTuruOrg", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Tipi:</label><input type="text" value={d.numuneTipi || ""} onChange={e => handleDetailChange(id, "numuneTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Numune Sayısı:</label><input type="text" value={d.numuneSayisi || ""} onChange={e => handleDetailChange(id, "numuneSayisi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="Blok Sayısı" value={d.blokSayisi || ""} onChange={e => handleDetailChange(id, "blokSayisi", e.target.value)} className="bg-gray-50 border rounded-xl px-3 py-2 text-xs" />
                                    <input type="text" placeholder="Lam Sayısı" value={d.lamSayisi || ""} onChange={e => handleDetailChange(id, "lamSayisi", e.target.value)} className="bg-gray-50 border rounded-xl px-3 py-2 text-xs" />
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Hedef / Antikor:</label><input type="text" value={d.hedefAntikor || ""} onChange={e => handleDetailChange(id, "hedefAntikor", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Mevcut Numune Durumu:</label>
                                    <div className="flex flex-wrap gap-3">{["Fikse Doku", "Parafin Blok", "Hazır Kesit", "Frozen", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`mnd-${id}`} checked={d.mevcutNumuneDurumu === x} onChange={() => handleDetailChange(id, "mevcutNumuneDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen İşlem:</label>
                                    <div className="flex flex-wrap gap-3">{["IHC Boyama", "Görüntüleme", "Skorlama", "Raporlama"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.islem) && d.islem.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.islem) ? d.islem : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "islem", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "35" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Hücre Hattı:</label><input type="text" value={d.hucreHatti || ""} onChange={e => handleDetailChange(id, "hucreHatti", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Hücre Hattı Durumu:</label>
                                    <div className="flex gap-4">{["Müşteri Tarafından Sağlanacak", "Temin Edilecek"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`hhd-${id}`} checked={d.hucreHattiDurumu === x} onChange={() => handleDetailChange(id, "hucreHattiDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Test Edilecek Materyal:</label><input type="text" value={d.testMateryali || ""} onChange={e => handleDetailChange(id, "testMateryali", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Materyalin Dozu / Konsantrasyonları:</label><input type="text" value={d.dozKonsantrasyon || ""} onChange={e => handleDetailChange(id, "dozKonsantrasyon", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Uygulama Süresi:</label><input type="text" value={d.uygulamaSuresi || ""} onChange={e => handleDetailChange(id, "uygulamaSuresi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Test:</label>
                                    <div className="flex flex-wrap gap-3">{["Hücre Canlılığı", "Sitotoksisite", "IC50", "Apoptoz", "ROS", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="checkbox" checked={Array.isArray(d.test) && d.test.includes(x)} onChange={(e) => {
                                      const prev = Array.isArray(d.test) ? d.test : [];
                                      const next = e.target.checked ? [...prev, x] : prev.filter((i: string) => i !== x);
                                      handleDetailChange(id, "test", next);
                                    }} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "36" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Hücre Hattı:</label><input type="text" value={d.hucreHatti || ""} onChange={e => handleDetailChange(id, "hucreHatti", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Test Edilecek Materyal / Uygulama:</label><input type="text" value={d.testMateryaliUygulama || ""} onChange={e => handleDetailChange(id, "testMateryaliUygulama", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Doz / Konsantrasyon:</label><input type="text" value={d.dozKonsantrasyon || ""} onChange={e => handleDetailChange(id, "dozKonsantrasyon", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Uygulama Süresi:</label><input type="text" value={d.uygulamaSuresi || ""} onChange={e => handleDetailChange(id, "uygulamaSuresi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Ölçülecek Analit:</label><input type="text" value={d.olculecekAnalit || ""} onChange={e => handleDetailChange(id, "olculecekAnalit", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">ELISA Numunesi:</label>
                                    <div className="flex gap-4">{["Hücre Süpernatantı", "Hücre Lizatı"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`en-${id}`} checked={d.elisaNumunesi === x} onChange={() => handleDetailChange(id, "elisaNumunesi", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">ELISA Kit Durumu:</label>
                                    <div className="flex gap-4">{["Mevcut", "Temin Edilecek"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ekd-${id}`} checked={d.elisaKitDurumu === x} onChange={() => handleDetailChange(id, "elisaKitDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "37" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Hücre Hattı:</label><input type="text" value={d.hucreHatti || ""} onChange={e => handleDetailChange(id, "hucreHatti", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Analiz:</label>
                                    <div className="flex flex-wrap gap-3">{["Proliferasyon", "Migrasyon", "Yara İyileşmesi / Scratch Assay", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`tea-${id}`} checked={d.talepEdilenAnaliz === x} onChange={() => handleDetailChange(id, "talepEdilenAnaliz", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Test Edilecek Materyal:</label><input type="text" value={d.testMateryali || ""} onChange={e => handleDetailChange(id, "testMateryali", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Doz / Konsantrasyon:</label><input type="text" value={d.dozKonsantrasyon || ""} onChange={e => handleDetailChange(id, "dozKonsantrasyon", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Uygulama Süresi:</label><input type="text" value={d.uygulamaSuresi || ""} onChange={e => handleDetailChange(id, "uygulamaSuresi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Görüntüleme Zaman Noktaları (varsa):</label><input type="text" value={d.goruntulemeZamani || ""} onChange={e => handleDetailChange(id, "goruntulemeZamani", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "38" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Çalışılacak Hücre Hattı:</label><input type="text" value={d.hucreHatti || ""} onChange={e => handleDetailChange(id, "hucreHatti", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Hedef Gen:</label><input type="text" value={d.hedefGen || ""} onChange={e => handleDetailChange(id, "hedefGen", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen İşlem:</label>
                                    <div className="flex flex-wrap gap-3">{["Overexpression", "Knockdown", "Knockout", "Transfeksiyon", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`tei-${id}`} checked={d.talepEdilenIslem === x} onChange={() => handleDetailChange(id, "talepEdilenIslem", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Genetik Materyal Durumu:</label>
                                    <div className="flex gap-4">{["Plazmit / Materyal Mevcut", "Tasarım / Temin Gerekli"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`gmd-${id}`} checked={d.genetikMateryalDurumu === x} onChange={() => handleDetailChange(id, "genetikMateryalDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Doğrulama:</label>
                                    <div className="flex flex-wrap gap-3">{["PCR/qPCR", "Western Blot", "Sekanslama", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`ted-${id}`} checked={d.dogrulama === x} onChange={() => handleDetailChange(id, "dogrulama", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

                              {id === "39" && (
                                <div className="space-y-3 text-xs">
                                  <div><label className="block font-bold text-gray-700 mb-1">Kök Hücre / Hücre Tipi:</label><input type="text" value={d.kokHucreTipi || ""} onChange={e => handleDetailChange(id, "kokHucreTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Hücre Kaynağı:</label><input type="text" value={d.hucreKaynagi || ""} onChange={e => handleDetailChange(id, "hucreKaynagi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Mevcut Hücre Durumu:</label>
                                    <div className="flex gap-4">{["Müşteri Tarafından Sağlanacak", "Temin Edilecek"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`mhd-${id}`} checked={d.mevcutHucreDurumu === x} onChange={() => handleDetailChange(id, "mevcutHucreDurumu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Talep Edilen Uygulama:</label>
                                    <div className="flex flex-wrap gap-3">{["Hücre Kültürü", "Farklılaştırma", "Proliferasyon Analizi", "Marker Analizi", "Diğer"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`teu-${id}`} checked={d.talepEdilenUygulama === x} onChange={() => handleDetailChange(id, "talepEdilenUygulama", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Hedeflenen Hücre Tipi / Farklılaşma:</label><input type="text" value={d.hedefHücreTipi || ""} onChange={e => handleDetailChange(id, "hedefHücreTipi", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Talep Edilen Analiz / Doğrulama:</label><input type="text" value={d.dogrulamaAnaliz || ""} onChange={e => handleDetailChange(id, "dogrulamaAnaliz", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                  <div>
                                    <label className="block font-bold text-gray-700 mb-1">Çalışma Döngüsü:</label>
                                    <div className="flex gap-4">{["Triplik", "Duplik", "Tekil"].map(x => <label key={x} className="flex items-center gap-1"><input type="radio" name={`cd-${id}`} checked={d.calismaDongusu === x} onChange={() => handleDetailChange(id, "calismaDongusu", x)} /> {x}</label>)}</div>
                                  </div>
                                  <div><label className="block font-bold text-gray-700 mb-1">Not / Özel Talep:</label><textarea rows={2} value={d.ozelTalep || ""} onChange={e => handleDetailChange(id, "ozelTalep", e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs" /></div>
                                </div>
                              )}

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

                  <div className="space-y-4 pt-2">
                    <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5 uppercase tracking-wider border-b pb-2">
                      <FileText className="w-4 h-4 text-pink-600" /> Biyogüvenlik & Genel Bilgiler
                    </h3>

                    <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 space-y-3">
                      <label className="block text-xs font-bold text-rose-900">
                        Numunelerde bulaşıcı veya özel biyogüvenlik riski var mı? <span className="text-pink-600">*</span>
                      </label>
                      <div className="flex gap-6 text-xs font-medium text-gray-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="biyoguvenlikRiski"
                            value="yok"
                            checked={formData.biyoguvenlikRiski === "yok"}
                            onChange={handleChange}
                            className="text-pink-600"
                          /> Hayır, risk yok.
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="biyoguvenlikRiski"
                            value="var"
                            checked={formData.biyoguvenlikRiski === "var"}
                            onChange={handleChange}
                            className="text-pink-600"
                          /> Evet (Lütfen açıklayınız)
                        </label>
                      </div>

                      {formData.biyoguvenlikRiski === "var" && (
                        <div className="pt-2">
                          <input
                            type="text"
                            name="biyoguvenlikAciklama"
                            placeholder="Risk durumu hakkında kısa açıklama yazınız..."
                            value={formData.biyoguvenlikAciklama}
                            onChange={handleChange}
                            className="w-full bg-white border border-rose-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-rose-500"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Çalışmanın Amacı</label>
                        <input
                          type="text"
                          name="amaci"
                          placeholder="Örn: Gen ekspresyon analizi..."
                          value={formData.amaci}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-normal text-gray-600 mb-1">Proje / Dosya Yükleme (Opsiyonel)</label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-500">
                          <Upload className="w-4 h-4 text-gray-400 shrink-0" />
                          <input type="file" className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">Bize proje hakkında söylemek istedikleriniz / Kısa Açıklama</label>
                      <textarea
                        name="aciklama"
                        rows={2}
                        placeholder="Projeniz hakkında ek detaylar..."
                        value={formData.aciklama}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5 uppercase tracking-wider border-b pb-2">
                      <ReceiptText className="w-4 h-4 text-pink-600" /> Fatura Bilgileri
                    </h3>
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">TC Kimlik No / Vergi No <span className="text-pink-600">*</span></label>
                      <input
                        type="text"
                        name="tcVkn"
                        required
                        placeholder="TCKN veya Vergi Numarası"
                        value={formData.tcVkn}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-normal text-gray-600 mb-1">Fatura Adresi <span className="text-pink-600">*</span></label>
                      <textarea
                        name="faturaAdresi"
                        required
                        rows={2}
                        placeholder="Açık fatura adresi..."
                        value={formData.faturaAdresi}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs text-amber-900">
                    <p className="font-bold flex items-center gap-1.5 uppercase text-[11px]">
                      <Info className="w-4 h-4 text-amber-600 shrink-0" /> Önemli Bilgilendirme ve Notlar
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-800 pl-1">
                      <li>Numune kodları ile birlikte, numune bilgilerini içeren Excel listesinin paylaşılması önerilir.</li>
                      <li>Numunelerin mevcut saklama koşulları ve varsa uygulanan ön işlemler belirtilmesi önerilir.</li>
                      <li>Bulaşıcı veya özel biyogüvenlik riski bulunan numuneler gönderilmeden önce mutlaka bildirilmelidir.</li>
                      <li>Numune kabulü ve çalışma koşulları, talep edilen analiz ve numune özelliklerine göre değerlendirilmektedir.</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all shadow-md disabled:opacity-50"
                    >
                      {loading ? "Gönderiliyor..." : "Hizmet Teklif Talebini Gönder"}
                      <Send className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-2">
                      Talebiniz veritabanımıza kaydedilerek admin paneline iletilecektir.
                    </p>
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