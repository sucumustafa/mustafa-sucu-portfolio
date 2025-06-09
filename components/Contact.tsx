// components/Contact.tsx
"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">İletişim</h2>
      <div className="max-w-md mx-auto space-y-4">
        <a
          href="mailto:mustafa@example.com"
          className="block text-center text-lg font-medium text-blue-600 hover:underline"
        >
          mustafa@example.com
        </a>
        <p className="text-center text-gray-600">
          Bana bu e-posta adresi üzerinden ulaşabilirsin.  
          Sosyal medya ve diğer iletişim kanalları için alt kısımdaki ikonları
          ekleyebilirsin.
        </p>
      </div>
    </section>
  );
}
