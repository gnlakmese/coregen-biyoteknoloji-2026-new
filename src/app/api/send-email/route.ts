import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, message, serviceName, details } = body;

    // Gönderilecek e-postanın içeriğini hazırlıyoruz
    let subject = "CoreGen Biyoteknoloji - Yeni Bildirim";
    let htmlContent = ``;

    if (type === 'quote') {
      subject = `🔬 Yeni Teklif Talebi: ${serviceName || 'Genel Hizmet'}`;
      htmlContent = `
        <h2>Yeni Bir Teklif Talebi Aldınız!</h2>
        <p><strong>Hizmet:</strong> ${serviceName || '-'}</p>
        <p><strong>Ad Soyad:</strong> ${name || '-'}</p>
        <p><strong>E-posta:</strong> ${email || '-'}</p>
        <p><strong>Telefon:</strong> ${phone || '-'}</p>
        <p><strong>Detaylar/Notlar:</strong> ${message || details || '-'}</p>
      `;
    } else if (type === 'career') {
      subject = `💼 Yeni Kariyer / Başvuru Formu`;
      htmlContent = `
        <h2>Yeni Bir Kariyer Başvurusu Var!</h2>
        <p><strong>Ad Soyad:</strong> ${name || '-'}</p>
        <p><strong>E-posta:</strong> ${email || '-'}</p>
        <p><strong>Telefon:</strong> ${phone || '-'}</p>
        <p><strong>Mesaj/CV Notu:</strong> ${message || '-'}</p>
      `;
    } else {
      subject = `🔔 Web Sitesi İletişim Formu`;
      htmlContent = `
        <h2>Yeni Mesaj</h2>
        <p><strong>İsim:</strong> ${name || '-'}</p>
        <p><strong>E-posta:</strong> ${email || '-'}</p>
        <p><strong>Mesaj:</strong> ${message || '-'}</p>
      `;
    }

    const data = await resend.emails.send({
      from: 'CoreGen Web <onboarding@resend.dev>',
      to: ['info@coregenbiyoteknoloji.com'],
      subject: subject,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return NextResponse.json({ success: false, error: 'E-posta gönderilemedi.' }, { status: 500 });
  }
}