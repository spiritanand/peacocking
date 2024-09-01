import { createId } from "@paralleldrive/cuid2";
// import { env } from "@web/env";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function GET(request: Request) {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID!,
    key_secret: process.env.RAZORPAY_KEY!,
  });

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
