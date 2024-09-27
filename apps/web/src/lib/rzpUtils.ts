import { CreateOrderAction } from "@web/data/actions/CreateOrderAction";
import { isIndianTimeZone } from "./utils";
import { VerifyOrderAction } from "@web/data/actions/VerifyOrderAction";
import { toast } from "sonner";

/* eslint-disable */ //TODO: Remove this line

export const makePayment = async ({
  rzpKey,
  previousBal,
  userEmail,
  usdAmount,
}: {
  rzpKey: string;
  userEmail: string;
  previousBal: number;
  usdAmount: number;
}) => {
  const { order } = await CreateOrderAction({
    totalAmount: usdAmount,
    currency: isIndianTimeZone() ? "INR" : "USD",
  });

  if (!order) return;

  const options = {
    key: rzpKey,
    name: userEmail,
    description: "Peacocking Photos Credits",
    currency: order.currency,
    amount: order.amount,
    order_id: order.id,
    handler: async function (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) {
      const { success } = await VerifyOrderAction({
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        razorpayPaymentId: response.razorpay_payment_id,
        email: userEmail,
        credits: Math.ceil(usdAmount),
        previousBal,
      });

      if (success)
        toast.success("Payment successful. Credits added to your account.");
      else toast.error("Payment failed. Please try again.");
    },
    prefill: {
      email: userEmail,
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();

  paymentObject.on("payment.failed", function () {
    toast.error("Payment failed. Please try again.");
  });
};
