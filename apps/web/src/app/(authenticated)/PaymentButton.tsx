"use client";

/* eslint-disable */ //TODO: Remove this line

import React, { useState } from "react";
import { type Session } from "next-auth";
import { Button } from "@web/components/ui/button";
import { isIndianTimeZone } from "@web/lib/utils";

const PaymentButton = ({ key, session }: { session: Session; key: string }) => {
  const userEmail = session?.user?.email;
  const previousBal = session.user?.credits;

  const [isLoading, setIsLoading] = useState(false);

  const makePayment = async () => {
    setIsLoading(true);

    // Create URL based on timezone
    const url = new URL("/api/order/create", window.location.origin);
    const INRParams = {
      amount: "999",
      currency: "INR",
    };
    const i18Params = {
      amount: "10",
      currency: "USD",
    };
    const isIndian = isIndianTimeZone();
    const searchParams = new URLSearchParams(isIndian ? INRParams : i18Params);
    url.search = searchParams.toString();

    const data = await fetch(url.toString());
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
      },
      prefill: {
        email: userEmail,
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function () {
      alert("Payment failed. Please try again.");
      setIsLoading(false);
    });
  };

  return (
    <Button disabled={isLoading} onClick={makePayment}>
      Add Credits
    </Button>
  );
};

export default PaymentButton;
