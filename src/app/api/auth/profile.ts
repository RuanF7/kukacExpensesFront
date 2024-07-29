import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const response = await axios.get("http://localhost:4000/auth/profile", {
      headers: { Authorization: authorization },
    });
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || { message: "An error occurred" });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}
