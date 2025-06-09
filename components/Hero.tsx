"use client";

export default function Hero() {
  return (
    <section className="relative h-[600px] w-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Merhaba, ben Mustafa Sucu
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl">
          Yazılım geliştirme ve web tasarımı konusunda tutkulu bir profesyonelim.
        </p>
      </div>
    </section>
  );
}
