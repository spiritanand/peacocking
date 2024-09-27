"use server";

import crypto from "crypto";
import { env } from "@web/env";
import { db } from "@web/server/db";
import { users } from "@web/server/db/schema";
import { eq } from "drizzle-orm";

export async function VerifyOrderAction({
  razorpayOrderId,
  razorpaySignature,
  razorpayPaymentId,
  email,
  credits,
  previousBal,
}: {
  razorpayOrderId: string;
  razorpaySignature: string;
  razorpayPaymentId: string;
  email: string;
  credits: number;
  previousBal: number;
}) {
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (!isAuthentic)
    return { success: false, message: "invalid payment signature" };

  // connect db and update data
  await db
    .update(users)
    .set({ credits: previousBal + credits })
    .where(eq(users.email, email));

  return { success: true };
}
