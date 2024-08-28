import { route } from "@fal-ai/serverless-proxy/nextjs";
import { getServerAuthSession } from "@web/server/auth";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getServerAuthSession();

  if (!session)
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );

  return route.POST(req);
};

export const GET = route.GET;
