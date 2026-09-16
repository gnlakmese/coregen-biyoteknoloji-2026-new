import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Prisma ile güvenli kayıt
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

    return NextResponse.json({ success: true, data: newQuote }, { status: 201 });
  } catch (error: any) {
    console.error("TEKLİF KAYIT KRİTİK HATA:", error);
    return NextResponse.json({ error: "Sunucu hatası: " + (error?.message || "B bilinmeyen hata") }, { status: 500 });
  }
}