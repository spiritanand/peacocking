import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import { YouAndAI } from "./YouAndAI";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <HowItWorks />
      <Pricing />

      {/* Footer */}
      <YouAndAI />
    </main>
  );
}
