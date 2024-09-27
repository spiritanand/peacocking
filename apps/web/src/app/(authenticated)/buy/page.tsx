import { getServerAuthSession } from "@web/server/auth";
import React from "react";
import PaymentButton from "../PaymentButton";
import { CustomCreditPurchase } from "../CustomCreditPurchase";
import { env } from "@web/env";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerAuthSession();
  const rzpKey = env.RAZORPAY_ID;

  if (!session) redirect("/api/auth/signin?callbackUrl=/buy");

  return (
    <div className="container flex h-[75vh] flex-col items-center justify-center py-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <PaymentButton
          usdAmount={9.99}
          session={session}
          rzpKey={rzpKey}
          ctaText="Get Starter Pack"
        />

        <p>10 Credits for $9.99</p>
      </div>

      <p className="my-10 text-center text-gray-500">OR</p>

      <CustomCreditPurchase session={session} rzpKey={rzpKey} />
    </div>
  );
}
