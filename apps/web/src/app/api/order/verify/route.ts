/* eslint-disable */ //TODO: Remove this line

import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { env } from "@web/env";
import { db } from "@web/server/db";
import { users } from "@web/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const {
    razorpayOrderId,
    razorpaySignature,
    razorpayPaymentId,
    email,
    credits,
    previousBal,
  } = await req.json();
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (!isAuthentic)
    return NextResponse.json(
      { message: "invalid payment signature", error: true },
      { status: 400 },
    );

  // connect db and update data
  await db
    .update(users)
    .set({ credits: previousBal + credits })
    .where(eq(users.email, email));
  console.log({ email, razorpayOrderId, razorpayPaymentId, razorpaySignature });

  return NextResponse.json(
    { message: "payment success", error: false },
    { status: 200 },
  );
}
