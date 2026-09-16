import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Frontend'den gelen alanları karşılıyoruz
    const { ad, soyad, kurum, departman, email, telefon, notlar, city, kvkkConsent, items } = body;

    // Zorunlu alan kontrolü
    if (!ad || !soyad || !kurum || !email || !telefon || !items || items.length === 0) {
      return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
    }

    // Benzersiz bir teklif numarası oluşturuyoruz (Örn: Q-1726495...)
    const quoteNumber = `Q-${Date.now().toString().slice(-8)}`;

    // Prisma şemana tam uygun model ismi (prisma.quote) ve sütun adlarıyla kayıt
    const newQuote = await prisma.quote.create({
      data: {
        quoteNumber,
        firstName: ad,
        lastName: soyad,
        institution: kurum,
        department: departman || null,
        email,
        phone: telefon,
        city: city || null,
        note: notlar || null,
        kvkkConsent: kvkkConsent ?? true, // Formda onaylandıysa
        items: {
          create: items.map((item: any) => ({
            productId: item.productId || null,
            serviceId: item.serviceId || null,
            itemNameSnapshot: item.name || item.itemNameSnapshot || "Ürün / Hizmet",
            categorySnapshot: item.category || item.categorySnapshot || "Genel",
            quantity: item.quantity || 1,
            note: item.note || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, data: newQuote }, { status: 201 });
  } catch (error: any) {
    console.error("Teklif kayıt hatası detayları:", error?.message || error);
    return NextResponse.json({ error: "Sunucu hatası oluştu: " + (error?.message || "") }, { status: 500 });
  }
}