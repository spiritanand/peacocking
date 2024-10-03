import Testimonial from "@web/components/landing/Testimonial";
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

const beforePhotos = [
  {
    src: "bad/thumbnails/overload.png",
    alt: "Information Overload",
  },
  {
    src: "bad/thumbnails/gamer.webp",
    alt: "Gamer",
  },
  {
    src: "bad/thumbnails/awkward.png",
    alt: "Awkward",
  },
  {
    src: "bad/thumbnails/cli.jpg",
    alt: "CLI App",
  },
];
const finalPhoto = {
  src: "outputs/thumbnails/adventure.jpg",
  alt: "Adventure of a Lifetime",
};

export const metadata = {
  title: "Generate Thumbnails",
  description: "Generate thumbnails for your social media content",
};

export default function LandingPage() {
  return (
    <>
      <Hero heroImages={heroImages} heroTextProps={heroTextProps} isLandscape />

      <Testimonial />

      <BeforeVsAfter
        title="Stressed about spending too much for the right thumbnail?"
        beforePhotos={beforePhotos}
        beforeList={[
          { text: "Time-consuming design process" },
          { text: "Inconsistent quality" },
          { text: "Limited creative ideas" },
          { text: "Difficulty standing out" },
        ]}
        finalPhoto={finalPhoto}
        afterList={[
          { text: "Generation in under 10 seconds" },
          { text: "Consistently eye-catching results" },
          { text: "Endless creative possibilities" },
          { text: "Guaranteed to grab attention" },
        ]}
        isLandscape
      />
    </>
  );
}
