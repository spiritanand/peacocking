import { createId } from "@paralleldrive/cuid2";
import { env } from "@web/env";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const dynamic = "force-dynamic";

const instance = new Razorpay({
  key_id: env.RAZORPAY_ID,
  key_secret: env.RAZORPAY_KEY,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const totalAmount = Number(searchParams.get("amount"));

  const amount = totalAmount * 100;
  const options = {
    amount: amount.toString(),
    currency: "INR",
    receipt: createId(),
  };

  const order = await instance.orders.create(options);
  return NextResponse.json({ message: "success", order });
}
