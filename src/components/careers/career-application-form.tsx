"use client";

import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle, FileUp, Loader2, MessageCircle, X } from "lucide-react";
import { careerApplicationSchema, MAX_CV_SIZE_BYTES, ACCEPTED_CV_TYPE } from "@/lib/validation/career-schema";

export function CareerApplicationForm({ jobTitle }: { jobTitle?: string }) {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ whatsappUrl: string; reference: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const submitLock = useRef(false);
  const fieldClass = "w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:ring-2 focus:ring-pink-500 outline-none";
  const labelClass = "block text-xs font-bold text-slate-700 uppercase mb-2";

  function selectFile(file: File | null) {
    setError("");
    setCvFile(null);
    if (!file) return;
    if (file.type !== ACCEPTED_CV_TYPE || file.size === 0 || file.size > MAX_CV_SIZE_BYTES) {
      setError("Lütfen en fazla 4 MB boyutunda bir PDF seçin.");
      if (fileInput.current) fileInput.current.value = "";
      return;
    }
    setCvFile(file);
  }
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    selectFile(event.target.files?.[0] || null);
  }
  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!busy) selectFile(event.dataTransfer.files[0] || null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return;
    setError("");
    const form = new FormData(event.currentTarget);
    const parsed = careerApplicationSchema.safeParse({
      firstName: form.get("firstName"), lastName: form.get("lastName"),
      email: form.get("email"), phone: form.get("phone"),
      expertise: form.get("expertise") || "", jobTitle: jobTitle || "Genel Başvuru",
      coverNote: form.get("coverNote") || "", kvkkConsent: form.get("kvkkConsent") === "on",
    });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || "Formu kontrol edin."); return; }
    if (!cvFile) { setError("Lütfen PDF özgeçmişinizi seçin."); return; }
    submitLock.current = true;
    setBusy(true);
    try {
      const payload = new FormData();
      payload.set("values", JSON.stringify(parsed.data));
      payload.set("cv", cvFile);
      const response = await fetch("/api/career-whatsapp", { method: "POST", body: payload });
      if (response.status === 413) throw new Error("Dosya çok büyük. En fazla 4 MB boyutunda PDF seçin.");
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Başvuru hazırlanamadı.");
      const url = new URL(data.whatsappUrl);
      if (url.origin !== "https://wa.me" || url.pathname !== "/905522207270") throw new Error("WhatsApp bağlantısı hazırlanamadı.");
      setResult({ whatsappUrl: url.href, reference: String(data.reference) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bağlantı kurulamadı. Yeniden deneyin.");
    } finally {
      setBusy(false);
      submitLock.current = false;
    }
  }

  if (result) return (
    <div className="bg-green-50 rounded-3xl p-8 text-center border border-green-100 space-y-4" role="status">
      <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
      <h4 className="text-xl font-bold text-green-900">Başvurunuz WhatsApp için hazır!</h4>
      <p className="text-green-700 text-sm">CV’niz yüklendi. Bilgilerinizi ve CV bağlantınızı iletmek için aşağıdaki butona basın, ardından WhatsApp’ta Gönder’i seçin.</p>
      <a href={result.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-cyan-600 px-6 py-4 font-bold text-white">
        <MessageCircle className="h-5 w-5" /> WhatsApp’tan Başvuruyu Gönder
      </a>
      <p className="text-xs text-green-700">CV bağlantısı 7 gün geçerlidir. WhatsApp mesajının gönderildiği bu sayfadan doğrulanamaz.</p>
      <p className="break-all text-xs text-slate-500">Referans: {result.reference}</p>
      <Link href="/kurumsal/kariyer" className="block text-sm font-semibold text-pink-600 hover:underline">Kariyer Sayfasına Dön</Link>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6 relative z-10" aria-busy={busy}>
      <fieldset disabled={busy} className="space-y-6 disabled:opacity-70">
        {jobTitle && <p className="rounded-xl bg-pink-50 p-4 text-sm text-pink-700"><strong>Başvurulan Pozisyon:</strong> {jobTitle}</p>}
        <div className="grid gap-6 md:grid-cols-2">
          <div><label htmlFor="career-firstName" className={labelClass}>Ad *</label><input id="career-firstName" name="firstName" required minLength={2} maxLength={100} autoComplete="given-name" placeholder="Adınız" className={fieldClass} /></div>
          <div><label htmlFor="career-lastName" className={labelClass}>Soyad *</label><input id="career-lastName" name="lastName" required minLength={2} maxLength={100} autoComplete="family-name" placeholder="Soyadınız" className={fieldClass} /></div>
          <div><label htmlFor="career-email" className={labelClass}>E-posta Adresi *</label><input id="career-email" name="email" required type="email" maxLength={254} autoComplete="email" placeholder="ornek@email.com" className={fieldClass} /></div>
          <div><label htmlFor="career-phone" className={labelClass}>Telefon Numarası *</label><input id="career-phone" name="phone" required type="tel" minLength={10} maxLength={30} autoComplete="tel" placeholder="05XX XXX XX XX" className={fieldClass} /></div>
          <div className="md:col-span-2"><label htmlFor="career-expertise" className={labelClass}>Uzmanlık / İlgi Alanı</label><input id="career-expertise" name="expertise" maxLength={200} placeholder="Örn: Moleküler Biyoloji" className={fieldClass} /></div>
        </div>
        <div><label htmlFor="career-coverNote" className={labelClass}>Ön Yazı / Mesajınız</label><textarea id="career-coverNote" name="coverNote" rows={3} maxLength={2000} placeholder="Ekibimize katılarak neler yapabileceğinizden bahsedin..." className={fieldClass} /></div>
        <div className="space-y-2">
          <label htmlFor="career-cv" className={labelClass}>Özgeçmiş (PDF, en fazla 4 MB) *</label>
          <div onDragOver={event => event.preventDefault()} onDrop={handleDrop} className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-slate-50 hover:border-pink-500 transition-all">
            <FileUp className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">PDF dosyanızı sürükleyin veya aşağıdan seçin.</p>
            <input ref={fileInput} id="career-cv" type="file" accept="application/pdf,.pdf" onChange={handleFileChange} className="mt-4 max-w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 cursor-pointer mx-auto block" />
            {cvFile && <p className="mt-3 flex items-center justify-center gap-2 break-all text-sm text-slate-700">{cvFile.name}<button type="button" aria-label="CV dosyasını kaldır" onClick={() => { selectFile(null); if (fileInput.current) fileInput.current.value = ""; }}><X className="h-4 w-4" /></button></p>}
            <p className="mt-3 text-xs text-slate-500">CV’niz özel depolama alanına yüklenir; 7 gün geçerli indirme bağlantısı WhatsApp mesajınıza eklenir.</p>
          </div>
        </div>
        <label className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"><input name="kvkkConsent" type="checkbox" required className="mt-1 shrink-0" /><span>KVKK Aydınlatma Metni’ni okudum, kişisel verilerimin işlenmesini kabul ediyorum.</span></label>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-cyan-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-pink-600/20 hover:opacity-95 transition-all flex items-center justify-center gap-2">
          {busy ? <><Loader2 className="h-5 w-5 animate-spin" /> CV yükleniyor…</> : <><MessageCircle className="h-5 w-5" /> WhatsApp Başvurusunu Hazırla</>}
        </button>
      </fieldset>
    </form>
  );
}
