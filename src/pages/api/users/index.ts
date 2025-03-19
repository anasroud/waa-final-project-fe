import { Users } from "@/types/Users";
import { NextApiRequest, NextApiResponse } from "next";
import usersData from "./users.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (
    isNaN(pageNumber) ||
    isNaN(limitNumber) ||
    pageNumber < 1 ||
    limitNumber < 1
  ) {
    return res.status(400).json({ message: "Invalid page or limit" });
  }

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;
  const paginatedUsers = usersData.slice(startIndex, endIndex);

  try {
    res.status(200).json({
      total: usersData.length,
      users: paginatedUsers as Users[],
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
