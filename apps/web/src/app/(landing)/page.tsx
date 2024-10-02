import FAQ from "./FAQ";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import { Footer } from "./Footer";
import BeforeVsAfter from "./BeforeVsAfter";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />

      <BeforeVsAfter />

      <HowItWorks />

      <Pricing />

      <FAQ />

      <Footer />
    </main>
  );
}
