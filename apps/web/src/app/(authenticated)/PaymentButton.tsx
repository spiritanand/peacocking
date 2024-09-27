"use client";

import React from "react";
import { type Session } from "next-auth";
import { Button } from "@web/components/ui/button";
import { makePayment } from "@web/lib/rzpUtils";

const PaymentButton = ({
  closeModal,
  ctaText,
  rzpKey,
  session,
  usdAmount,
}: {
  closeModal: () => void;
  ctaText: string;
  rzpKey: string;
  session: Session;
  usdAmount: number;
}) => {
  const userEmail = session?.user?.email;
  const previousBal = session.user?.credits;

  return (
    <Button
      type={"button"}
      onClick={async () => {
        closeModal();

        await makePayment({
          rzpKey,
          usdAmount,
          userEmail: userEmail!,
          previousBal,
        });
      }}
      className="w-full"
    >
      {ctaText}
    </Button>
  );
};

export default PaymentButton;
