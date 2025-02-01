// pages/api/user.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { email } = req.query;

    try {
      const user = await prisma.personalInfo.findUnique({ where: { email: email as string } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user", message: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
