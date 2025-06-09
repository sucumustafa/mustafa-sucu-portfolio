// pages/messages.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  sender: { id: string; name: string };
  receiver: { id: string; name: string };
};

type UserOption = { id: string; name: string };

export default function MessagesPage() {
  const { data: session, status } = useSession({ required: true });
  const [users, setUsers] = useState<UserOption[]>([]);
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [form, setForm] = useState({ receiverId: "", content: "" });

  // session yüklenene kadar bekleyelim
  if (status === "loading" || !session) {
    return <p>Yükleniyor…</p>;
  }

  const userId = session.user!.id;

  useEffect(() => {
    // Kullanıcı listesini çek
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers);
    loadMsgs();
  }, []);

  const loadMsgs = () =>
    fetch("/api/messages")
      .then((r) => r.json())
      .then(setMsgs);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.receiverId) return;
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ ...form, content: "" });
    loadMsgs();
  };

  // Trim kullanmadan sade eşleştirme
  const received = msgs.filter((m) => m.receiverId === userId);
  const sent     = msgs.filter((m) => m.senderId   === userId);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Ana sayfaya dönüş */}
      <Link href="/" className="text-blue-600 hover:underline">
        ← Ana Sayfaya Dön
      </Link>

      <h2 className="text-2xl font-bold">Mesajlaşma</h2>

      {/* Mesaj Gönderme Formu */}
      <form onSubmit={handleSend} className="flex gap-2">
        <select
          value={form.receiverId}
          onChange={(e) => setForm({ ...form, receiverId: e.target.value })}
          className="border p-2 flex-1"
          required
        >
          <option value="">Alıcı Seç</option>
          {users
            .filter((u) => u.id !== userId)
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Mesajınız..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border p-2 flex-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Gönder
        </button>
      </form>

      {/* Gelen Mesajlar */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Gelen Mesajlar</h3>
        {received.length === 0 ? (
          <p className="text-gray-500">Hiç gelen mesajınız yok.</p>
        ) : (
          <ul className="space-y-4">
            {received.map((m) => (
              <li key={m.id} className="p-3 border rounded-lg bg-gray-50">
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">{m.sender.name}</span> tarafından gönderildi
                </div>
                <p>{m.content}</p>
                <small className="text-gray-400">
                  {new Date(m.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Gönderilen Mesajlar */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Gönderilen Mesajlar</h3>
        {sent.length === 0 ? (
          <p className="text-gray-500">Hiç mesaj göndermediniz.</p>
        ) : (
          <ul className="space-y-4">
            {sent.map((m) => (
              <li key={m.id} className="p-3 border rounded-lg bg-gray-50">
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Alıcı:</span> {m.receiver.name}
                </div>
                <p>{m.content}</p>
                <small className="text-gray-400">
                  {new Date(m.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
