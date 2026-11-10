import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplicationConfirmationPage() {
  return <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-24 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground"><MessageCircle className="h-7 w-7" /></div>
    <div className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-magenta">Kariyer Başvurusu</p>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gönderimi WhatsApp’ta tamamlayın</h1>
      <p className="mx-auto max-w-md text-muted-foreground">Başvuru formunda oluşturulan WhatsApp bağlantısını açıp mesajı gönderin. Bu sayfa, mesajınızın gönderildiğini veya teslim edildiğini doğrulamaz.</p>
    </div>
    <Button asChild><Link href="/kurumsal/kariyer">Kariyer Sayfasına Dön<ArrowRight /></Link></Button>
  </div>;
}
