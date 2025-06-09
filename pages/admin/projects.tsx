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
  const { data: session, status } = useSession({ required: true });
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ title: "", description: "", link: "" });

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "ADMIN") {
      window.location.href = "/";
      return;
    }

    console.log("🔄 Fetching admin projects…");
    fetch("/api/admin/projects", { credentials: "include" })
      .then((r) => {
        console.log("Fetch status (GET):", r.status);
        return r.json();
      })
      .then((data) => {
        console.log("Projects loaded:", data);
        setProjects(data);
      })
      .catch((err) => console.error("Fetch GET error:", err));
  }, [session, status]);

  const saveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🛰  Submitting new project:", form);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    console.log("POST status:", res.status);
    if (!res.ok) {
      const text = await res.text();
      console.error("POST error response:", text);
      alert(`Proje eklenirken hata: ${res.status}`);
      return;
    }
    const p: Project = await res.json();
    console.log("New project created:", p);
    setProjects((ps) => [p, ...ps]);
    setForm({ title: "", description: "", link: "" });
  };

  const del = async (id: string) => {
    console.log("🚮 Deleting project:", id);
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    console.log("DELETE status:", res.status);
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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Ana Sayfaya Dön
        </Link>
        <nav className="flex gap-4">
          <Link href="/admin/users" className="px-3 py-1 rounded hover:bg-blue-100 transition">
            Kullanıcı Yönetimi
          </Link>
          <Link href="/admin/projects" className="px-3 py-1 rounded hover:bg-blue-100 transition">
            Proje Yönetimi
          </Link>
        </nav>
      </div>

      <h1 className="text-2xl font-bold">Proje Yönetimi</h1>

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
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Ekle
        </button>
      </form>

      <ul className="space-y-4">
        {projects.map((p) => (
          <li key={p.id} className="border p-4 flex justify-between items-start rounded-lg hover:shadow-md transition">
            <div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-700">{p.description}</p>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  İncele →
                </a>
              )}
            </div>
            <button onClick={() => del(p.id)} className="text-red-500 hover:text-red-700 transition">
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
