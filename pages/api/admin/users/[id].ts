// pages/api/admin/users/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session || session.user!.role !== "ADMIN") return res.status(403).end();

  const { id } = req.query;
  if (req.method === "DELETE") {
    await prisma.user.delete({ where: { id: String(id) } });
    return res.status(204).end();
  }
  if (req.method === "PUT") {
    const { role } = req.body as { role: "USER" | "ADMIN" };
    // Admin kendi rolünü değiştiremesin
    if (session.user!.id === id) return res.status(400).json({ error: "Kendi rolünüzü değiştiremezsiniz." });
    const updated = await prisma.user.update({
      where: { id: String(id) },
      data: { role },
      select: { id: true, email: true, role: true },
    });
    return res.json(updated);
  }

  res.setHeader("Allow", ["DELETE", "PUT"]);
  res.status(405).end();
}
