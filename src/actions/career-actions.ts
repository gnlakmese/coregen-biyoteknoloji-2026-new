"use server";

import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { careerApplicationSchema, MAX_CV_SIZE_BYTES, ACCEPTED_CV_TYPE } from "@/lib/validation/career-schema";

export type SubmitApplicationResult =
  | { success: true; whatsappUrl: string; cvFileUrl: string; reference: string }
  | { success: false; error: string };

export async function submitCareerApplication(
  data: unknown,
  cvFile: File | null,
  jobPostingSlug?: string,
): Promise<SubmitApplicationResult> {
  const parsed = careerApplicationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: "Form bilgileri eksik veya hatalı." };
  if (!(cvFile instanceof File) || cvFile.size === 0) {
    return { success: false, error: "Lütfen PDF özgeçmişinizi seçin." };
  }
  if (cvFile.size > MAX_CV_SIZE_BYTES || cvFile.type !== ACCEPTED_CV_TYPE) {
    return { success: false, error: "CV, en fazla 4 MB boyutunda bir PDF olmalıdır." };
  }

  const projectUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const bucket = (process.env.SUPABASE_CV_BUCKET || "career-cvs").trim();
  if (!projectUrl || !serviceKey) {
    return { success: false, error: "CV yükleme servisi henüz hazır değil. Lütfen daha sonra tekrar deneyin." };
  }
  let origin: URL;
  try { origin = new URL(projectUrl); } catch {
    return { success: false, error: "CV yükleme servisi yapılandırılamadı." };
  }
  if (origin.protocol !== "https:" || origin.username || origin.password || !/^[a-zA-Z0-9_-]+$/.test(bucket)) {
    return { success: false, error: "CV yükleme servisi yapılandırılamadı." };
  }

  const base = `${origin.origin}/storage/v1`;
  const headers = { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey };
  const reference = randomUUID();
  const objectPath = `${reference}.pdf`;
  const encodedPath = `${encodeURIComponent(bucket)}/${objectPath}`;
  let uploaded = false;

  try {
    const signature = new TextDecoder().decode(await cvFile.slice(0, 5).arrayBuffer());
    if (signature !== "%PDF-") return { success: false, error: "Seçilen dosya geçerli bir PDF değil." };

    // Keep CVs private; do not silently use a public bucket.
    const bucketResponse = await fetch(`${base}/bucket/${encodeURIComponent(bucket)}`, { headers, cache: "no-store" });
    if (!bucketResponse.ok) throw new Error("bucket_unavailable");
    const bucketInfo = await bucketResponse.json();
    if (bucketInfo.public !== false) throw new Error("private_bucket_required");

    const upload = await fetch(`${base}/object/${encodedPath}`, {
      method: "POST", headers: { ...headers, "Content-Type": ACCEPTED_CV_TYPE, "x-upsert": "false" },
      body: cvFile, cache: "no-store",
    });
    if (!upload.ok) throw new Error("upload_failed");
    uploaded = true;

    const sign = await fetch(`${base}/object/sign/${encodedPath}`, {
      method: "POST", headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ expiresIn: 7 * 24 * 60 * 60 }), cache: "no-store",
    });
    if (!sign.ok) throw new Error("sign_failed");
    const signed = await sign.json();
    if (typeof signed.signedURL !== "string" || !signed.signedURL.startsWith("/object/sign/")) {
      throw new Error("invalid_signed_url");
    }
    const cvFileUrl = `${base}${signed.signedURL}`;
    const values = parsed.data;
    const title = values.jobTitle || "Genel Başvuru";
    const jobPosting = jobPostingSlug
      ? await prisma.jobPosting.findUnique({ where: { slug: jobPostingSlug }, select: { id: true } })
      : null;

    await prisma.applicant.create({
      data: {
        firstName: values.firstName, lastName: values.lastName,
        email: values.email, phone: values.phone, cvFileUrl,
        coverNote: [`Pozisyon: ${title}`, `İlgi alanı: ${values.expertise || "Belirtilmedi"}`,
          `Referans: ${reference}`, `CV nesnesi: ${bucket}/${objectPath}`, values.coverNote || ""].join("\n"),
        kvkkConsent: values.kvkkConsent, jobPostingId: jobPosting?.id ?? null,
      },
    });

    const message = [
      "*COREGEN KARİYER BAŞVURUSU*", `Pozisyon: ${title}`,
      `Ad Soyad: ${values.firstName} ${values.lastName}`,
      `E-posta: ${values.email}`, `Telefon: ${values.phone}`,
      `Uzmanlık / İlgi Alanı: ${values.expertise || "Belirtilmedi"}`,
      `Ön Yazı: ${values.coverNote || "Belirtilmedi"}`, `Referans: ${reference}`,
      "", "CV indirme bağlantısı (7 gün geçerli):", cvFileUrl,
    ].join("\n");
    return { success: true, whatsappUrl: `https://wa.me/905522207270?text=${encodeURIComponent(message)}`, cvFileUrl, reference };
  } catch {
    if (uploaded) {
      try {
        const cleanup = await fetch(`${base}/object/${encodeURIComponent(bucket)}`, {
          method: "DELETE", headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ prefixes: [objectPath] }), cache: "no-store",
        });
        if (!cleanup.ok) console.error("Kariyer CV temizliği tamamlanamadı.");
      } catch { console.error("Kariyer CV temizliği tamamlanamadı."); }
    }
    console.error("Kariyer başvurusu hazırlanamadı.");
    return { success: false, error: "Başvurunuz hazırlanamadı. Lütfen daha sonra tekrar deneyin." };
  }
}
