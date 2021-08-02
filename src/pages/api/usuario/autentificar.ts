import { NextApiResponse, NextApiRequest } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
}