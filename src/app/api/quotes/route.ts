import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ad, soyad, kurum, departman, email, telefon, city, notlar, kvkkConsent, items } = body;

    // Detaylı zorunlu alan kontrolü
    if (!ad || !soyad || !kurum || !email || !telefon || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Zorunlu alanlar eksik veya hatalı." }, { status: 400 });
    }

    // Benzersiz teklif numarası
    const quoteNumber = `CG-${Date.now().toString().slice(-8)}`;

    // Prisma ile güvenli kayıt (Admin paneli için)
    const newQuote = await prisma.quote.create({
      data: {
        quoteNumber,
        firstName: ad,
        lastName: soyad,
        institution: kurum,
        department: departman || null,
        phone: telefon,
        email,
        city: city || "Mersin",
        note: notlar || null,
        kvkkConsent: kvkkConsent ?? true,
        items: {
          create: items.map((item: any) => ({
            itemNameSnapshot: item.itemNameSnapshot || "Analiz Hizmeti",
            categorySnapshot: item.categorySnapshot || "Genel Laboratuvar",
            quantity: item.quantity || 1,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // E-posta İçeriğini Hazırlama ve Gönderme (Resend ile)
    const serviceSummary = items.map((i: any) => `• ${i.itemNameSnapshot} (${i.categorySnapshot}) - Adet: ${i.quantity}`).join("<br>");

    const htmlContent = `
      <h2>🔬 Yeni Teklif / Analiz Talebi Alındı!</h2>
      <p><strong>Talep Numarası:</strong> ${quoteNumber}</p>
      <hr />
      <h3>Müşteri Bilgileri:</h3>
      <p><strong>Ad Soyad:</strong> ${ad} ${soyad}</p>
      <p><strong>Kurum / Kuruluş:</strong> ${kurum} ${departman ? `(${departman})` : ""}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${telefon}</p>
      <p><strong>Şehir:</strong> ${city || "Belirtilmemiş"}</p>
      <p><strong>Notlar:</strong> ${notlar || "Yok"}</p>
      <hr />
      <h3>Talep Edilen Hizmetler / Ürünler:</h3>
      <p>${serviceSummary}</p>
    `;

    try {
      await resend.emails.send({
        from: 'CoreGen Web <onboarding@resend.dev>',
        to: ['info@coregenbiyoteknoloji.com'],
        subject: `🔬 Yeni Teklif Talebi: ${quoteNumber} - ${ad} ${soyad}`,
        html: htmlContent,
        replyTo: email,
      });
    } catch (emailError) {
      console.error("E-posta gönderim uyarısı (Kayıt veritabanına yapıldı ama mail gidemedi):", emailError);
    }

    return NextResponse.json({ success: true, data: newQuote }, { status: 201 });
  } catch (error: any) {
    console.error("TEKLİF KAYIT KRİTİK HATA:", error);
    return NextResponse.json({ error: "Sunucu hatası: " + (error?.message || "Bilinmeyen hata") }, { status: 500 });
  }
}
