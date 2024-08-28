import { ModelCreationWebhookSchema } from "@web/lib/types";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  return Response.json({ message: "Hello Model" });
}

export async function POST(request: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const raw = await request.json();

    const parsed = ModelCreationWebhookSchema.safeParse(raw);

    // TODO: Save the gen in DB
    console.log({ data: parsed });

    if (!parsed.success)
      return NextResponse.json({ success: false }, { status: 500 });

    const { data } = parsed;
    const { payload } = data;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
