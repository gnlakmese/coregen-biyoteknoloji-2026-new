"use client";

import { useState } from "react";
import { Megaphone, Plus, Trash2, Edit, GraduationCap, PlayCircle, Radio, CheckCircle2, X, Image as ImageIcon, Link as LinkIcon, DollarSign } from "lucide-react";

// Ön yüzdeki verilerin panel simülasyonu
const initialDuyurular = [
  { id: 1, text: "🔥 Bu Ayın Özel Oturumu: Epigenetik Perspektif Eğitimine Kayıtlar Başladı!", isActive: true },
  { id: 2, text: "📢 CoreGen Genetik Akademi 2026 Eğitim Takvimi Güncellendi.", isActive: true },
  { id: 3, text: "💡 Sıfırdan Biyoinformatik Bootcamp İçin Son Şans!", isActive: true },
  { id: 4, text: "🚀 Metagenomik Analizlere Giriş Eğitimi Erken Kayıt Fırsatı Devam Ediyor.", isActive: false }
];

const initialEgitimler = [
  { id: 1, title: "Sıfırdan Biyoinformatik Bootcamp", type: "Canlı Eğitim", price: "990 ₺", status: "Aktif", image: "/images/egitim-1.jpg", paymentUrl: "https://www.shopier.com/..." },
  { id: 2, title: "CoreGen Genetik Akademisi", type: "Canlı Eğitim", price: "1.500 ₺", status: "Aktif", image: "/images/egitim-2.jpg", paymentUrl: "https://www.shopier.com/..." },
  { id: 3, title: "Sitogenetik ve Sanal Karyotipleme", type: "Video Eğitim", price: "2.553 ₺", status: "Aktif", image: "/images/egitim-3.jpg", paymentUrl: "https://www.shopier.com/..." },
];

export default function EgitimDuyuruPage() {
  const [duyurular, setDuyurular] = useState(initialDuyurular);
  const [egitimler, setEgitimler] = useState(initialEgitimler);

  // Modal ve Form State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState("Canlı Eğitim");
  const [formPrice, setFormPrice] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formPaymentUrl, setFormPaymentUrl] = useState("");

  const handleOpenNewModal = () => {
    setEditingId(null);
    setFormTitle("");
    setFormType("Canlı Eğitim");
    setFormPrice("");
    setFormImage("");
    setFormPaymentUrl("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (egitim: any) => {
    setEditingId(egitim.id);
    setFormTitle(egitim.title);
    setFormType(egitim.type);
    setFormPrice(egitim.price);
    setFormImage(egitim.image || "");
    setFormPaymentUrl(egitim.paymentUrl || "");
    setIsModalOpen(true);
  };

  const handleSaveEgitim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingId) {
      // Güncelleme
      setEgitimler(prev => prev.map(item => item.id === editingId ? {
        ...item,
        title: formTitle,
        type: formType,
        price: formPrice,
        image: formImage,
        paymentUrl: formPaymentUrl
      } : item));
    } else {
      // Yeni Ekleme
      const newEgitim = {
        id: Date.now(),
        title: formTitle,
        type: formType,
        price: formPrice,
        status: "Aktif",
        image: formImage || "/images/default-egitim.jpg",
        paymentUrl: formPaymentUrl
      };
      setEgitimler(prev => [newEgitim, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteEgitim = (id: number) => {
    if (confirm("Bu eğitimi silmek istediğinize emin misiniz?")) {
      setEgitimler(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      
      {/* DUYURU (MARQUEE) YÖNETİMİ */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-pink-600" /> Kayan Duyuru Bandı (Marquee)
            </h3>
            <p className="text-sm text-slate-500 mt-1">Ana sayfadaki üst bantta kayan yazıları buradan yönetebilirsiniz.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
            <Plus className="w-4 h-4" /> Yeni Duyuru Ekle
          </button>
        </div>

        <div className="p-6">
          <ul className="space-y-3">
            {duyurular.map((duyuru) => (
              <li key={duyuru.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${duyuru.isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                  <span className={`text-sm font-medium ${duyuru.isActive ? 'text-slate-700' : 'text-slate-400 line-through'}`}>
                    {duyuru.text}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded-lg transition-colors" title="Düzenle">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 rounded-lg transition-colors" title="Sil">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* EĞİTİM YÖNETİMİ */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-600" /> Eğitim & Sertifika Programları
            </h3>
            <p className="text-sm text-slate-500 mt-1">Sitede listelenen video veya canlı eğitimlerinizi kod yazmadan kolayca yönetin.</p>
          </div>
          <button 
            onClick={handleOpenNewModal}
            className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Yeni Eğitim Oluştur
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">Eğitim Adı</th>
                <th className="px-6 py-4 font-bold">Eğitim Tipi</th>
                <th className="px-6 py-4 font-bold">Fiyat</th>
                <th className="px-6 py-4 font-bold">Ödeme Linki</th>
                <th className="px-6 py-4 font-bold">Durum</th>
                <th className="px-6 py-4 font-bold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {egitimler.map((egitim) => (
                <tr key={egitim.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                    {egitim.image && (
                      <img src={egitim.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200" onError={(e)=>{(e.target as HTMLElement).style.display='none'}} />
                    )}
                    <span>{egitim.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    {egitim.type === "Canlı Eğitim" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                        <Radio className="w-3.5 h-3.5" /> Canlı Eğitim
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                        <PlayCircle className="w-3.5 h-3.5" /> Video Eğitim
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">{egitim.price}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 truncate max-w-[200px]" title={egitim.paymentUrl}>
                    {egitim.paymentUrl ? <span className="text-blue-600 font-medium underline">{egitim.paymentUrl}</span> : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Yayında
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEditModal(egitim)}
                        className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEgitim(egitim.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* YENİ / DÜZENLEME MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingId ? "Eğitimi Düzenle" : "Yeni Eğitim Oluştur"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEgitim} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Eğitim Adı *</label>
                <input 
                  type="text" 
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="Örn: Sıfırdan Biyoinformatik Bootcamp" 
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Eğitim Tipi</label>
                  <select 
                    value={formType}
                    onChange={e => setFormType(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none bg-white"
                  >
                    <option value="Canlı Eğitim">Canlı Eğitim</option>
                    <option value="Video Eğitim">Video Eğitim</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Fiyat (Örn: 990 ₺)</label>
                  <input 
                    type="text" 
                    value={formPrice}
                    onChange={e => setFormPrice(e.target.value)}
                    placeholder="990 ₺" 
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-pink-500" /> Eğitim Görsel Yolu / URL
                </label>
                <input 
                  type="text" 
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="/images/egitim-adi.jpg veya görsel linki" 
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5 text-blue-500" /> Shopier / PayTR Satın Alma Linki
                </label>
                <input 
                  type="url" 
                  value={formPaymentUrl}
                  onChange={e => setFormPaymentUrl(e.target.value)}
                  placeholder="https://www.shopier.com/..." 
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-pink-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  İptal
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-sm font-bold text-white transition-colors shadow-sm"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}