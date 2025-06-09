<<<<<<< HEAD
# Kişisel Web Sitesi

## Proje Tanımı  
Bu uygulama, **Mustafa Sucu** tarafından geliştirilen kişisel web sitesidir.  
Kullanıcılar;  
- Kayıt olma ve giriş yapma,  
- Profil bilgilerini görüntüleme ve güncelleme,  
- Diğer kullanıcılara mesaj gönderme,  
işlemlerini gerçekleştirebilir.  
Admin rolündeki kullanıcılar ise;  
- Kullanıcı yönetimi (listeleme, silme, rol değiştirme),  
- Proje yönetimi (projeleri ekleme, listeleme, silme)  
işlemlerini yapabilir.  

## Kullanılan Teknolojiler  
- **Next.js** (React tabanlı full-stack framework)  
- **React**  
- **Prisma** (ORM) + **SQLite** (yerel veritabanı)  
- **Tailwind CSS** (stil kütüphanesi)  
- **NextAuth.js** (kimlik doğrulama)  
- **bcryptjs** (şifrelerin güvenli hash’lenmesi)  

## Açıklama  
Bu proje, hem portfolyonuzu sergilemeniz hem de kullanıcılar arası etkileşim sağlamanız için tasarlanmıştır.  
- Yeni bir kullanıcı hızlıca kayıt olup giriş yapabilir,  
- Mesajlaşma sistemi sayesinde birbirinize özel mesajlar gönderebilirsiniz,  
- Admin kullanıcılar, sistemdeki tüm kullanıcıların rollerini yönetebilir ve projelerinizi dinamik olarak ekleyip silebilir.  

## Kurulum Talimatları  
1. Depoyu klonlayın ve dizine geçin:  
   ```bash
   git clone https://github.com/kullaniciadi/proje-adi.git
   cd proje-adi

 ## Bağımlılıkları yükleyin:

npm install

## Ortam değişkenlerini ayarlayın (.env.local):

DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="rastgele-32-byte-string"

## Veritabanını oluşturun ve seed verilerini ekleyin:

npx prisma migrate dev --name init
npx prisma db seed

## Geliştirme sunucusunu başlatın:

npm run dev

## Tarayıcıda açın:

http://localhost:3000

## Admin Giriş Bilgileri
Aşağıdaki hesap sadece test amaçlıdır:

E-posta: a@a.com
Şifre: 123456
=======
# mustafa-sucu-portfolio
>>>>>>> e91919f9a6065e802d5e9c2f2baa677921b229ee

https://github.com/sucumustafa/mustafa-sucu-portfolio
