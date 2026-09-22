"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ArrowRight, MessageCircle, ClipboardList, Beaker, Check, AlertCircle, CheckCircle2, ChevronDown, Mail } from "lucide-react";

import { getServiceBySlug, getRelatedServices } from "@/content/services";

const imageMap: Record<string, string> = {
  // Moleküler Biyoloji
  "nukleik-asit-protein-izolasyonu": "nukleik asit-izolasyonu.jpg",
  "primer-tasarimi": "primer-tasarimi.jpeg",
  "jel-elektroforezi": "gel-elektroforezi.jpg",
  "nukleik-asitlerde-miktar-tayini": "miktar-tayini.jpeg",
  "pcr": "pcr-analizi.jpeg",
  "rt-pcr": "rtpcr-analizi.jpeg",
  // Dizileme
  "sanger-dizileme": "sanger-dizileme.png",
  "wgs": "wgs-analizi.jpeg",
  "wes": "wes-analizi.jpeg",
  "targeted-sequencing": "targeted-seq-analizi.jpg",
  "rna-seq": "rna seq.jpeg",
  "shotgun-metagenomik": "shotgun-metagenomik-analizi.jpg",
  "16s-rrna": "16s-rrna-amplicon-analizi.gif",
  // Protein
  "western-blot": "western-bloth-analzi.jpeg",
  "elisa": "elisa-analizi.jpeg",
  "rekombinant-protein-analizi": "rekombinant-protein-analizi.webp",
  // Biyoenformatik
  "ngs-veri-analizi": "ngs-veri-analizi.jpeg",
  "rna-seq-analizi": "rna-seq-veri-analizi.jpeg",
  "diferansiyel-gen-ekspresyonu": "differansiyel-gen-analizi.jpeg",
  "varyant-analizi": "varyant-analizi.jpeg",
  "filogenetik-analiz": "filogenetik-analiz.jpg",
  "metagenomik-veri-analizi": "shotgun-metagenomik-veri-analizi.jpeg",
  "biyoinformatik-raporlama": "bilimsel-raporlama.jpeg",
  "genomik-veri-analizi": "genomik-veri-analizi.jpeg",
  // Danışmanlık
  "proje-danismanlik": "proje-ve-danismanlik.jpeg",
  "yerinde-hizmet-modulu": "yerinde-hizmet-modulu.jpeg",
  "kurumsal-ve-akademik-egitimler": "kurumsal-akademik-egitimler.jpg",
  "deney-tasarimi": "deney-tasarimi.jpeg",
  "istatistiksel-analiz": "istatistik-analizi.png",
  "bilimsel-raporlama": "bilimsel-raporlama.jpeg",
  "yayin-danismanligi": "yayin-danismanligi.jpeg",
  // Biyokimya & Patoloji
  "oksidatif-stres-analizleri": "oksidatif-stress.jpeg",
  "biyokimya-test-analizleri": "biyokimya-testleri.jpeg",
  "spesifik-test-analizleri": "spesifik-test-analizleri.webp",
  "elisa-test-analizleri": "elisa-analizi.jpeg",
  "immunohistokimya-boyama": "immunohistokimya-test.jpeg",
  // Hücre Kültürü
  "ilac-gelistirme-toksisite": "hucre-kulturu-analizi.jpg",
  "hucre-kulturu-elisa": "hucre-kulturu-analizi.jpg",
  "proliferasyon-migrasyon": "hucre-kulturu-analizi.jpg",
  "genetik-muhendisligi-transfeksiyon": "hucre-kulturu-analizi.jpg",
  "kok-hucre-teknolojileri": "hucre-kulturu-analizi.jpg"
};

