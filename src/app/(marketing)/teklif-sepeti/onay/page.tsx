"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { readQuoteDraft } from "@/components/quote/product-quote-cart";

import { Button } from "@/components/ui/button";

function QuoteConfirmationContent() {
  const searchParams = useSearchParams();
  const quoteNumber = searchParams.get("q");
  const isWhatsapp = searchParams.get("kanal") === "whatsapp";
  const [draftUrl, setDraftUrl] = useState<string | null>(null);
  useEffect(() => { if (isWhatsapp) setDraftUrl(readQuoteDraft()); }, [isWhatsapp]);

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <CheckCircle2 className="h-7 w-7" />
      </div>

      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-magenta">
          Teklif Talebi
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {isWhatsapp ? "WhatsApp mesajınızı göndererek tamamlayın" : "Teklif talebinizin durumu"}
        </h1>
        {quoteNumber && (
          <p className="font-mono text-sm text-muted-foreground">
            Referans Numaranız: <span className="font-semibold text-foreground">{quoteNumber}</span>
          </p>
        )}
        <p className="mx-auto max-w-md text-muted-foreground">
          {isWhatsapp
            ? "WhatsApp’ta Gönder düğmesine basmanız gerekir. Bu sayfa mesajın gönderildiğini doğrulamaz. Sepetiniz korunur."
            : "Talebinizin durumu hakkında bilgi almak için referans numaranızla bizimle iletişime geçebilirsiniz."}
        </p>
      </div>

      {isWhatsapp && (draftUrl
        ? <Button asChild><a href={draftUrl} target="_blank" rel="noopener noreferrer">WhatsApp’ı Aç</a></Button>
        : <p className="text-sm text-muted-foreground">Mesaj taslağı bulunamadı veya süresi doldu. Formdan yeniden hazırlayabilirsiniz.</p>)}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" asChild><Link href="/teklif-sepeti">Sepete Dön</Link></Button>
        <Button asChild>
          <Link href="/">
            Ana Sayfaya Dön
            <ArrowRight />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/urunler">Diğer Ürünlere Göz Atın</Link>
        </Button>
      </div>
    </div>
  );
}

export default function QuoteConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <QuoteConfirmationContent />
    </Suspense>
  );
}
