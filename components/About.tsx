// components/About.tsx
"use client";

export default function About() {
  return (
    <section id="about" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Hakkımda</h2>
      <div className="max-w-3xl mx-auto text-center text-gray-700 space-y-4">
        <p>
          Merhaba! Ben Mustafa Sucu. Yazılım geliştirme ve web tasarımı
          konusunda tutkulu bir acemiyim. Üniversitede bilgisayar
          programcılığı okuyorum ve serbest zamanlarımda React, Next.js projeleri
          geliştiriyorum.
        </p>
        <p>
          Hedefim her projede temiz kod, iyi kullanıcı deneyimi ve performans
          odaklı çözümler üretmek. Yeni teknolojileri öğrenmekten ve takım
          çalışmasından keyif alıyorum.
        </p>
      </div>
    </section>
  );
}
