"use server";

import { createId } from "@paralleldrive/cuid2";
import { env } from "@web/env";
import { INR_TO_USD_RATE } from "@web/lib/constants";
import { AddCreditsSchema } from "@web/lib/types";
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: env.RAZORPAY_ID,
  key_secret: env.RAZORPAY_KEY,
});

export async function CreateOrderAction({
  totalAmount,
  currency,
}: {
  totalAmount: number;
  currency: "INR" | "USD";
}) {
  const parsed = AddCreditsSchema.safeParse({ credits: totalAmount });

  if (!parsed.success && totalAmount !== 9.99) {
    return { order: null, success: false };
  }

  const amount =
    currency === "INR" ? totalAmount * INR_TO_USD_RATE : totalAmount;
  const options = {
    amount: (amount * 100).toString(),
    currency: currency,
    receipt: createId(),
  };

  try {
    const order = await instance.orders.create(options);
    return { order, success: true };
  } catch (_e) {
    return { order: null, success: false };
  }
}
