"use client";

import { useState } from "react";
import { useProductQuoteCart, ProductCartPanel, formatProductItems, saveQuoteDraft } from "@/components/quote/product-quote-cart";
import Link from "next/link";
import Image from "next/image";
import { Send, CheckCircle2, ArrowLeft, Building, User, Mail, Phone, FileText, ReceiptText, Wrench, Package, CheckSquare, Square, Upload, Info, MessageSquare } from "lucide-react";

const ALL_SERVICES_40 = [
  { id: "1", name: "1. Nükleik Asit ve Protein İzolasyonu" },
  { id: "2", name: "2. Primer ve Oligonükleotid Tasarımı ve Sentezi" },
  { id: "3", name: "3. Jel Elektroforezi" },
  { id: "4", name: "4. Nükleik Asitlerde Miktar Tayini" },
  { id: "5", name: "5. PCR Analizi" },
  { id: "6", name: "6. Gerçek Zamanlı PCR (RT-PCR / qPCR)" },
  { id: "7", name: "7. Sanger Dizileme" },
  { id: "8", name: "8. Whole Genome Sequencing (WGS)" },
  { id: "9", name: "9. Whole Exome Sequencing (WES)" },
  { id: "10", name: "10. Targeted Sequencing" },
  { id: "11", name: "11. Transkriptom Analizi (RNA-Seq)" },
  { id: "12", name: "12. Shotgun Metagenomics" },
  { id: "13", name: "13. 16S rRNA Analizi" },
  { id: "14", name: "14. Western Blot Analizi" },
  { id: "15", name: "15. ELISA Analizi" },
  { id: "16", name: "16. Rekombinant Protein Analizi" },
  { id: "17", name: "17. NGS Veri Analizi" },
  { id: "18", name: "18. RNA-Seq Analizi" },
  { id: "19", name: "19. Diferansiyel Gen Ekspresyonu" },
  { id: "20", name: "20. Varyant Analizi" },
  { id: "21", name: "21. Filogenetik Analiz" },
  { id: "22", name: "22. Metagenomik Veri Analizi" },
  { id: "23", name: "23. Proje Danışmanlığı" },
  { id: "24", name: "24. Yerinde Hizmet Modülü" },
  { id: "25", name: "25. Kurumsal ve Akademik Eğitimler" },
  { id: "26", name: "26. Deney Tasarımı" },
  { id: "27", name: "27. İstatistiksel Analiz" },
  { id: "28", name: "28. Bilimsel Raporlama" },
  { id: "29", name: "29. Yayın Danışmanlığı" },
  { id: "30", name: "30. Oksidatif Stres Analizleri" },
  { id: "31", name: "31. Biyokimya Test Analizleri" },
  { id: "32", name: "32. Spesifik Test Analizleri" },
  { id: "33", name: "33. ELISA Test Analizleri" },
  { id: "34", name: "34. İmmünohistokimya (IHC) Boyama" },
  { id: "35", name: "35. İlaç Geliştirme ve Toksisite Testleri" },
  { id: "36", name: "36. Hücre Kültürü Tabanlı ELISA Uygulamaları" },
  { id: "37", name: "37. Proliferasyon ve Migrasyon (Yara İyileşmesi) Deneyleri" },
  { id: "38", name: "38. Genetik Mühendisliği ve Transfeksiyon Teknolojileri" },
  { id: "39", name: "39. Kök Hücre Teknolojileri" },
  { id: "40", name: "BİLGİ ALMAK İSTİYORUM" },
];

export default function TeklifSepetiPage() {
  const { items } = useProductQuoteCart();
  const [preparedUrl, setPreparedUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [aktifForm, setAktifForm] = useState<"hizmet" | "sarf" | null>(null);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [serviceDetails, setServiceDetails] = useState<Record<string, Record<string, any>>>({});

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    kurum: "",
    departman: "",
    email: "",
    telefon: "",
    biyoguvenlikRiski: "yok",
    biyoguvenlikAciklama: "",
    tcVkn: "",
    faturaAdresi: "",
    amaci: "",
    aciklama: "",
  });

  const [sarfFormData, setSarfFormData] = useState({
    ad: "",
    soyad: "",
    kurum: "",
    departman: "",
    email: "",
    telefon: "",
    tcVkn: "",
    faturaAdresi: "",
    urunAdi: "",
    markasi: "",
    katalogKodu: "",
    miktari: "",
    reaksiyonOrnek: "",
    notlar: "",
  });

  const toggleServiceSelection = (id: string) => {
    setSelectedServiceIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
