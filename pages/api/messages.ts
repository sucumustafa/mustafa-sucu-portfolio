// pages/api/messages.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();

  const userId = session.user!.id;

  if (req.method === "GET") {
    // Kendisi gönderici veya alıcı olan tüm mesajlar
    const msgs = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return res.json(msgs);
  }

  if (req.method === "POST") {
    const { receiverId, content } = req.body as { receiverId: string; content: string };
    const msg = await prisma.message.create({
      data: {
        senderId: userId,
        receiverId,
        content,
      },
    });
    return res.status(201).json(msg);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end();
}
