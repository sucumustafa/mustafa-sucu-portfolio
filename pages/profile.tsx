"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";  // ← ekledik

export default function ProfilePage() {
  const { data: session } = useSession({ required: true });
  const [form, setForm] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((user) => setForm({ name: user.name || "", email: user.email }));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, password: password || undefined }),
    });
    if (res.ok) {
      setMsg("Bilgiler güncellendi.");
      setPassword("");
    } else {
      setMsg("Güncelleme hatası.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* ← Ana sayfaya dönüş linki */}
      <div>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Ana Sayfaya Dön
        </Link>
      </div>

      <h2 className="text-2xl font-bold">Profilim</h2>
      {msg && <div className="text-green-600">{msg}</div>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">E-Posta</label>
          <input
            type="email"
            value={form.email}
            disabled
            className="w-full border p-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1">İsim</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Yeni Şifre (isteğe bağlı)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Güncelle
        </button>
      </form>
    </div>
  );
}
