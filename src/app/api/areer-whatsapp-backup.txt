import { NextResponse } from "next/server";
import { submitCareerApplication } from "@/actions/career-actions";
import { MAX_CV_SIZE_BYTES } from "@/lib/validation/career-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ success: false, error: "Geçersiz istek kaynağı." }, { status: 403 });
  }
  const length = Number(request.headers.get("content-length"));
  if (length > MAX_CV_SIZE_BYTES + 128 * 1024) {
    return NextResponse.json({ success: false, error: "CV en fazla 4 MB olabilir." }, { status: 413 });
  }
  try {
    const form = await request.formData();
    const rawValues = form.get("values");
    const cv = form.get("cv");
    if (typeof rawValues !== "string" || rawValues.length > 20000 || !(cv instanceof File)) {
      return NextResponse.json({ success: false, error: "Form bilgileri veya CV eksik." }, { status: 400 });
    }
    let values: unknown;
    try { values = JSON.parse(rawValues); } catch {
      return NextResponse.json({ success: false, error: "Geçersiz form bilgileri." }, { status: 400 });
    }
    const result = await submitCareerApplication(values, cv);
    return NextResponse.json(result, { status: result.success ? 200 : 400, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ success: false, error: "Başvuru işlenemedi. Lütfen yeniden deneyin." }, { status: 500 });
  }
}
