// pages/admin/projects.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type Project = {
  id: string;
  title: string;
  description: string;
  link?: string;
};

export default function AdminProjectsPage() {
  const { data: session, status } = useSession({ required: true });
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ title: "", description: "", link: "" });

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "ADMIN") {
      window.location.href = "/";
      return;
    }

    fetch("/api/admin/projects", { credentials: "include" })
      .then((r) => r.json())
      .then(setProjects)
      .catch(console.error);
  }, [session, status]);

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

  if (status === "loading") {
    return <p className="p-6 text-center">Yükleniyor…</p>;
  }

  return (
    <>
      {/* Ortak Navbar */}
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Sekmeler ve Çıkış */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <Link
              href="/admin/users"
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
            >
              Kullanıcı Yönetimi
            </Link>
            <Link
              href="/admin/projects"
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
            >
              Proje Yönetimi
            </Link>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Çıkış Yap
          </button>
        </div>

        <h1 className="text-2xl font-bold">Proje Yönetimi</h1>

        <form onSubmit={saveNew} className="space-y-4 mb-6">
          <input
            value={form.title}
            onChange={(e) =>
              setForm((f) => ({ ...f, title: e.target.value }))
            }
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
            onChange={(e) =>
              setForm((f) => ({ ...f, link: e.target.value }))
            }
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
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
    </>
  );
}
