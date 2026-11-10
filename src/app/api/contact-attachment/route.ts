import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
const ACCEPTED_CV_TYPE = "application/pdf";
const MAX_CV_SIZE_BYTES = 4 * 1024 * 1024;
async function upload(cvFile: File) {
  if (!cvFile.size || cvFile.size > MAX_CV_SIZE_BYTES || cvFile.type !== ACCEPTED_CV_TYPE) return { success: false, error: "En fazla 4 MB boyutunda PDF seçin." };
  const projectUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const bucket = (process.env.SUPABASE_CV_BUCKET || "career-cvs").trim();
  if (!projectUrl || !serviceKey) {
    return { success: false, error: "Dosya yükleme servisi henüz hazır değil. Lütfen daha sonra tekrar deneyin." };
  }
  let origin: URL;
  try { origin = new URL(projectUrl); } catch {
    return { success: false, error: "Dosya yükleme servisi yapılandırılamadı." };
  }
  if (origin.protocol !== "https:" || origin.username || origin.password || !/^[a-zA-Z0-9_-]+$/.test(bucket)) {
    return { success: false, error: "Dosya yükleme servisi yapılandırılamadı." };
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
    return { success: true, fileUrl: cvFileUrl };
  } catch {
    if (uploaded) {
      try {
        await fetch(`${base}/object/${encodeURIComponent(bucket)}`, {
          method: "DELETE", headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ prefixes: [objectPath] }), cache: "no-store",
        });
      } catch { console.error("İletişim dosyası temizlenemedi."); }
    }
    return { success: false, error: "Dosya yüklenemedi. Lütfen tekrar deneyin veya dosyayı WhatsApp üzerinden ekleyin." };
  }
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ success: false, error: "Geçersiz istek." }, { status: 403 });
  if (Number(request.headers.get("content-length")) > MAX_CV_SIZE_BYTES + 128 * 1024) return NextResponse.json({ success: false, error: "Dosya çok büyük." }, { status: 413 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ success: false, error: "Dosya eksik." }, { status: 400 });
    const result = await upload(file);
    return NextResponse.json(result, { status: result.success ? 200 : 400, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ success: false, error: "Dosya işlenemedi." }, { status: 500 });
  }
}
