// pages/admin/projects.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  link?: string;
};

export default function AdminProjectsPage() {
  // 1. Oturum bilgisini al
  const { data: session, status } = useSession({ required: true });
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ title: "", description: "", link: "" });

  // 2. Yüklenirken veya role uymuyorsa yönlendir
  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "ADMIN") {
      window.location.href = "/";
      return;
    }
    // 3. Projeleri çekerken cookie dahil et
    fetch("/api/admin/projects", { credentials: "include" })
      .then((r) => r.json())
      .then(setProjects)
      .catch(console.error);
  }, [session, status]);

  // 4. Yeni proje ekleme
  const saveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      alert(`Proje eklenirken hata: ${res.status}`);
      return;
    }
    const p: Project = await res.json();
    setProjects((ps) => [p, ...ps]);
    setForm({ title: "", description: "", link: "" });
  };

  // 5. Proje silme
  const del = async (id: string) => {
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      alert(`Proje silinirken hata: ${res.status}`);
      return;
    }
    setProjects((ps) => ps.filter((p) => p.id !== id));
  };

  // 6. Loading spinner gösterebilirsin
  if (status === "loading") {
    return <p className="p-6 text-center">Yükleniyor…</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Üst Menü */}
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Ana Sayfaya Dön
        </Link>
        <nav className="flex gap-4">
          <Link
            href="/admin/users"
            className="px-3 py-1 font-medium rounded hover:bg-blue-100 transition"
          >
            Kullanıcı Yönetimi
          </Link>
          <Link
            href="/admin/projects"
            className="px-3 py-1 font-medium rounded hover:bg-blue-100 transition"
          >
            Proje Yönetimi
          </Link>
        </nav>
      </div>

      <h1 className="text-2xl font-bold">Proje Yönetimi</h1>

      {/* Yeni Proje Formu */}
      <form onSubmit={saveNew} className="space-y-4 mb-6">
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Başlık"
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Açıklama"
          className="border p-2 w-full rounded"
          required
        />
        <input
          value={form.link}
          onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
          placeholder="Link (opsiyonel)"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Ekle
        </button>
      </form>

      {/* Proje Listesi */}
      <ul className="space-y-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="border p-4 flex justify-between items-start rounded-lg hover:shadow-md transition"
          >
            <div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-700">{p.description}</p>
              {p.link && (
                <a
                  href={p.link}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  İncele →
                </a>
              )}
            </div>
            <button
              onClick={() => del(p.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
