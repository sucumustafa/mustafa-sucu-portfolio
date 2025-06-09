// pages/api/admin/users/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../lib/prisma";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req: _ });
  if (!session || session.user!.role !== "ADMIN") return res.status(403).end();
  const users = await prisma.user.findMany({ select: { id: true, email: true, role: true, name: true } });
  res.json(users);
}
