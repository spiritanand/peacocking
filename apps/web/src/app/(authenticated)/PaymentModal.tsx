"use client";

import { Button } from "@web/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@web/components/ui/dialog";
import { type Session } from "next-auth";
import PaymentButton from "./PaymentButton";
import { useState } from "react";
import { CustomCreditPurchase } from "./CustomCreditPurchase";

export function PaymentModal({
  session,
  rzpKey,
}: {
  session: Session;
  rzpKey: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">Buy Credits</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Credits</DialogTitle>
          <DialogDescription>
            Get the starter pack or add how much ever you like
          </DialogDescription>
        </DialogHeader>
        <div className="grid py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <PaymentButton
              closeModal={() => setOpen(false)}
              usdAmount={9.99}
              session={session}
              rzpKey={rzpKey}
              ctaText="Get Starter Pack"
            />

            <p>10 Credits for $9.99</p>
          </div>

          <p className="mt-4 text-center text-gray-500">OR</p>

          <CustomCreditPurchase
            onSubmit={() => setOpen(false)}
            session={session}
            rzpKey={rzpKey}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
