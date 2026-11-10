"use client";
import { useRef, useState, type FormEvent } from "react";
import { Send, CheckCircle, FileUp, Sparkles, Loader2 } from "lucide-react";

export default function IletisimPage() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);
  const fieldClass = "w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:ring-2 focus:ring-pink-500 outline-none";
  const labelClass = "block text-xs font-bold text-slate-700 uppercase mb-2";
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    setError("");
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) || "").trim();
    if (["name", "email", "phone", "institution", "department", "message"].some(key => !get(key))) { setError("Lütfen zorunlu alanları doldurun."); return; }
    const file = data.get("file");
    const hasFile = file instanceof File && file.name !== "";
    if (hasFile && (file.size === 0 || file.size > 4 * 1024 * 1024 || file.type !== "application/pdf")) { setError("En fazla 4 MB boyutunda PDF seçin. Diğer dosyaları WhatsApp açıldığında ekleyebilirsiniz."); return; }
    lock.current = true;
    setBusy(true);
    try {
      let fileUrl = "";
      if (hasFile) {
        const upload = new FormData(); upload.set("file", file);
        const response = await fetch("/api/contact-attachment", { method: "POST", body: upload });
        if (response.status === 413) throw new Error("Dosya çok büyük. En fazla 4 MB PDF seçin.");
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error || "Dosya yüklenemedi.");
        if (typeof result.fileUrl !== "string" || new URL(result.fileUrl).protocol !== "https:") throw new Error("Dosya bağlantısı hazırlanamadı.");
        fileUrl = result.fileUrl;
      }
      const message = ["*COREGEN İLETİŞİM TALEBİ*", `İsim Soyisim: ${get("name")}`, `E-posta: ${get("email")}`, `Telefon: ${get("phone")}`, `Kurum / Okul: ${get("institution")}`, `Sınıf / Departman: ${get("department")}`, "", `Mesaj: ${get("message")}`, ...(fileUrl ? ["", "PDF bağlantısı (7 gün geçerli):", fileUrl] : [])].join("\n");
      setUrl(`https://wa.me/905522207270?text=${encodeURIComponent(message)}`);
    } catch (err) { setError(err instanceof Error ? err.message : "Bağlantı kurulamadı. Tekrar deneyin."); }
    finally { lock.current = false; setBusy(false); }
  }
  return <div className="min-h-screen bg-slate-50 pt-28 pb-24 text-slate-800">
    <div className="max-w-4xl mx-auto px-6 space-y-12">
      <div className="text-center">
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 bg-pink-50 px-3.5 py-1.5 rounded-full mb-4">İletişim & Destek</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Bizimle <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-cyan-600">İletişime Geçin</span></h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">Projeleriniz, sorularınız veya iş birlikleriniz için formu doldurarak ekibimize doğrudan ulaşabilirsiniz.</p>
      </div>
      <div className="bg-white/95 backdrop-blur-xl border border-pink-100/80 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-pink-500/5 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4"><div className="p-2.5 bg-pink-50 text-pink-600 rounded-xl"><Sparkles className="w-6 h-6" /></div><div><h3 className="text-xl font-bold text-slate-900">Doğrudan İletişim Formu</h3><p className="text-xs text-slate-500">Talebinizi WhatsApp üzerinden ekibimize iletin.</p></div></div>
        {url ? <div className="bg-green-50 border border-green-100 rounded-3xl p-8 text-center space-y-3" role="status">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto" /><h4 className="text-xl font-bold text-green-900">Mesajınız hazır!</h4>
          <p className="text-green-700 text-sm">Aşağıdaki butona basın, ardından WhatsApp’ta Gönder’i seçin. Mesajınız henüz gönderilmedi.</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-cyan-600 px-6 py-4 font-bold text-white">WhatsApp’tan Gönder <Send className="w-4 h-4" /></a>
        </div> : <form onSubmit={handleSubmit} aria-busy={busy}><fieldset disabled={busy} className="space-y-6 disabled:opacity-70">
          <div className="grid gap-6 md:grid-cols-2"><div><label htmlFor="contact-name" className={labelClass}>İsim Soyisim *</label><input id="contact-name" name="name" required type="text" maxLength={150} placeholder="Adınız Soyadınız" className={fieldClass} /></div>
<div><label htmlFor="contact-email" className={labelClass}>E-posta Adresi *</label><input id="contact-email" name="email" required type="email" maxLength={254} placeholder="ornek@email.com" className={fieldClass} /></div>
<div><label htmlFor="contact-phone" className={labelClass}>Telefon Numarası *</label><input id="contact-phone" name="phone" required type="tel" maxLength={30} placeholder="05XX XXX XX XX" className={fieldClass} /></div>
<div><label htmlFor="contact-institution" className={labelClass}>Kurum / Okul *</label><input id="contact-institution" name="institution" required type="text" maxLength={200} placeholder="Üniversite veya Kurum Adı" className={fieldClass} /></div>
<div><label htmlFor="contact-department" className={labelClass}>Sınıf / Departman *</label><input id="contact-department" name="department" required type="text" maxLength={200} placeholder="Örn: Moleküler Biyoloji / Ar-Ge" className={fieldClass} /></div></div>
          <div><label htmlFor="contact-message" className={labelClass}>Notunuz / Sorularınız *</label><textarea id="contact-message" name="message" rows={4} required maxLength={2000} placeholder="Mesajınızı veya talebinizi detaylı bir şekilde yazın..." className={fieldClass} /></div>
          <div className="space-y-2"><label htmlFor="contact-file" className={labelClass}>Dosya Ekle (Opsiyonel)</label><div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 text-center bg-slate-50 hover:border-pink-500 transition-all">
            <FileUp className="w-7 h-7 text-slate-400 mx-auto mb-2" /><p className="text-sm font-medium text-slate-600">PDF seçin (en fazla 4 MB).</p>
            <input id="contact-file" name="file" type="file" accept="application/pdf,.pdf" className="mt-2 max-w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-pink-50 file:text-pink-700 cursor-pointer mx-auto block" />
            <p className="mt-3 text-xs text-slate-500">PDF özel alana yüklenir ve 7 gün geçerli bağlantısı mesajınıza eklenir. Diğer dosya türlerini WhatsApp’ta ekleyebilirsiniz.</p>
          </div></div>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-cyan-600 hover:opacity-95 text-white py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2">{busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Hazırlanıyor…</> : <>WhatsApp Mesajını Hazırla <Send className="w-4 h-4" /></>}</button>
        </fieldset></form>}
      </div>
    </div>
  </div>;
}
