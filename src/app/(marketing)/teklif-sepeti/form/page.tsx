"use client";

import { useState } from "react";
import { Send, CheckCircle2, Info, AlertTriangle, Microscope, Beaker, FileText, Activity, Dna, Layers, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

const ALL_SERVICES = [
  "Nükleik Asit ve Protein İzolasyonu", "Primer / Prob Tasarımı", "Jel Elektroforezi", "NanoDrop / Qubit Miktar Tayini",
  "PCR Analizi", "qPCR / RT-qPCR", "Sanger Dizileme", "WGS / WES / Targeted Sequencing", "RNA-Seq", 
  "Shotgun Metagenomics", "16S rRNA Analizi", "Western Blot", "ELISA", "Rekombinant Protein", 
  "Biyoinformatik Hizmetleri", "Oksidatif Stres / Biyokimya / Spesifik Testler", "İmmünohistokimya (IHC)", 
  "Hücre Kültürü Analizleri", "Proje Danışmanlığı", "Yerinde Hizmet", "Eğitim Hizmetleri", 
  "Deney Tasarımı", "İstatistiksel Analiz", "Bilimsel Raporlama / Yayın Danışmanlığı"
];

export default function TeklifFormPage() {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      alert("Lütfen en az bir hizmet seçiniz.");
      return;
    }

    setLoading(true);

    try {
      // Backend API'nin beklediği formatta veriyi hazırlıyoruz
      const payload = {
        ad: formData.ad,
        soyad: `${formData.unvan ? formData.unvan + " " : ""}${formData.soyad}`,
        kurum: formData.kurum,
        departman: formData.departman,
        email: formData.email,
        telefon: formData.telefon,
        city: formData.city,
        notlar: formData.notlar || formData.faturaBilgileri,
        kvkkConsent: true,
        items: selectedServices.map(service => ({
          itemNameSnapshot: service,
          categorySnapshot: "Laboratuvar Hizmetleri",
          quantity: 1
        }))
      };

      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Teklif kaydedilemedi.");
      }

      // Başarılı olursa backend'den dönen quoteNumber ile onay sayfasına yönlendiriyoruz
      router.push(`/teklif-sepeti/onay?q=${data.data.quoteNumber}`);
    } catch (err: any) {
      alert("Hata: " + err.message);
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* BÖLÜM 1: ORTAK MÜŞTERİ BİLGİLERİ */}
          <div className="p-8 md:p-12 border-b border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-50 to-transparent rounded-bl-full -z-10" />
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="bg-gradient-to-r from-pink-600 to-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">1</span> 
              Müşteri / Kurum Bilgileri
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Ad Soyad</label><input required name="ad" value={formData.ad} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Unvan / Akademik Derece</label><input required name="unvan" value={formData.unvan} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Kurum / Firma</label><input required name="kurum" value={formData.kurum} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Bölüm / Anabilim Dalı</label><input name="departman" value={formData.departman} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Telefon</label><input required name="telefon" value={formData.telefon} onChange={handleChange} type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">E-posta</label><input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" /></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Şehir</label><input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" /></div>
              <div className="space-y-2 md:col-span-2"><label className="text-xs font-bold text-slate-500 uppercase">Fatura Bilgileri (Opsiyonel)</label><input name="faturaBilgileri" value={formData.faturaBilgileri} onChange={handleChange} type="text" placeholder="Vergi Dairesi / VKN / Adres" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all" /></div>
            </div>
          </div>

          {/* BÖLÜM 2: HİZMET SEÇİMİ */}
          <div className="p-8 md:p-12 border-b border-slate-100 bg-slate-900 relative">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">2</span> 
              Hizmet Seçimi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ALL_SERVICES.map((hizmet) => (
                <label key={hizmet} className={`cursor-pointer flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${selectedServices.includes(hizmet) ? 'bg-pink-500/20 border-pink-500' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'}`}>
                  <input type="checkbox" className="hidden" checked={selectedServices.includes(hizmet)} onChange={() => toggleService(hizmet)} />
                  <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border ${selectedServices.includes(hizmet) ? 'bg-pink-500 border-pink-500' : 'border-slate-600'}`}>
                    {selectedServices.includes(hizmet) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-sm font-semibold leading-tight ${selectedServices.includes(hizmet) ? 'text-white' : 'text-slate-300'}`}>{hizmet}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ALT BÖLÜM: GÖNDER */}
          <div className="p-8 md:p-12 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-slate-400 text-sm max-w-lg">
              <p className="font-bold text-white mb-1">Teklifiniz Hazırlanıyor</p>
              Talebiniz uzman biyolog ve mühendislerimiz tarafından incelenecek ve projenize en uygun metodoloji ile 24-48 saat içinde resmi fiyat teklifine dönüştürülecektir.
            </div>
            <button type="submit" disabled={loading} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-cyan-600 hover:scale-105 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-pink-600/20 text-lg disabled:opacity-50">
              <Send className="w-5 h-5" /> {loading ? "Gönderiliyor..." : "Resmi Teklif İste"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}