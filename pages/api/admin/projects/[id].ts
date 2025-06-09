// pages/api/admin/projects/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session || session.user!.role !== "ADMIN") return res.status(403).end();
  const { id } = req.query;

  if (req.method === "PUT") {
    const { title, description, link } = req.body;
    const updated = await prisma.project.update({
      where: { id: String(id) },
      data: { title, description, link },
    });
    return res.json(updated);
  }
  if (req.method === "DELETE") {
    await prisma.project.delete({ where: { id: String(id) } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["PUT","DELETE"]);
  res.status(405).end();
}
