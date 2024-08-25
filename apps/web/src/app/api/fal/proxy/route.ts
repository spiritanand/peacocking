import { route } from "@fal-ai/serverless-proxy/nextjs";
import { getServerAuthSession } from "@web/server/auth";
import { type NextApiResponse } from "next";
import { type NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession();

  if (!session)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  return route.POST(req);
};

export const GET = route.GET;
