import Hero from "./Hero";
import { YouAndAI } from "./YouAndAI";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <YouAndAI />
    </main>
  );
}