export default function HizmetDetayPage() {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !id) return null;

  const hizmet = getServiceBySlug(id);

  if (!hizmet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Hizmet Bulunamadı</h1>
        <p className="text-slate-600 mb-8 text-lg">Aradığınız hizmete ulaşılamıyor veya adresi değişmiş olabilir.</p>
        <Link href="/hizmetler" className="bg-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-700 transition-colors shadow-lg shadow-pink-600/20">
          Tüm Hizmetlere Dön
        </Link>
      </div>
    );
  }

  const exactImageName = imageMap[hizmet.slug] || `${hizmet.slug}.jpeg`;
  const imagePath = `/images/hizmet-görselleri/${exactImageName}`;
  const related = getRelatedServices(hizmet) || [];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24 text-slate-800">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        <nav className="flex text-xs font-medium text-slate-500 mb-6">
          <Link href="/" className="hover:text-pink-600 transition-colors">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/hizmetler" className="hover:text-pink-600 transition-colors">Hizmetler</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{hizmet.name}</span>
        </nav>

        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm relative">
          
          <div className="relative w-full h-64 md:h-80 bg-slate-900">
            {!imgError && (
              <Image 
                src={imagePath}
                alt={hizmet.name}
                fill
                className="object-cover"
                onError={() => setImgError(true)} 
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-center md:text-left">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-pink-100 bg-pink-600/80 backdrop-blur-md px-3 py-1.5 rounded-full mb-3 border border-pink-400/30">
                {hizmet.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                {hizmet.name}
              </h1>
              {hizmet.heroDescription && (
                 <p className="text-slate-200 mt-3 text-lg hidden md:block">{hizmet.heroDescription}</p>
              )}
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            
            {/* Tek Sütun Tam Genişlik ve İki Yana Yaslı Açıklama Alanı */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-pink-600 mb-4 flex items-center gap-2 border-b border-pink-100 pb-3">
                  <Beaker className="w-6 h-6" /> Hizmete Genel Bakış
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed whitespace-pre-wrap text-justify">
                  {hizmet.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <a 
                    href={`https://wa.me/905522207270?text=Merhaba,%20${hizmet.name}%20hizmeti%20için%20bilgi%20ve%20teklif%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Teklif İste (WhatsApp)
                  </a>

                  <a 
                    href={`mailto:info@coregenbiyoteknoloji.com?subject=${hizmet.name} Hakkında Bilgi Talebi`} 
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                    title="E-posta Gönderin"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </section>

            {hizmet.importance && (
              <div className="bg-blue-50/50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-8">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600" /> Bu Hizmet Neden Önemli?
                </h4>
                <p className="text-sm text-slate-700 whitespace-pre-wrap text-justify">{hizmet.importance}</p>
              </div>
            )}

            {hizmet.deliverables && hizmet.deliverables.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-5">→ Neleri İnceleyebilir / Elde Edebilirsiniz?</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
                  {hizmet.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-pink-500 shadow-sm" /> 
                      <span className="font-medium text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hizmet.applicationAreas && hizmet.applicationAreas.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-5">→ Uygulama Alanları</h3>
                <div className="flex flex-wrap gap-2">
                  {hizmet.applicationAreas.map((alan, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 shadow-sm">
                      {alan}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {hizmet.scope && hizmet.scope.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-5">→ Hizmet Kapsamı</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {hizmet.scope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm shadow-sm">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hizmet.workflowSteps && hizmet.workflowSteps.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-5">→ Çalışma Süreci</h3>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <ol className="space-y-4 border-l-2 border-pink-200 ml-4 pl-6">
                    {hizmet.workflowSteps.map((step, idx) => (
                      <li key={idx} className="relative text-slate-700 font-medium text-sm">
                        <span className="absolute -left-[35px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold border-2 border-white shadow-sm">
                          {idx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {hizmet.requiredInfo && hizmet.requiredInfo.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Müşteriden İstenen Bilgiler</h3>
                  <ul className="space-y-2">
                    {hizmet.requiredInfo.map((info, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> {info}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {hizmet.qualityControl && hizmet.qualityControl.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Kalite Kontrol</h3>
                  <ul className="space-y-2">
                    {hizmet.qualityControl.map((qc, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" /> {qc}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <section className="pt-6 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">→ Neden CoreGen?</h3>
              {hizmet.whyCoreGen ? (
                 <p className="text-slate-700 bg-pink-50 p-6 rounded-2xl border border-pink-100 text-sm leading-relaxed mb-6 shadow-sm text-justify">
                   {hizmet.whyCoreGen}
                 </p>
              ) : (
                 <p className="text-slate-700 bg-pink-50 p-6 rounded-2xl border border-pink-100 text-sm leading-relaxed mb-6 shadow-sm text-justify">
                   Proje bazlı çalışma anlayışımızla akademik araştırmacıların vizyonunu, teknik laboratuvar deneyimimizle birleştiriyoruz.
                 </p>
              )}
            </section>

            {hizmet.faqs && hizmet.faqs.length > 0 && (
              <section className="pt-6 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">→ Sıkça Sorulan Sorular</h3>
                <div className="space-y-3">
                  {hizmet.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left px-5 py-4 font-bold text-slate-800 flex justify-between items-center hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-sm">{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-pink-500 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-pink-50 rounded-[2rem] p-8 md:p-12 border border-pink-100 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Projeniz İçin Teklif Alın</h3>
              <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                Çalışmanızın amacı, numune türü ve örnek sayısı gibi temel bilgileri bizimle paylaşarak araştırma projenize özel teklif alabilirsiniz.
              </p>
              
              <div className="flex justify-center gap-3">
                <a 
                  href={`https://wa.me/905522207270?text=Merhaba,%20${hizmet.name}%20hizmeti%20için%20özel%20teklif%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp ile Teklif İste
                </a>
              </div>
            </section>

            {related && related.length > 0 && (
               <section className="pt-12 border-t border-slate-100">
                 <h3 className="text-xl font-bold text-slate-900 mb-6">İlgili Diğer Hizmetlerimiz</h3>
                 <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                   {related.map((rel: any) => (
                     <Link key={rel.slug} href={`/hizmetler/${rel.slug}`} className="group p-4 bg-white rounded-2xl border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all flex flex-col justify-between h-full">
                       <h4 className="font-bold text-slate-800 text-sm group-hover:text-pink-600 transition-colors mb-2">{rel.name}</h4>
                       <span className="text-xs font-bold text-pink-500 flex items-center gap-1">İncele <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></span>
                     </Link>
                   ))}
                 </div>
               </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}