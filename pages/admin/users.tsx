"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type User = { id: string; email: string; name?: string; role: string; };

export default function AdminUsersPage() {
  const { data: session, status } = useSession({ required: true });
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "ADMIN") {
      window.location.href = "/";
      return;
    }
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then(setUsers);
  }, [session, status]);

  const changeRole = async (id: string, role: "USER"|"ADMIN") => {
    await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    setUsers((u) => u.map(x => x.id === id ? { ...x, role } : x));
  };

  const del = async (id: string) => {
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    setUsers((u) => u.filter(x => x.id !== id));
  };

  if (status === "loading") return <p>Yükleniyor…</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Üst Menü: Ana Sayfaya Dön & Admin Panel Nav */}
      <div className="flex justify-between items-center mb-4">
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
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

      <h1 className="text-2xl mb-4">Kullanıcı Yönetimi</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Rol</th>
            <th className="border px-2 py-1">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.role}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() =>
                    changeRole(u.id, u.role === "ADMIN" ? "USER" : "ADMIN")
                  }
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
                >
                  {u.role === "ADMIN" ? "USER Yap" : "ADMIN Yap"}
                </button>
                <button
                  onClick={() => del(u.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
