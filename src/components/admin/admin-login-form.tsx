"use client";

import { useState } from "react";
import { Mail, Lock, User, Phone, Building, Briefcase, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  // Form State'leri
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Mobil tarayıcılar için localStorage kontrolü ve temizliği
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("coregen_user");
      }

      const lowerEmail = email.toLowerCase().trim();

      if (isRegister) {
        if (!name || !surname || !email || !password || !phone || !institution) {
          setError("Lütfen zorunlu alanları (Ad, Soyad, E-posta, Şifre, Telefon, Kurum) doldurun.");
          return;
        }

        const newCustomer = {
          name: `${name} ${surname}`,
          email: lowerEmail,
          phone,
          institution,
          department,
          role: "Müşteri",
          createdAt: new Date().toLocaleDateString()
        };

        if (typeof window !== "undefined" && window.localStorage) {
          const existingCustomers = JSON.parse(localStorage.getItem("coregen_customers") || "[]");
          localStorage.setItem("coregen_customers", JSON.stringify([newCustomer, ...existingCustomers]));
          localStorage.setItem("coregen_user", JSON.stringify(newCustomer));
        }

        router.push("/musteri/profil");
        router.refresh();
        return;

      } else {
        if (!email || !password) {
          setError("E-posta ve şifre gereklidir.");
          return;
        }

        // 1. TOLGA PERSONEL KONTROLÜ (Şifre: Tolga.1907)
        const isTolga = lowerEmail === "tolgaakmese@coregenbiyoteknoloji.com" || lowerEmail.includes("tolga");

        if (isTolga) {
          if (password !== "Tolga.1907") {
            setError("Hatalı şifre! (Tolga için şifre: Tolga.1907)");
            return;
          }

          const personnelUser = {
            name: "Tolga Akmeşe",
            email: lowerEmail,
            role: "Personel"
          };
          
          if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("coregen_user", JSON.stringify(personnelUser));
          }
          
          router.push("/admin/mesajlar");
          router.refresh();
          return;
        }

        // 2. ADMIN KONTROLÜ (Gönül Akmeşe vb.)
        const isAdmin = lowerEmail.includes("gonul") || lowerEmail.startsWith("admin@") || lowerEmail.includes("@coregenbiyoteknoloji.com");

        if (isAdmin) {
          const adminUser = {
            name: "Gönül Akmeşe",
            email: lowerEmail,
            role: "Admin / Kurucu"
          };
          
          if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("coregen_user", JSON.stringify(adminUser));
          }
          
          router.push("/admin");
          router.refresh();
          return;

        } else {
          const customerUser = {
            name: name || lowerEmail.split("@")[0],
            email: lowerEmail,
            phone,
            institution,
            department,
            role: "Müşteri"
          };
          
          if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("coregen_user", JSON.stringify(customerUser));
          }
          
          router.push("/musteri/profil");
          router.refresh();
          return;
        }
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
      setError("Giriş yapılırken bir hata oluştu. Lütfen tarayıcı çerez ayarlarınızı kontrol edin.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Sekme Değiştirici (Giriş Yap / Üye Ol) */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
        <button
          type="button"
          onClick={() => { setIsRegister(false); setError(""); }}
          className={`flex-1 py-2 rounded-lg transition-all ${!isRegister ? "bg-white text-pink-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
        >
          Giriş Yap
        </button>
        <button
          type="button"
          onClick={() => { setIsRegister(true); setError(""); }}
          className={`flex-1 py-2 rounded-lg transition-all ${isRegister ? "bg-white text-pink-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
        >
          Üye Ol
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs p-2.5 rounded-xl font-medium text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {isRegister && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-700">İsim *</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız"
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-700">Soyisim *</label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Soyadınız"
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-700">Telefon Numarası *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-700">Kurum / Üniversite *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Kurum adı"
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-700">Departman</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Bölüm / Lab"
                    className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-700">E-posta Adresi *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@domain.com"
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-700">Şifre *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md shadow-pink-600/20 cursor-pointer"
        >
          <span>{isRegister ? "Hesap Oluştur ve Kaydol" : "Güvenli Giriş Yap"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}