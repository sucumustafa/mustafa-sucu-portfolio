// pages/api/users.ts
import { prisma } from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
  });
  res.json(users);
}
