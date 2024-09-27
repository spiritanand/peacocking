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
import { Input } from "@web/components/ui/input";
import { type Session } from "next-auth";
import PaymentButton from "./PaymentButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { type AddCredits, AddCreditsSchema } from "@web/lib/types";
import { makePayment } from "@web/lib/rzpUtils";
import { useState } from "react";

export function PaymentModal({
  session,
  rzpKey,
}: {
  session: Session;
  rzpKey: string;
}) {
  const userEmail = session?.user?.email;
  const previousBal = session.user?.credits;
  const [open, setOpen] = useState(false);

  const form = useForm<AddCredits>({
    resolver: zodResolver(AddCreditsSchema),
    defaultValues: {
      credits: 10,
    },
  });

  async function onSubmit(values: AddCredits) {
    setOpen(false);

    await makePayment({
      rzpKey,
      usdAmount: values.credits,
      userEmail: userEmail!,
      previousBal,
    });
  }

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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="credits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount of Credits</FormLabel>
                    <FormControl>
                      <Input placeholder="Number of Credits" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full"
              >
                Buy Credits
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
