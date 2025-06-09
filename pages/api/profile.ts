// pages/api/profile.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();

  const userId = session.user!.id;
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, role: true },
    });
    return res.json(user);
  }

  if (req.method === "PUT") {
    const { name, password } = req.body as { name?: string; password?: string };
    const data: any = {};
    if (name) data.name = name;
    if (password) data.password = await hash(password, 10);
    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: { name: true, email: true, role: true },
    });
    return res.json(updated);
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  res.status(405).end();
}
