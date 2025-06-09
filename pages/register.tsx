// pages/register.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        placeholder="İsim"
        className="w-full border p-2"
        value={form.name}
        onChange={(e) => setForm({...form, name: e.target.value})}
      />
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
        Kayıt Ol
      </button>
    </form>
  );
}
