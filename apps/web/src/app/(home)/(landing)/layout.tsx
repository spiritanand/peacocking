import "@web/styles/globals.css";
import HowItWorks from "../HowItWorks";
import FAQ from "../FAQ";
import Pricing from "../Pricing";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}

      <HowItWorks />

      <Pricing />

      <FAQ />
    </>
  );
}
