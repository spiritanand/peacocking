import React from "react";
import { Button } from "@web/components/ui/button";
import { Check, Zap, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@web/components/ui/badge";
import { cn } from "@web/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  ctaText: string;
  recommended?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  ctaText,
  recommended = false,
}) => (
  <div
    className={cn(
      `transform rounded-2xl p-8 shadow-xl`,
      recommended
        ? "border-4 border-yellow-400 bg-indigo-100"
        : "border border-gray-200 bg-white",
    )}
  >
    <div className="mb-4 flex items-center justify-between">
      <h3
        className={`text-2xl font-bold ${recommended ? "text-indigo-800" : "text-gray-800"}`}
      >
        {title}
      </h3>
      {recommended ? (
        <Badge className="flex items-center bg-yellow-400 px-2 py-1 text-xs font-semibold text-indigo-800">
          <Star className="mr-1 inline h-3 w-3" /> Recommended
        </Badge>
      ) : null}
    </div>
    <div
      className={`mb-6 text-5xl font-bold ${recommended ? "text-indigo-600" : "text-gray-700"}`}
    >
      {price}
    </div>
    <ul className="mb-8 space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check
            className={`mr-3 h-5 w-5 flex-shrink-0 ${recommended ? "text-yellow-500" : "text-green-500"}`}
          />
          <span className={recommended ? "text-indigo-800" : "text-gray-600"}>
            {feature}
          </span>
        </li>
      ))}
    </ul>
    <Link href="/buy">
      <Button
        className={`w-full py-3 text-lg ${recommended ? "bg-yellow-400 text-indigo-800 hover:bg-yellow-500" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
      >
        {ctaText}
      </Button>
    </Link>
  </div>
);

export const CreditSystem = () => (
  <div className="mx-auto mt-10 max-w-fit rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-8 text-white shadow-xl">
    <h3 className="mb-6 flex items-center text-3xl font-bold">
      <Zap className="mr-2" /> Credit System
    </h3>
    <ul className="space-y-4 text-xl">
      <li className="flex items-center gap-2">
        <span className="font-bold">3 Credits</span> <span>=</span> Train your
        model
      </li>
      <li className="flex items-center">
        <span className="mr-2 font-bold">1 Credit</span> = 4 Photos
      </li>
      <li className="flex items-center">
        <span className="mr-2 font-bold">1 Credit</span> = 1 USD
      </li>
    </ul>
    <p className="mt-6 text-lg">Top up credits anytime you need more!</p>
  </div>
);

export default function Pricing() {
  return (
    <div className="rounded-2xl bg-gray-100 py-20" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-5xl font-bold">Simple Pricing</h2>
        <p className="mb-12 text-center text-xl text-gray-600">
          Pay once, own your photos forever
        </p>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <PricingCard
            title="Starter Pack"
            price="$9.99"
            features={[
              "One-time payment, lifetime access",
              "10 credits included",
              "Train your AI model (3 credits)",
              "Generate photos (0.25 credit per photo)",
              "Own your photos forever",
              "Commercial & personal use",
            ]}
            ctaText="I want to start"
            recommended={true}
          />

          <PricingCard
            title="Custom Credits"
            price="You Decide"
            features={[
              "Same features as Starter Pack",
              "Flexible credit purchases",
              "Buy any amount you need",
              "Perfect for high-volume users",
              "Scale up or down as needed",
              "Unused credits never expire",
            ]}
            ctaText="Buy Custom Credits"
          />
        </div>

        <p className="text-center text-lg text-gray-600">
          Invoices available for easy company reimbursement
        </p>
      </div>

      <CreditSystem />
    </div>
  );
}
