// pages/api/projects/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return res.json(projects);
}
