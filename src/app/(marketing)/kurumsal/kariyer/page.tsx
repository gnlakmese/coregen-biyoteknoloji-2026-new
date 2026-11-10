"use client";

import { useState } from "react";
import { Briefcase, Sparkles, Dna } from "lucide-react";
import { CareerApplicationForm } from "@/components/careers/career-application-form";

export default function KariyerPage() {
  const [position, setPosition] = useState("Genel Başvuru");
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 bg-pink-50 px-3.5 py-1.5 rounded-full mb-4">CoreGen Ekibi</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Geleceği Birlikte <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-cyan-600">Tasarlayalım</span></h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">Bilimsel merakı ve teknik uzmanlığı bir arada tutan dinamik ekibimizin bir parçası olun.</p>
      </div>
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] p-10 md:p-12 text-center shadow-sm border border-slate-100 mb-12">
          <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Briefcase className="w-8 h-8" /></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Akademik Temsilci Aranmaktadır</h2>
          <p className="text-slate-600 text-base max-w-lg mx-auto">CoreGen Biyoteknoloji akademik temsilci başvurularını bekliyor. Bilgilerinizi ve özgeçmişinizi aşağıdaki form üzerinden paylaşabilirsiniz.</p>
          <a href="#kariyer-basvuru" onClick={() => setPosition("Akademik Temsilci")} className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-cyan-600 px-6 py-3 font-bold text-white hover:opacity-95">Akademik Temsilci Başvurusu Yap</a>
        </div>
        <div id="kariyer-basvuru" className="relative scroll-mt-28 bg-white/80 backdrop-blur-2xl border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center"><Dna className="w-[800px] h-[800px] text-pink-600 animate-pulse" /></div>
          <div className="relative z-10 flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
            <div className="p-2.5 bg-cyan-50 text-cyan-700 rounded-xl"><Sparkles className="w-6 h-6" /></div>
            <div><h2 className="text-xl font-bold text-slate-900">{position} Formu</h2><p className="text-xs text-slate-500">Bilgilerinizi ve CV bağlantınızı WhatsApp üzerinden iletin.</p></div>
          </div>
          <div className="relative z-10 mb-6">
            <label htmlFor="career-position" className="block text-xs font-bold text-slate-700 uppercase mb-2">Başvuru Türü</label>
            <select id="career-position" value={position} onChange={event => setPosition(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:ring-2 focus:ring-pink-500 outline-none"><option>Genel Başvuru</option><option>Akademik Temsilci</option></select>
          </div>
          <CareerApplicationForm key={position} jobTitle={position} />
        </div>
      </div>
    </div>
  );
}
