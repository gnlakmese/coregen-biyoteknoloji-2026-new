"use client";

import { useState } from "react";
import { SERVICE_FIELDS, BIOINFORMATICS_SLUGS } from "@/lib/service-fields";
import { Paperclip, Calendar, ShieldCheck, Send, Link as LinkIcon, Info } from "lucide-react";

interface Props {
  serviceSlug: string;
  serviceName: string;
}

export function ServiceDetailForm({ serviceSlug, serviceName }: Props) {
  const [formData, setFormData] = useState<any>({});
  
  const dynamicFields = SERVICE_FIELDS[serviceSlug] || [];
  const isBioinformatics = BIOINFORMATICS_SLUGS.includes(serviceSlug);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = (name: string, value: string | boolean) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          serviceName: serviceName,
          name: formData.adSoyad,
          email: formData.email,
          phone: formData.telefon,
          message: `Kurum: ${formData.kurum || '-'}\nProje: ${formData.projeBasligi || '-'}\nAmaç: ${formData.amac || '-'}\nNotlar: ${formData.ekNotlar || '-'}\nDrive Link: ${formData.driveLink || '-'}`,
          details: formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert("E-posta gönderilemedi, lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("Gönderim hatası:", err);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl text-center space-y-4">
        <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto" />
        <h3 className="text-2xl font-bold text-slate-900">Talebiniz Başarıyla Alındı</h3>
        <p className="text-slate-600">Projeniz ekibimiz tarafından değerlendirilecek ve size en kısa sürede geri dönüş yapılacaktır.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm mt-8">
      
      <div className="border-b border-slate-100 pb-6 mb-6">
        <h3 className="text-2xl font-bold text-slate-900">Teklif Talebi</h3>
        <p className="text-pink-600 font-medium">{serviceName}</p>
      </div>
      
      {/* 1. İLETİŞİM BİLGİLERİ */}
      <section>
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="bg-pink-100 text-pink-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> 
          Müşteri Bilgileri
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Ad Soyad *</label>
            <input required type="text" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => handleUpdate("adSoyad", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Kurum / Üniversite / Firma *</label>
            <input required type="text" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => handleUpdate("kurum", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">E-posta *</label>
            <input required type="email" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => handleUpdate("email", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Telefon *</label>
              <input required type="tel" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => handleUpdate("telefon", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Şehir / Ülke</label>
              <input type="text" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => handleUpdate("sehir", e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROJE BİLGİLERİ */}
      <section>
        <h4 className="font-bold text-slate-900 mb-4 mt-8 flex items-center gap-2">
          <span className="bg-pink-100 text-pink-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> 
          Proje Genel Bilgileri
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 mb-1">Proje / Çalışma Başlığı *</label>
            <input required type="text" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => handleUpdate("projeBasligi", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Çalışmanın Amacı *</label>
            <textarea required rows={3} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => handleUpdate("amac", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Çalışmanın Kısa Açıklaması</label>
            <textarea rows={3} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none" onChange={e => handleUpdate("kisaAciklama", e.target.value)} />
          </div>
        </div>
      </section>

      {/* 3. TEKNİK (DİNAMİK) SORULAR */}
      {dynamicFields.length > 0 && (
        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h4 className="font-bold text-pink-600 mb-4 flex items-center gap-2">
            <span className="bg-pink-200 text-pink-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span> 
            Hizmet Teknik Detayları
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dynamicFields.map((field) => (
              <div key={field.name} className={field.type === 'textarea' ? "md:col-span-2" : ""}>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">{field.label}</label>
                {field.type === "select" ? (
                  <select className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none bg-white" onChange={e => handleUpdate(field.name, e.target.value)}>
                    <option value="">Seçiniz...</option>
                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea rows={2} placeholder={field.placeholder || ""} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none" onChange={e => handleUpdate(field.name, e.target.value)} />
                ) : (
                  <input type={field.type} placeholder={field.placeholder || ""} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none" onChange={e => handleUpdate(field.name, e.target.value)} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. DOSYA VE ZAMANLAMA */}
      <section>
        <h4 className="font-bold text-slate-900 mb-4 mt-8 flex items-center gap-2">
          <span className="bg-pink-100 text-pink-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span> 
          Ek Bilgiler & Dosyalar
        </h4>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Paperclip className="w-4 h-4 text-pink-500"/> Dosya Yükleme
              </label>
              <p className="text-[11px] text-slate-500 mb-2">
                {isBioinformatics 
                  ? "FASTQ, FASTA, BAM, VCF, CSV, XLSX, TXT ve ilgili diğer dosyaları yükleyebilirsiniz." 
                  : "Protokol, örnek listesi, primer/probe bilgileri, makale, teknik şartname veya destekleyici belgeler."}
              </p>
              <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer border border-slate-200 rounded-xl p-1" />
            </div>
            
            <div className={isBioinformatics ? "bg-blue-50/50 p-4 rounded-xl border border-blue-100" : ""}>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <LinkIcon className="w-4 h-4 text-blue-500"/> Google Drive / OneDrive / Dropbox Linki
              </label>
              {isBioinformatics && (
                <p className="text-[11px] text-blue-600 mb-2 flex items-start gap-1">
                  <Info className="w-3 h-3 shrink-0 mt-0.5" /> Dosyalarınızın erişim izinlerinin açık olduğundan emin olun.
                </p>
              )}
              <input type="url" placeholder="https://" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none bg-white" onChange={e => handleUpdate("driveLink", e.target.value)} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                Analiziniz / çalışmanız hakkında notlarınız veya sorularınız?
              </label>
              <textarea rows={3} placeholder="Çalışmanız, beklentileriniz, özel talepleriniz veya dikkat etmemizi istediğiniz noktalar..." className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none" onChange={e => handleUpdate("ekNotlar", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Planlanan Başlama</label>
                <input type="date" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:border-pink-500 outline-none text-slate-600" onChange={e => handleUpdate("baslangicTarihi", e.target.value)} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Hedef Bitiş Tarihi</label>
                <input type="date" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:border-pink-500 outline-none text-slate-600" onChange={e => handleUpdate("bitisTarihi", e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Acil / öncelikli çalışma talebiniz var mı?</label>
              <select className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:border-pink-500 outline-none text-slate-600" onChange={e => handleUpdate("acilDurum", e.target.value)}>
                <option value="Hayır">Hayır, standart süre uygun</option>
                <option value="Evet">Evet, öncelikli sonuç bekliyorum</option>
              </select>
            </div>
          </div>

        </div>
      </section>

      {/* GÖNDER */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
        <label className="flex items-start gap-3 cursor-pointer group flex-1">
          <input required type="checkbox" className="mt-1 accent-pink-600 w-4 h-4 rounded" onChange={e => handleUpdate("kvkkOnay", e.target.checked)} />
          <span className="text-xs text-slate-500 group-hover:text-slate-800 transition-colors leading-relaxed">
            <strong className="text-slate-700">KVKK Metnini</strong> okudum, kişisel verilerimin iletişim amacıyla işlenmesini onaylıyorum.
          </span>
        </label>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto bg-slate-900 hover:bg-pink-600 text-white px-10 py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md disabled:opacity-50"
        >
          {loading ? "Gönderiliyor..." : "Teklif Talebini Gönder"} <Send className="w-4 h-4" />
        </button>
      </div>

    </form>
  );
}