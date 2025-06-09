// pages/admin/users.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

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
    fetch("/api/admin/users", { credentials: "include" })
      .then((r) => r.json())
      .then(setUsers);
  }, [session, status]);

  const changeRole = async (id: string, role: "USER" | "ADMIN") => {
    await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    setUsers((u) => u.map(x => x.id === id ? { ...x, role } : x));
  };

  const del = async (id: string) => {
    await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setUsers((u) => u.filter(x => x.id !== id));
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

        <h1 className="text-2xl font-bold">Kullanıcı Yönetimi</h1>
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
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
                  >
                    {u.role === "ADMIN" ? "USER Yap" : "ADMIN Yap"}
                  </button>
                  <button
                    onClick={() => del(u.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
