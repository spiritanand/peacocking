import "@web/styles/globals.css";
import HowItWorks from "../../../components/landing/HowItWorks";
import FAQ from "../../../components/landing/FAQ";
import Pricing from "../../../components/landing/Pricing";
import AllUseCases from "@web/components/landing/AllUseCases";
import { ScrollToTop } from "@web/components/ScrollToTop";

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

      <ScrollToTop />
    </>
  );
}
