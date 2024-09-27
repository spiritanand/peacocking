"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@web/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";
import { type AddCredits, AddCreditsSchema } from "@web/lib/types";
import { makePayment } from "@web/lib/rzpUtils";
import { type Session } from "next-auth";

interface CustomCreditPurchaseProps {
  onSubmit?: () => void;
  session: Session;
  rzpKey: string;
}

export function CustomCreditPurchase({
  onSubmit,
  session,
  rzpKey,
}: CustomCreditPurchaseProps) {
  const userEmail = session?.user?.email;
  const previousBal = session.user?.credits;

  const form = useForm<AddCredits>({
    resolver: zodResolver(AddCreditsSchema),
    defaultValues: {
      credits: 10,
    },
  });

  async function handleSubmit(values: AddCredits) {
    onSubmit?.();

    await makePayment({
      rzpKey,
      usdAmount: values.credits,
      userEmail: userEmail!,
      previousBal,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="credits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount of Credits</FormLabel>
              <FormControl>
                <Input placeholder="Number of Credits" {...field} />
              </FormControl>
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
  );
}
