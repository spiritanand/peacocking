import { insertModel } from "@web/data/db";
import { RequestStatus } from "@web/lib/constants";
import { ModelCreationWebhookSchema } from "@web/lib/types";
import { db } from "@web/server/db";
import { requests } from "@web/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  return Response.json({ message: "Hello Model" });
}

export async function POST(request: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const raw = await request.json();

    const parsed = ModelCreationWebhookSchema.safeParse(raw);

    console.log({ parsed });

    if (!parsed.success)
      return NextResponse.json(
        { success: false, message: parsed.error.message },
        { status: 500 },
      );

    const { data } = parsed;
    const { request_id, payload } = data;

    // Update the request status
    await db
      .update(requests)
      .set({ status: RequestStatus.COMPLETED })
      .where(eq(requests.id, request_id));

    // Insert the created model into the database
    await insertModel({
      requestId: request_id,
      configFile: payload.config_file.url,
      loraFile: payload.diffusers_lora_file.url,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error({ error });

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
