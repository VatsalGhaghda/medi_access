// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await prisma.personalInfo.findUnique({ where: { email } });

      if (!user) return res.status(400).json({ message: "User not found" });

      if (password === user.password) {
        return res.status(200).json({ message: "Login successful", email });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
