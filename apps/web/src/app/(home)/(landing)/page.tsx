import BeforeVsAfter from "../../../components/landing/BeforeVsAfter";
import Hero from "../../../components/landing/Hero";

const heroImages = {
  topLeft: "/outputs/thumbnails/protein.png",
  bottomLeft: "/outputs/thumbnails/screaming.jpg",
  middle: "/outputs/thumbnails/phoneWars.png",
  topRight: "/outputs/thumbnails/waddiyars.png",
  bottomRight: "/outputs/thumbnails/monk.jpg",
};
const heroTextProps = {
  title: {
    line1: "Better Thumbnails",
    line2: "=",
    line3: "More Views",
    subtitle: "(without an expensive studio)",
  },
  description:
    '<span class="font-bold text-primary">Save time and money</span>, generate <span class="font-bold text-primary">amazing thumbnails</span> for your social media content. Never need an expensive photoshoot again!',
  ctaButton: {
    text: "Generate Thumbnails",
    href: "/dashboard",
  },
};

const selfies = [
  {
    src: "selfies/dubai-man.jpg",
    alt: "Man in Dubai",
  },
  {
    src: "selfies/purple-t-man.jpg",
    alt: "Man in Purple T-shirt",
  },
  {
    src: "selfies/red-t-man.jpg",
    alt: "Man in Red T-shirt",
  },
  {
    src: "selfies/yellow-t-man.jpg",
    alt: "Man in Yellow T-shirt",
  },
];
const finalPhoto = {
  src: "beach-chill.jpg",
  alt: "AI Generated Photo",
};

export default function LandingPage() {
  return (
    <>
      <Hero heroImages={heroImages} heroTextProps={heroTextProps} isLandscape />

      <BeforeVsAfter
        selfies={selfies}
        title="Stressed about spending too much for the right thumbnail?"
        finalPhoto={finalPhoto}
      />
    </>
  );
}
