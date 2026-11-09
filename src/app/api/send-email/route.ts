import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function escapeHtml(value: unknown): string {
  const text = value == null || value === '' ? '-' : String(value);

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'E-posta servisi şu anda kullanılamıyor.',
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Geçersiz form verisi.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz form verisi.' },
        { status: 400 }
      );
    }

    const {
      type,
      name,
      email,
      phone,
      message,
      serviceName,
      details,
    } = body;

    const replyTo = typeof email === 'string' ? email.trim() : '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lütfen geçerli bir e-posta adresi girin.',
        },
        { status: 400 }
      );
    }

    let subject = 'CoreGen Biyoteknoloji - Yeni Bildirim';
    let htmlContent = '';

    if (type === 'quote') {
      const service =
        typeof serviceName === 'string' && serviceName.trim()
          ? serviceName.trim().replace(/[\r\n]/g, ' ')
          : 'Genel Hizmet';

      subject = `🔬 Yeni Teklif Talebi: ${service}`;
      htmlContent = `
        <h2>Yeni Bir Teklif Talebi Aldınız!</h2>
        <p><strong>Hizmet:</strong> ${escapeHtml(serviceName)}</p>
        <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(replyTo)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Detaylar/Notlar:</strong> ${escapeHtml(message || details)}</p>
      `;
    } else if (type === 'career') {
      subject = '💼 Yeni Kariyer / Başvuru Formu';
      htmlContent = `
        <h2>Yeni Bir Kariyer Başvurusu Var!</h2>
        <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(replyTo)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Mesaj/CV Notu:</strong> ${escapeHtml(message)}</p>
      `;
    } else {
      subject = '🔔 Web Sitesi İletişim Formu';
      htmlContent = `
        <h2>Yeni Mesaj</h2>
        <p><strong>İsim:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(replyTo)}</p>
        <p><strong>Mesaj:</strong> ${escapeHtml(message)}</p>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: 'CoreGen Web <onboarding@resend.dev>',
      to: ['info@coregenbiyoteknoloji.com'],
      subject,
      html: htmlContent,
      replyTo,
    });

    if (error) {
      console.error('E-posta servisi gönderim hatası:', error.name);

      return NextResponse.json(
        {
          success: false,
          error: 'E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch {
    console.error('E-posta isteği işlenirken hata oluştu.');

    return NextResponse.json(
      {
        success: false,
        error: 'E-posta gönderilemedi.',
      },
      { status: 500 }
    );
  }
}
