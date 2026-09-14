"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, FlaskConical, FileText, MessageSquare, Users, LogOut } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string>("admin");

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("coregen_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const emailLower = (user.email || "").toLowerCase();
        const roleStr = (user.role || "").toLowerCase();

        if (emailLower.includes("tolga") || roleStr.includes("personel")) {
          setUserRole("personel");
        } else {
          setUserRole("admin");
        }
      }
    } catch (e) {
      // Hata koruması
    }
  }, []);

  const menuItems = [
    { name: "Profilim", href: "/admin", icon: User },
    { name: "Ürünler ve Cihazlar", href: "/admin/urunler", icon: Package },
    { name: "Hizmetler", href: "/admin/hizmetler", icon: FlaskConical },
    { name: "Teklifler ve Talepler", href: "/admin/teklifler", icon: FileText },
    { name: "Mesajlar", href: "/admin/mesajlar", icon: MessageSquare },
    { name: "Profiller", href: "/admin/profiller", icon: Users },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 md:static w-64 bg-white border-r border-slate-200 text-slate-700 flex flex-col justify-between p-6 h-full min-h-screen shrink-0 shadow-lg md:shadow-sm">
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] uppercase tracking-wider font-bold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-md border border-pink-100">
            CoreGen Biyoteknoloji
          </span>
          <h2 className="text-sm font-black text-slate-900 pt-1">
            {userRole === "personel" ? "Personel Çalışma Paneli" : "Yönetim Paneli"}
          </h2>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-pink-600 text-white shadow-md shadow-pink-600/20"
                    : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={() => {
            localStorage.removeItem("coregen_user");
            window.location.href = "/admin/giris";
          }}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Güvenli Çıkış
        </button>
      </div>
    </aside>
  );
}