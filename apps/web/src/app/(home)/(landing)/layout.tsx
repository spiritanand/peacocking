import "@web/styles/globals.css";
import HowItWorks from "../../../components/landing/HowItWorks";
import FAQ from "../../../components/landing/FAQ";
import Pricing from "../../../components/landing/Pricing";
import AllUseCases from "@web/components/landing/AllUseCases";
import { ScrollToTop } from "@web/components/ScrollToTop";
import Link from "next/link";
import { Button } from "@web/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}

      <HowItWorks />

      <AllUseCases />

      <Pricing />

      <FAQ />

      <Link href="/dashboard">
        <Button size="lg" className="mb-12 text-xl md:text-2xl">
          I want to click pictures now{" "}
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </Button>
      </Link>

      <ScrollToTop />
    </>
  );
}
