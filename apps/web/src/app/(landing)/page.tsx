import FAQ from "./FAQ";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import { Footer } from "./Footer";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />

      <HowItWorks />

      <Pricing />

      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}
