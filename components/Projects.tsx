"use client";

import { useState, useEffect } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  link?: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 Fetching public projects…");
    fetch("/api/projects")
      .then((r) => {
        console.log("Fetch status (public GET):", r.status);
        return r.json();
      })
      .then((data) => {
        console.log("Public projects loaded:", data);
        setProjects(data);
      })
      .catch((err) => console.error("Public fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-8">Yükleniyor...</p>;
  if (projects.length === 0) return <p className="text-center py-8">Henüz proje eklenmemiş.</p>;

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Projelerim</h2>
      <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2">
        {projects.map((p) => (
          <div key={p.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-gray-700 mb-4">{p.description}</p>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                İncele →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
