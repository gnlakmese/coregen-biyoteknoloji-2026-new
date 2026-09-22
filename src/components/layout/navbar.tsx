"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, Dna, PlusCircle, User, MessageCircle } from "lucide-react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/lib/nav-config";
import { serviceCategoryOutline } from "@/content/services";
import { transitionBase } from "@/lib/motion";

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState<string>("guest");
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Sayfa kaydırma dinleyicisi
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Oturum açmış kullanıcıyı ve rolünü kontrol et
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("coregen_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        const emailLower = (user.email || "").toLowerCase();
        const roleStr = (user.role || "").toLowerCase();

        if (emailLower.includes("gonul") || roleStr.includes("admin")) {
          setUserRole("admin");
        } else if (emailLower.includes("tolga") || emailLower.includes("@coregenbiyoteknoloji.com") || roleStr.includes("personel")) {
          setUserRole("personel");
        } else {
          setUserRole("musteri");
        }
      } else {
        setCurrentUser(null);
        setUserRole("guest");
      }
    } catch (e) {
      // Hata koruması
    }
  }, [pathname]);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function scheduleClose() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 120);
  }

  function cancelClose() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }

  const getDashboardLink = () => {
    if (userRole === "admin") return "/admin/urunler";
    if (userRole === "personel") return "/personel";
    return "/musteri/profil";
  };

  const headerStyle = isHome && !scrolled
    ? "bg-transparent text-white border-transparent" 
    : "bg-white/95 backdrop-blur-md text-gray-900 border-b border-gray-200 shadow-md";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerStyle}`}>
      
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        İçeriğe atla
      </a>

      <div className="container flex h-16 items-center justify-between gap-4 lg:h-20">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="relative z-10 flex items-center gap-2.5 transition-transform hover:scale-105"
          style={{ textShadow: "none", boxShadow: "none" }}
        >
          <Dna className={`w-7 h-7 ${isHome && !scrolled ? "text-white" : "text-pink-600"}`} style={{ filter: "none" }} />
          <span className="font-mono uppercase flex items-baseline">
            <span className={`font-extrabold text-lg tracking-[0.15em] mr-2 ${isHome && !scrolled ? "text-white" : "text-gray-900"}`} style={{ textShadow: "none" }}>
              COREGEN
            </span>
            <span className={`font-light text-[10px] tracking-[0.2em] hidden sm:inline-block ${isHome && !scrolled ? "text-white/80" : "text-gray-600"}`} style={{ textShadow: "none" }}>
              BİYOTEKNOLOJİ
            </span>
          </span>
        </Link>

        {/* Masaüstü Navigasyon */}
        <nav aria-label="Ana menü" className="hidden lg:flex lg:items-center lg:gap-2">
          {primaryNav.map((menu) => {
            const hasGroups = !!menu.groups?.length || menu.label === "Hizmetler";
            const isOpen = openMenu === menu.label;

            return (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => {
                  if (!hasGroups) return;
                  cancelClose();
                  setOpenMenu(menu.label);
                }}
                onMouseLeave={hasGroups ? scheduleClose : undefined}
              >
                <Link
                  href={menu.href}
                  aria-expanded={hasGroups ? isOpen : undefined}
                  onFocus={() => hasGroups && setOpenMenu(menu.label)}
                  className={`flex items-center gap-1.5 rounded-md px-3.5 py-2 text-base font-bold transition-all ${
                    isHome && !scrolled 
                      ? "text-white hover:bg-white/10" 
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                  style={{ textShadow: "none", boxShadow: "none" }}
                >
                  {menu.label}
                  {hasGroups && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {hasGroups && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={transitionBase}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      className={`absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-2xl p-6 shadow-2xl text-gray-950 ${
                        menu.label === "Hizmetler" ? "w-[min(95vw,980px)]" : "w-[min(92vw,420px)]"
                      }`}
                    >
                      {menu.label === "Hizmetler" ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                          {serviceCategoryOutline.map((cat, idx) => (
                            <div key={idx} className="space-y-2">
                              <h4 className="font-mono text-xs uppercase tracking-wider text-pink-600 font-extrabold border-b border-gray-200 pb-1.5">
                                {cat.category}
                              </h4>
                              <ul className="space-y-1">
                                {cat.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    {item.slug ? (
                                      <Link
                                        href={`/hizmetler/${item.slug}`}
                                        className="text-xs font-medium text-gray-700 transition-colors hover:text-pink-600 hover:bg-pink-50/80 px-2 py-1 rounded-md block"
                                      >
                                        {item.name}
                                      </Link>
                                    ) : (
                                      <span className="text-xs text-gray-400 px-2 py-1 block cursor-not-allowed">
                                        {item.name} <span className="text-[10px]">(Çok Yakında)</span>
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {menu.groups!.map((group) => (
                            <div key={group.title || group.items[0]?.href}>
                              {group.title && (
                                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pink-600 font-extrabold border-b border-gray-200 pb-1.5">
                                  {group.title}
                                </p>
                              )}
                              <ul className="space-y-1.5">
                                {group.items.map((item) => (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      className="text-sm font-medium text-gray-800 transition-colors hover:text-pink-600 hover:bg-pink-50/80 px-2 py-1.5 rounded-md block"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-6 border-t border-gray-200 pt-4">
                        <Link
                          href={menu.href}
                          className="text-xs font-bold text-pink-600 hover:text-pink-700 hover:underline flex items-center gap-1"
                        >
                          Tümünü Gör →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Sağ Alan / Butonlar */}
        <div className="flex items-center gap-2">
          {/* Hizmet Oluştur Butonu - Sadece Admin veya Personel Görür */}
          {(userRole === "admin" || userRole === "personel") && (
            <Button variant="ghost" size="sm" asChild className={`hidden xl:flex items-center gap-1.5 ${isHome && !scrolled ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}>
              <Link href="/admin/hizmet-olustur">
                <PlusCircle className="h-4 w-4 text-pink-500" />
                <span>Hizmet Oluştur</span>
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" asChild aria-label="Ara" className={`${isHome && !scrolled ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-gray-700"}`} style={{ boxShadow: "none" }}>
            <Link href="/arama">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          {/* GİRİŞ YAP / İKAS BAĞLANTISI */}
          {currentUser ? (
            <Button
              variant="outline"
              size="sm"
              asChild
              className={`hidden md:inline-flex items-center gap-2 font-bold text-xs px-4 py-5 rounded-xl transition-all ${
                isHome && !scrolled
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100"
              }`}
            >
              <Link href={getDashboardLink()}>
                <User className="w-4 h-4" />
                <span className="truncate max-w-[120px]">{currentUser.name || currentUser.email}</span>
              </Link>
            </Button>
          ) : (
            <a
              href="https://magazanin-adi.myikas.com/account/login"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center gap-1.5 font-bold text-xs px-4 py-2.5 rounded-xl transition-all border ${
                isHome && !scrolled
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Giriş Yap / Üye Ol</span>
            </a>
          )}

          {/* TEKLİF İSTE -> WHATSAPP HATTINA YÖNLENDİRİLDİ */}
          <a 
            href="https://wa.me/905522207270?text=Merhaba,%20web%20sitenizden%20hizmetleriniz%20hakkında%20bilgi%20ve%20teklif%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-1 hidden lg:inline-flex items-center gap-2 font-bold text-base px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg ${
              isHome && !scrolled 
                ? "bg-white text-slate-900 hover:bg-slate-100" 
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30"
            }`}
            style={{ boxShadow: "none", textShadow: "none", filter: "none" }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Teklif İste</span>
          </a>

          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${isHome && !scrolled ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            style={{ boxShadow: "none" }}
            aria-label="Menüyü aç"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}