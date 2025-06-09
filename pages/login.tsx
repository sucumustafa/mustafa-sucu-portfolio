// pages/login.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="email"
        placeholder="E-posta"
        className="w-full border p-2"
        value={form.email}
        onChange={(e) => setForm({...form, email: e.target.value})}
        required
      />
      <input
        type="password"
        placeholder="Şifre"
        className="w-full border p-2"
        value={form.password}
        onChange={(e) => setForm({...form, password: e.target.value})}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Giriş Yap
      </button>
    </form>
  );
}
