import { insertModel } from "@web/data/db";
import { RequestStatus } from "@web/lib/constants";
import { ModelCreationWebhookSchema } from "@web/lib/types";
import { db } from "@web/server/db";
import { requests, users } from "@web/server/db/schema";
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

    if (!parsed.success)
      return NextResponse.json(
        { success: false, message: parsed.error.message },
        { status: 500 },
      );

    const { data } = parsed;
    const { request_id, payload, status } = data;

    // Model Creation failed
    if (status === "ERROR") {
      const updatedUserIds = await db
        .update(requests)
        .set({ status: RequestStatus.FAILED })
        .where(eq(requests.id, request_id))
        .returning({ updatedUserId: requests.userId });

      const updatedUserId = updatedUserIds[0];
      const userId = updatedUserId?.updatedUserId;

      if (!userId)
        return NextResponse.json(
          { success: false, message: "No valid user/request" },
          { status: 500 },
        );

      // TODO: Shift credits updates to a utility function

      // Update the user's credits
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      if (!user)
        return NextResponse.json(
          { success: false, message: "No valid user" },
          { status: 500 },
        );

      const currentCredits = user?.credits;

      await db
        .update(users)
        .set({ credits: currentCredits + 5 }) // TODO: Shift costed credits value to constants
        .where(eq(users.id, userId));

      return NextResponse.json({
        success: true,
        message: "Failed model creation",
      });
    }

    // Status is OK => Model creation was successful
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
