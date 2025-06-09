// pages/api/register.ts
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Eksik alan" });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ error: "Bu e-posta zaten kayıtlı" });

  const hashed = await hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return res.status(201).json({ id: user.id, email: user.email });
}
