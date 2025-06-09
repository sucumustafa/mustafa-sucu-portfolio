// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * DefaultSession’e ekleme yapıyoruz.
   * Artık session.user.role ve session.user.id de tanınacak.
   */
  interface Session {
    user: {
      /** NextAuth’in DefaultSession içindeki alanları koru */
      id: DefaultSession["user"]["id"];
      role: "USER" | "ADMIN";
    } & Omit<DefaultSession["user"], "id">; 
  }

  /**
   * Eğer NextAuth’in getToken ya da authorize callback’inde
   * User’a yeni alanlar ekliyorsanız, onları da buraya yazın.
   */
  interface User extends DefaultUser {
    role: "USER" | "ADMIN";
  }
}
