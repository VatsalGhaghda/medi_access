import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      medicalConditions,
      allergies,
      pastSurgeries,
      primaryDoctorName,
      primaryDoctorContact,
      insurancePolicyNumber,
      preferredHospital,
      personalInfoId,
    } = req.body;

    try {
      const healthInfo = await prisma.healthInfo.create({
        data: {
          medicalConditions,
          allergies,
          pastSurgeries,
          primaryDoctorName,
          primaryDoctorContact,
          insurancePolicyNumber,
          preferredHospital,
          personalInfoId,
        },
      });

      res.status(200).json({ success: true, data: healthInfo });
    } catch (error) {
      res.status(500).json({ success: false, error:"error occured" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
