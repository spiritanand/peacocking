import { RequestStatus } from "@web/lib/constants";
import { ImageGenerationWebhookSchema } from "@web/lib/types";
import { db } from "@web/server/db";
import { gens, requests } from "@web/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  return Response.json({ message: "Hello Gena" });
}

export async function POST(request: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const rawData = await request.json();

    const parsed = ImageGenerationWebhookSchema.safeParse(rawData);

    if (!parsed.success)
      return NextResponse.json(
        { success: false, message: parsed.error.message },
        { status: 500 },
      );

    const { data } = parsed;

    const { payload, request_id } = data;

    await db
      .update(requests)
      .set({
        status: RequestStatus.COMPLETED,
      })
      .where(eq(requests.id, request_id));

    await db
      .update(gens)
      .set({
        output: payload,
      })
      .where(eq(gens.requestId, request_id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
