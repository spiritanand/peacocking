import { ImageGenerationWebhookSchema } from "@web/lib/types";
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
