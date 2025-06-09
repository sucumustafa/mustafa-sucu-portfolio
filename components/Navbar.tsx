// components/Navbar.tsx
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 px-45 py-20 flex items-center justify-between shadow-lg">
      {/* Site Başlığı */}
      <Link
        href="/"
        className="text-white text-2xl font-semibold tracking-wide hover:text-primary-light transition-colors duration-200"
      >
        Kişisel Web Sitesi
      </Link>

      {/* Menü Öğeleri */}
      <ul className="flex items-center space-x-8 list-none m-0 p-0">
        <li>
          <Link
            href="/profile"
            className="text-white text-base hover:text-primary-light transition-colors duration-200"
          >
            Profil
          </Link>
        </li>
        <li>
          <Link
            href="/messages"
            className="text-white text-base hover:text-primary-light transition-colors duration-200"
          >
            Mesajlar
          </Link>
        </li>

        {session?.user?.role === "ADMIN" && (
          <li>
            <Link
              href="/admin/users"
              className="text-white text-base font-medium hover:text-primary-light transition-colors duration-200"
            >
              Admin Panel
            </Link>
          </li>
        )}

        {!session ? (
          <>
            <li>
              <Link
                href="/register"
                className="text-white text-base hover:text-primary-light transition-colors duration-200"
              >
                Kayıt Ol
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-white text-base hover:text-primary-light transition-colors duration-200"
              >
                Giriş Yap
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 hover:bg-red-600 text-white text-base px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Çıkış Yap
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
