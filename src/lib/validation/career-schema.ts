import { z } from "zod";

export const careerApplicationSchema = z.object({
  firstName: z.string().trim().min(2, "Ad en az 2 karakter olmalıdır").max(100),
  lastName: z.string().trim().min(2, "Soyad en az 2 karakter olmalıdır").max(100),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin").max(254),
  phone: z.string().trim().min(10, "Geçerli bir telefon numarası girin").max(30),
  expertise: z.string().trim().max(200, "İlgi alanı 200 karakteri geçemez").optional(),
  jobTitle: z.string().trim().max(120, "Pozisyon adı çok uzun").optional(),
  coverNote: z.string().trim().max(2000, "Ön yazı 2000 karakteri geçemez").optional(),
  kvkkConsent: z.literal(true, {
    errorMap: () => ({ message: "Devam etmek için KVKK Aydınlatma Metni'ni onaylamanız gerekir" }),
  }),
});
export type CareerApplicationValues = z.infer<typeof careerApplicationSchema>;
export const ACCEPTED_CV_TYPE = "application/pdf";
// Multipart request overhead must also fit Vercel's 4.5 MB request limit.
export const MAX_CV_SIZE_BYTES = 4 * 1024 * 1024;
