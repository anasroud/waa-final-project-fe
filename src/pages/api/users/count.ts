import { NextApiRequest, NextApiResponse } from "next";
import usersData from "./users.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    res.status(200).json({ count: usersData.length });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
