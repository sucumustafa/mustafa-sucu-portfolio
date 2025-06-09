// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const projects = [
    {
      title: "Kitap Kulübü Uygulaması",
      description: "Next.js, Prisma ve SQLite kullandım.",
      link: "#",
    },
    {
      title: "Etkinlik Takip Sistemi",
      description: "Rol tabanlı erişim ve admin paneli.",
      link: "#",
    },
  ];

  for (const p of projects) {
    // Başlık bazında kontrol et
    const exists = await prisma.project.findFirst({
      where: { title: p.title },
    });
    if (!exists) {
      await prisma.project.create({ data: p });
      console.log(`✔ Proje eklendi: ${p.title}`);
    } else {
      console.log(`ℹ️ Proje zaten var, atlandı: ${p.title}`);
    }
  }

  console.log("✅ Seed tamamlandı.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
