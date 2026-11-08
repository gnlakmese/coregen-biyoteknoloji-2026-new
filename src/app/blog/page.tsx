import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";

const blogPosts = [
  {
    slug: "ngs-teknolojisi-nedir",
    title: "NGS (Yeni Nesil Dizileme) Teknolojisi Nedir?",
    excerpt: "Sanger dizilemeden farkından iş akışına, uygulama alanlarından biyoinformatik analize kadar Yeni Nesil Dizileme'nin kapsamlı bir anlatımı.",
    date: "1 Temmuz 2026",
    category: "Dizileme",
    image: "/images/ngs-kapak.jpeg"
  },
  {
    slug: "dna-izolasyonu-nasil-yapilir",
    title: "DNA İzolasyonu Nasıl Yapılır?",
    excerpt: "Hücre lizizinden saflaştırmaya, izolasyon yöntemlerinden kalite kontrolüne kadar genomik DNA izolasyonunun temel adımları.",
    date: "18 Haziran 2026",
    category: "Moleküler Biyoloji",
    image: "/images/dna-izolasyonu-kapak.jpeg"
  },
  {
    slug: "pcr-nedir",
    title: "PCR (Polimeraz Zincir Reaksiyonu) Nedir?",
    excerpt: "PCR'ın temel prensibinden döngü aşamalarına, PCR çeşitlerinden kullanım alanlarına kadar moleküler biyolojinin temel yönteminin kapsamlı bir anlatımı.",
    date: "2 Haziran 2026",
    category: "PCR",
    image: "/images/pcr-kapak.jpg"
  }
];

export const metadata = {
  title: "Blog | CoreGen Biyoteknoloji",
  description: "Moleküler biyoloji ve biyoteknoloji alanında güncel içerikler.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            CoreGen <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-cyan-600">Blog</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Moleküler biyoloji, genomik ve biyoteknoloji alanında uzman ekibimiz tarafından hazırlanan güncel içerikler.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
              
              <Link href={`/blog/${post.slug}`} className="relative h-56 w-full overflow-hidden bg-slate-100 block">
                {post.image ? (
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">Görsel Yok</div>
                )}
              </Link>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-5">
                  <span className="flex items-center gap-1.5 text-pink-600 bg-pink-50 px-3 py-1.5 rounded-full font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-sm text-slate-600 mb-8 line-clamp-3 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 hover:text-pink-600 transition-colors mt-auto"
                >
                  Devamını Oku <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
