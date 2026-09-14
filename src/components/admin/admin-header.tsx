"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X, Plus } from "lucide-react";

import { adminLogout } from "@/actions/admin-auth-actions";
import { Button } from "@/components/ui/button";
import { adminNavItems } from "@/lib/admin-nav-config";
import { iconMap } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

export function AdminHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("coregen_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.email === "gonulakmese@coregenbiyoteknoloji.com") {
          setIsAdmin(true);
        }
      }
    } catch (e) {
      // Storage okuma hatası koruması
    }
  }, []);

  const currentPage = adminNavItems.find((item) =>
    item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href),
  );

  async function handleLogout() {
    await adminLogout();
    router.push("/admin/giris");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md px-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-700 hover:bg-slate-100"
          aria-label="Menüyü aç"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-base font-bold text-slate-900">
          {currentPage?.label ?? "Admin Paneli"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {isAdmin && (
          <Button asChild variant="default" size="sm" className="bg-pink-600 hover:bg-pink-700 text-white shadow-sm">
            <Link href="/admin/hizmetler">
              <Plus className="h-4 w-4 mr-1" />
              Hizmet Ekle
            </Link>
          </Button>
        )}

        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-600 hover:text-rose-600 hover:bg-rose-50">
          <LogOut className="h-4 w-4 mr-1" />
          Çıkış Yap
        </Button>
      </div>

      {/* Mobil Menü Çekmecesi - Beyaz Ekran ve Görünürlük Düzeltildi */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <nav className="relative flex w-72 flex-col bg-white border-r border-slate-200 p-6 shadow-2xl h-full z-10 overflow-y-auto">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[9px] uppercase tracking-wider font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-100">
                  CoreGen
                </span>
                <span className="block font-bold text-sm text-slate-900 mt-1">Yönetim Paneli</span>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900" aria-label="Kapat" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-1.5">
              {adminNavItems.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all",
                      isActive 
                        ? "bg-pink-600 text-white shadow-md shadow-pink-600/20" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}