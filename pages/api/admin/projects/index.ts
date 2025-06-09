// pages/api/admin/projects/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Oturum bilgisini al ve logla
  const session = await getSession({ req });
  console.log("🛂 /api/admin/projects session:", session);

  // Kimlik doğrulama
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Yetki kontrolü
  if (session.user?.role !== "ADMIN") {
    return res.status(403).json({ error: "Not authorized" });
  }

  // Yönteme göre işleme al
  switch (req.method) {
    case "GET":
      try {
        const projects = await prisma.project.findMany({
          orderBy: { createdAt: "desc" },
        });
        return res.status(200).json(projects);
      } catch (error) {
        console.error("GET /api/admin/projects error:", error);
        return res.status(500).json({ error: "Server error" });
      }

    case "POST":
      try {
        const { title, description, link } = req.body;
        if (!title || !description) {
          return res.status(400).json({ error: "Title and description are required" });
        }
        const proj = await prisma.project.create({
          data: { title, description, link },
        });
        return res.status(201).json(proj);
      } catch (error) {
        console.error("POST /api/admin/projects error:", error);
        return res.status(500).json({ error: "Server error" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
