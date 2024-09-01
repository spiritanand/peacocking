"use client";

/* eslint-disable */ //TODO: Remove this line

import React, { useState } from "react";
import { type Session } from "next-auth";
import { Button } from "@web/components/ui/button";

interface Window {
  Razorpay: any;
}

const PaymentButton = ({
  key,
  session,
  amount,
}: {
  session: Session;
  amount: number;
  key: string;
}) => {
  const userEmail = session?.user?.email;
  const previousBal = session.user?.credits;

  const [isLoading, setIsLoading] = useState(false);

  const makePayment = async () => {
    setIsLoading(true);

    const data = await fetch("/api/order/create?amount=" + amount);
    const { order } = await data?.json();
    const options = {
      key: key,
      name: userEmail,
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
      },
      handler: async function (response: {
        razorpay_payment_id: any;
        razorpay_order_id: any;
        razorpay_signature: any;
      }) {
        const data = await fetch("/api/order/verify", {
          method: "POST",
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email: userEmail,
            credits: 10,
            previousBal,
          }),
        });

        const res = await data.json();
      },
      prefill: {
        email: userEmail,
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response: any) {
      alert("Payment failed. Please try again.");
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="">
        <Button disabled={isLoading} onClick={makePayment}>
          Add Credits
        </Button>
      </div>
    </>
  );
};

export default PaymentButton;
