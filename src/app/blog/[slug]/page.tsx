import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";

const blogPosts = [
  {
    slug: "ngs-teknolojisi-nedir",
    title: "NGS (Yeni Nesil Dizileme Teknolojisi) Nedir?",
    date: "1 Temmuz 2026",
    category: "Dizileme",
    image: "/images/ngs-kapak.jpeg",
    content: (
      <div className="text-lg text-slate-700 leading-relaxed space-y-6">
        <p>Yeni Nesil Dizileme (Next Generation Sequencing - NGS), milyonlarca DNA veya RNA parçasının aynı anda, paralel olarak ve büyük bir hızla dizilenmesini sağlayan ileri teknoloji bir yaklaşımdır.</p>
        <p>Peki, tam olarak NGS nedir? Klasik Sanger dizileme yönteminde her reaksiyonda yalnızca tek bir DNA parçası (yaklaşık 500-1000 baz çifti) okunabilirken, NGS teknolojileri sayesinde tüm bir insan genomu sadece birkaç gün içinde dizilenebilir. Sanger dizileme bir kitabı harf harf okumaya benzerken, yeni nesil dizileme teknolojileri aynı kitabın binlerce sayfasını aynı anda okuyan koca bir okuyucu ordusuna benzetilebilir.</p>
        
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">NGS Nasıl Çalışır? İş Akışı ve Aşamalar</h2>
        <p>NGS iş akışı, biyoinformatik analiz ve laboratuvar süreçlerinin kusursuz bir uyumla çalışmasını gerektirir:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Örnekten DNA/RNA Elde Edilmesi:</strong> Hedef doku veya hücreden genetik materyal izole edilir.</li>
          <li><strong className="font-bold text-slate-900">Nükleik Asit Kalite ve Miktarının Değerlendirilmesi:</strong> İzolasyon sonrası elde edilen materyalin dizileme reaksiyonları için yeterli saflıkta ve miktarda olduğu doğrulanır.</li>
          <li><strong className="font-bold text-slate-900">Kütüphane Hazırlama (Library Preparation):</strong> Uzun DNA zincirleri dizileme cihazının okuyabileceği kısa parçalara ayrılır (Fragmentation). Bu parçaların uçlarına cihazın tanıması için özel adaptör dizileri eklenir (Adapter Ligation).</li>
          <li><strong className="font-bold text-slate-900">Amplifikasyon:</strong> Gerekli durumlarda (kullanılan platforma ve protokole bağlı olarak) hazırlanan kütüphane PCR yardımıyla çoğaltılır.</li>
        </ul>

        {/* ARA GÖRSEL */}
        <figure className="my-12 relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-md border border-slate-200">
          <Image src="/images/ngs-yazi i̇cine.png" alt="NGS Analizi" fill className="object-cover" />
        </figure>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Dizileme (Sequencing):</strong> Hazırlanan kütüphane NGS cihazına yüklenir. Cihaz, milyonlarca DNA parçasının dizisini (A, T, C, G) eş zamanlı olarak okur.</li>
          <li><strong className="font-bold text-slate-900">Ham Veri Elde Edilmesi:</strong> Okuma işlemi sonucunda dijital formatta ham dizileme verileri üretilir.</li>
          <li><strong className="font-bold text-slate-900">Biyoinformatik Analiz ve Yorumlama:</strong> Ham veri, güçlü bilgisayarlar ve algoritmalar kullanılarak referans bir genoma hizalanır, varyantlar tespit edilir ve biyolojik olarak anlamlandırılır.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">NGS Hangi Amaçlarla Kullanılır?</h2>
        <p>NGS'nin çok yönlülüğü, onu sayısız araştırma alanının vazgeçilmezi yapmıştır. Bazı temel kullanım alanları şunlardır:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Tüm Genom Dizileme (WGS):</strong> Bir organizmanın genomunun tamamının kodlayan ve kodlamayan bölgeleriyle birlikte okunmasıdır.</li>
          <li><strong className="font-bold text-slate-900">Tüm Ekzom Dizileme (WES):</strong> Sadece protein kodlayan gen bölgelerinin (ekzomların) dizilenmesidir. Nadir genetik hastalıkların tanısında sıkça tercih edilir.</li>
          <li><strong className="font-bold text-slate-900">Hedefli Dizileme (Targeted Sequencing):</strong> Sadece belirli bir hastalıkla veya özellikle ilişkili olduğu bilinen gen panellerinin incelenmesidir.</li>
          <li><strong className="font-bold text-slate-900">RNA Dizileme (RNA-Seq):</strong> Hücredeki gen anlatım (ekspresyon) düzeylerini ve transkriptom profilini incelemek için kullanılır.</li>
          <li><strong className="font-bold text-slate-900">16S rRNA Dizileme & Metagenomik:</strong> Toprak, bağırsak veya su gibi ortamlardaki mikrobiyal popülasyonları kültürlemeden tanımlamak ve genetik kapasitelerini belirlemek için kullanılır.</li>
          <li><strong className="font-bold text-slate-900">Kanser Genomikleri:</strong> Tümör dokusundaki somatik mutasyonların tespit edilerek kişiselleştirilmiş kanser tedavilerinin planlanmasında rol oynar.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">NGS'nin Avantajları ve Sınırlılıkları</h2>
        <p><strong className="font-bold text-slate-900">Avantajları:</strong></p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Yüksek Veri Üretimi (High Throughput):</strong> Tek bir çalışmada devasa boyutta genetik veri elde edilir.</li>
          <li><strong className="font-bold text-slate-900">Paralel Dizileme:</strong> Çok sayıda örneğin ve gen bölgesinin aynı anda analiz edilmesine olanak tanır.</li>
          <li><strong className="font-bold text-slate-900">Kapsamlılık:</strong> Sadece bilinen mutasyonları değil, yeni ve bilinmeyen varyantları da keşfetme gücüne sahiptir.</li>
        </ul>
        <p className="mt-6"><strong className="font-bold text-slate-900">Sınırlılıkları:</strong></p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Biyoinformatik Uzmanlık İhtiyacı:</strong> Üretilen veri o kadar büyüktür ki, analiz edilmesi ve depolanması için ileri düzey sunuculara ihtiyaç vardır.</li>
          <li><strong className="font-bold text-slate-900">Kütüphane Kalitesi:</strong> Reaksiyonun başarısı, laboratuvar hassasiyetine doğrudan bağlıdır.</li>
          <li><strong className="font-bold text-slate-900">Maliyet:</strong> Reaktifler ve cihaz altyapısı, geleneksel yöntemlere göre başlangıçta daha yüksek bütçeler gerektirebilir.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">NGS Sonucunda Ne Elde Edilir?</h2>
        <p>NGS cihazından çıkan ham veriler çoğunlukla FASTQ adı verilen ve dizilerin okuma kalitelerini de içeren dosya formatındadır. Bu veriler biyoinformatik analiz araçlarıyla işlenerek referans genoma hizalanır ve BAM dosyalarına dönüştürülür. Daha sonra mutasyonların ve farklılıkların listelendiği VCF (Variant Call Format) dosyaları elde edilir. Laboratuvar aşaması ne kadar kusursuz olursa olsun, doğru bir biyoinformatik pipeline olmadan bu verilerin biyolojik bir anlamı yoktur.</p>
        
        <div className="p-6 bg-pink-50 rounded-2xl text-base text-pink-900 mt-8 border-l-4 border-pink-500 shadow-sm">
          <strong className="font-extrabold">Özet:</strong> NGS, milyonlarca nükleik asit parçasının eş zamanlı dizilenmesini sağlayan güçlü bir teknolojidir. İş akışı; örnek hazırlığı, dizileme ve biyoinformatik analiz adımlarından oluşur. WGS, WES ve RNA-Seq gibi çeşitli uygulamalarla genetik araştırmalara benzersiz bir derinlik kazandırır.
        </div>
      </div>
    )
  },
  {
    slug: "dna-izolasyonu-nasil-yapilir",
    title: "DNA İzolasyonu Nasıl Yapılır?",
    date: "18 Haziran 2026",
    category: "Moleküler Biyoloji",
    image: "/images/dna-izolasyonu-kapak.jpeg",
    content: (
      <div className="text-lg text-slate-700 leading-relaxed space-y-6">
        <p>Başarılı bir moleküler analizin temeli, yüksek kaliteli bir başlangıç materyaline dayanır. Bu nedenle DNA izolasyonu, moleküler biyolojinin en kritik ilk adımıdır. Kısaca DNA izolasyonu, genetik materyalin içinde bulunduğu hücreden veya dokudan çıkarılarak diğer tüm hücresel bileşenlerden (proteinler, lipitler, RNA ve diğer metabolitler) arındırılması işlemidir.</p>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">DNA İzolasyonunun Temel Mantığı</h2>
        <p>Hangi kiti veya yöntemi kullanırsanız kullanın, "DNA izolasyonu nasıl yapılır?" sorusunun yanıtı dört temel aşamaya dayanır:</p>
        <ul className="list-decimal pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Hücrelerin Parçalanması (Lizis):</strong> Hücre zarı ve çekirdek zarı mekanik (homojenizasyon) veya kimyasal (deterjanlar ve enzimler) yollarla parçalanarak DNA'nın açığa çıkması sağlanır.</li>
          <li><strong className="font-bold text-slate-900">Protein ve Kalıntıların Uzaklaştırılması:</strong> DNA'ya sarılı olan histon proteinleri (Proteinaz K gibi enzimlerle) parçalanır ve diğer hücresel artıklar karışımdan çöktürülerek veya yıkanarak ayrılır.</li>
          <li><strong className="font-bold text-slate-900">DNA'nın Saflaştırılması:</strong> Hedef nükleik asit, geri kalan solüsyondan izole edilir.</li>
          <li><strong className="font-bold text-slate-900">DNA'nın Elüsyonu:</strong> Saflaştırılmış DNA, uzun süreli saklama ve analiz için uygun bir tampon çözelti (buffer) veya su içinde çözülerek toplanır.</li>
        </ul>

        {/* ARA GÖRSEL */}
        <figure className="my-12 relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-md border border-slate-200">
          <Image src="/images/dna-yazi i̇cine.png" alt="DNA İzolasyon Aşamaları" fill className="object-cover" />
        </figure>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">Kullanılan Temel Yöntemler</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Silika Kolon Bazlı Yöntemler:</strong> DNA'nın belirli tuz konsantrasyonları ve pH koşullarında silika membrana bağlanması prensibine dayanır. Hızlıdır ve standart laboratuvarlarda en sık tercih edilen kitli sistemlerdir.</li>
          <li><strong className="font-bold text-slate-900">Manyetik Boncuk Bazlı Yöntemler:</strong> DNA'nın manyetik boncuklara bağlanması ve bir mıknatıs yardımıyla solüsyondan çekilmesi mantığıyla çalışır. Otomatik izolasyon robotlarında sıkça kullanılır.</li>
          <li><strong className="font-bold text-slate-900">Organik Ekstraksiyon (Fenol-Kloroform):</strong> Klasik ve ucuz bir yöntemdir ancak zehirli kimyasallar gerektirir. Yüksek verim sağlasa da çeker ocak altında dikkatli çalışma gerektirir.</li>
          <li><strong className="font-bold text-slate-900">Tuz Çöktürme (Salting-out):</strong> Yüksek tuz konsantrasyonları kullanılarak proteinlerin çöktürülmesi ve ardından DNA'nın alkol ile görünür hale getirilerek toplanması işlemidir.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">Örnek Türüne Göre İzolasyon Farklılıkları</h2>
        <p>DNA izolasyonu protokolleri, çalışılan materyale göre büyük değişiklik gösterir. Örneğin; kandaki çekirdekli hücrelerden DNA elde etmek nispeten kolayken, bitki hücrelerindeki sert selüloz çeperi kırmak için mekanik parçalama sıvı azot eşliğinde yapılmalıdır. Benzer şekilde, FFPE (formalinle fikse edilmiş parafine gömülü) dokulardan izolasyon yapılırken hassas kimyasal işlemler gerekir.</p>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">Kalite Kontrol: NanoDrop, Qubit ve Agaroz Jel</h2>
        <p>İzole edilen DNA'nın miktar ve kalite kontrolü yapılmadan PCR veya NGS aşamalarına geçilmemelidir. Kalite kontrol şu parametrelere bakar:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Konsantrasyon:</strong> Birim hacimdeki DNA miktarıdır.</li>
          <li><strong className="font-bold text-slate-900">Saflık:</strong> Örnekte inhibitörlerin bulunup bulunmadığıdır. A260/A280 oranının ~1.8, A260/A230 oranının ise ~2.0-2.2 civarında olması istenir.</li>
          <li><strong className="font-bold text-slate-900">Bütünlük:</strong> DNA'nın parçalanıp parçalanmadığını ifade eder.</li>
        </ul>
        <p className="mt-6"><strong className="font-bold text-slate-900">Ölçüm Yöntemleri Arasındaki Farklar:</strong></p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">NanoDrop:</strong> Işık absorbansına (260 nm) dayanır. Hızlıdır, saflık oranlarını verir ancak RNA ve serbest nükleotidleri de ölçebilir.</li>
          <li><strong className="font-bold text-slate-900">Qubit:</strong> Sadece çift sarmallı DNA'ya (dsDNA) özgü bağlanan florasan boyalar kullanır. Çok daha hassastır ve NGS öncesi altın standarttır, ancak saflık oranlarını vermez.</li>
          <li><strong className="font-bold text-slate-900">Agaroz Jel Elektroforezi:</strong> DNA'nın bütünlüğünü görsel olarak incelemek için kullanılır. Jel üzerinde tek ve kalın bir bant görülmesi yüksek bütünlüğü gösterir.</li>
        </ul>

        <div className="p-6 bg-pink-50 rounded-2xl text-base text-pink-900 mt-8 border-l-4 border-pink-500 shadow-sm">
          <strong className="font-extrabold">Özet:</strong> DNA izolasyonu, hücrelerin parçalanması, safsızlıkların uzaklaştırılması ve DNA'nın toplanması aşamalarını içerir. Örnek türüne ve kullanılacak analize (NanoDrop veya Qubit) göre farklı izolasyon ve ölçüm yöntemleri tercih edilmelidir.
        </div>
      </div>
    )
  },
  {
    slug: "pcr-nedir",
    title: "PCR (Polimeraz Zincir Reaksiyonu) Nedir?",
    date: "2 Haziran 2026",
    category: "PCR",
    image: "/images/pcr-kapak.jpg",
    content: (
      <div className="text-lg text-slate-700 leading-relaxed space-y-6">
        <p>Polimeraz Zincir Reaksiyonu (Polymerase Chain Reaction - PCR), moleküler biyolojinin en devrimsel icatlarından biridir. Basit bir benzetmeyle PCR, hücrenin içine girmeden laboratuvar tüpü içerisinde çalışan bir "moleküler fotokopi makinesi"dir. Amacı, başlangıçta çok az miktarda bulunan spesifik bir DNA bölgesini milyarlarca kopyaya ulaşana kadar çoğaltmaktır.</p>
        
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">PCR İçin Gerekli Temel Bileşenler</h2>
        <p>Başarılı bir polimeraz zincir reaksiyonu için aşağıdaki yapı taşlarına ihtiyaç vardır:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Kalıp (Template) DNA:</strong> Çoğaltılmak istenen bölgeyi barındıran başlangıç materyali.</li>
          <li><strong className="font-bold text-slate-900">Primerler (Forward ve Reverse):</strong> Sadece hedef gen bölgesine bağlanacak şekilde özel olarak tasarlanmış kısa, tek sarmallı DNA dizileri.</li>
          <li><strong className="font-bold text-slate-900">DNA Polimeraz:</strong> Yeni DNA iplikçiğini sentezleyen enzim (çoğunlukla ısıya dayanıklı Taq Polimeraz).</li>
          <li><strong className="font-bold text-slate-900">dNTP'ler:</strong> Yeni sentezlenecek DNA'nın yapı taşları olan A, T, C ve G nükleotidleri.</li>
          <li><strong className="font-bold text-slate-900">Tampon Çözelti ve Mg2+:</strong> Enzimin ideal ortamda çalışmasını sağlayan kimyasal çevre.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">PCR Aşamaları ve Döngüsü</h2>
        <p>PCR, bir "Thermal Cycler" (Isı Döngü Cihazı) içinde art arda tekrarlanan sıcaklık değişimleriyle gerçekleşir:</p>
        <ol className="list-decimal pl-6 space-y-3 font-medium">
          <li><strong className="font-bold text-slate-900">Denatürasyon (Denaturation):</strong> Tüp genellikle yüksek sıcaklıklara (94-98°C) ısıtılır. Çift sarmallı DNA tek sarmallı hale gelir.</li>
          <li><strong className="font-bold text-slate-900">Bağlanma (Annealing):</strong> Sıcaklık düşürülür (50-65°C). Primerler hedef bölgelere bağlanır.</li>
          <li><strong className="font-bold text-slate-900">Uzatma (Extension):</strong> Sıcaklık enzimin optimum çalışma derecesine (genellikle 72°C) getirilir. Yeni DNA iplikçiği sentezlenir.</li>
        </ol>

        {/* ARA GÖRSEL */}
        <figure className="my-12 relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-md border border-slate-200">
          <Image src="/images/pcr-yazi i̇cine.webp" alt="PCR Döngüsü" fill className="object-cover" />
        </figure>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">PCR Çeşitleri Arasındaki Farklar</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">Konvansiyonel PCR:</strong> Ürün miktarının reaksiyon bittikten sonra agaroz jel ile kalitatif incelenebildiği yöntemdir.</li>
          <li><strong className="font-bold text-slate-900">RT-PCR:</strong> Kalıp olarak RNA'nın kullanıldığı, önce cDNA'ya çevrilip ardından çoğaltıldığı yöntemdir.</li>
          <li><strong className="font-bold text-slate-900">qPCR (Gerçek Zamanlı PCR):</strong> Çoğalan DNA miktarının florasan boyalar sayesinde anlık ölçülebildiği kantitatif yöntemdir.</li>
          <li><strong className="font-bold text-slate-900">Multiplex PCR:</strong> Aynı tüp içerisinde birden fazla hedef gen bölgesinin aynı anda çoğaltıldığı yöntemdir.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">NGS, DNA İzolasyonu ve PCR Arasındaki İlişki</h2>
        <p>Moleküler biyoloji araştırmalarında bu üç teknik birbirini takip eden zincirleme bir reaksiyonun parçalarıdır. Kaliteli bir izolasyon olmadan PCR veya NGS yapılamaz, doğru yapılandırılmamış bir PCR/zenginleştirme adımı ise NGS verisini doğrudan bozar. Tüm bu adımlar, bütüncül bir moleküler analizin yapıtaşlarıdır.</p>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">PCR ve NGS Arasındaki Farklar</h2>
        <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm text-left text-slate-700 m-0">
            <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase text-xs">
              <tr>
                <th className="px-6 py-4 border-b">Özellik</th>
                <th className="px-6 py-4 border-b border-l">PCR (qPCR / Konvansiyonel)</th>
                <th className="px-6 py-4 border-b border-l">NGS (Yeni Nesil Dizileme)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold bg-slate-50">Amaç</td>
                <td className="px-6 py-4 border-l">Bilinen, spesifik ve sınırlı bir hedef bölgeyi çoğaltmak ve tespit etmek.</td>
                <td className="px-6 py-4 border-l">Milyonlarca DNA/RNA molekülünün şifresini eş zamanlı ve paralel okumak.</td>
              </tr>
              <tr className="border-b bg-white hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold bg-slate-50">İncelenen Bölge</td>
                <td className="px-6 py-4 border-l">Tek veya birkaç hedef gen/bölge.</td>
                <td className="px-6 py-4 border-l">Tüm genom, ekzom, transkriptom veya yüzlerce genden oluşan paneller.</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold bg-slate-50">Maliyet ve Süre</td>
                <td className="px-6 py-4 border-l">Örnek başına ucuzdur; birkaç saat içinde sonuç verir.</td>
                <td className="px-6 py-4 border-l">Kurulum ve sarf maliyeti yüksektir; günler sürebilir.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 mb-6">Hangi Teknik Ne Zaman Kullanılır?</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong className="font-bold text-slate-900">PCR Seçmeniz Gereken Durumlar:</strong> Belirli gende mutasyon doğrulamak, rutin enfeksiyon ajanı tespiti yapmak.</li>
          <li><strong className="font-bold text-slate-900">RT-qPCR Seçmeniz Gereken Durumlar:</strong> Önceden bilinen 3-5 genin mRNA düzeylerini sayısal olarak ölçmek.</li>
          <li><strong className="font-bold text-slate-900">NGS Seçmeniz Gereken Durumlar:</strong> Tüm genom/ekzom haritasını çıkarmak, nadir hastalık araştırmak, hücrenin tüm ekspresyon profilini küresel olarak incelemek.</li>
        </ul>

        <div className="p-6 bg-cyan-50 rounded-2xl text-base text-cyan-900 mt-8 border-l-4 border-cyan-500 shadow-sm">
          <strong className="font-extrabold">Özet:</strong> PCR mikroskobik bir el feneri gibi belirli bir noktayı aydınlatarak o bölgeyi kopyalarken; NGS devasa bir projektör gibi tüm genomik veya transkriptomik manzarayı aynı anda detaylarıyla okur ve kaydeder. Odak noktanız sınırlıysa PCR, araştırma hedefiniz keşfedici ise NGS tercih edilmelidir.
        </div>
      </div>
    )
  }
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24">
      <article className="max-w-5xl mx-auto px-4 md:px-8">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-pink-600 transition-colors mb-10 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
          <ArrowLeft className="w-4 h-4" /> Tüm Yazılara Dön
        </Link>

        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-500 mb-6">
            <span className="flex items-center gap-1.5 text-pink-600 bg-pink-50 px-4 py-1.5 rounded-full font-bold">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>

          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
            {post.title}
          </h1>
        </header>

        {post.image && (
          <div className="relative w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden mb-12 shadow-lg border border-slate-200">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="bg-white p-6 md:p-14 rounded-3xl shadow-sm border border-slate-200 w-full">
          {post.content}
        </div>
        
      </article>
    </div>
  );
}
