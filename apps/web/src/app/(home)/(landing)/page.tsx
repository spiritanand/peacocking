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
    line1: "Professional YouTube",
    line2: "Thumbnails",
    line3: "in 10 seconds",
    subtitle: "(no design skills needed)",
  },
  description:
    'Create <span class="font-bold text-primary">eye-catching thumbnails</span> in seconds. <span class="font-bold text-primary">Boost your content\'s visibility</span> without expensive software or design skills.',
  ctaButton: {
    text: "Create Your Thumbnail",
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
  title: "AI Thumbnail Generator",
  description:
    "Generate professional, eye-catching thumbnails for your videos and social media content in seconds with our AI-powered tool.",
};

export default function LandingPage() {
  return (
    <>
      <Hero heroImages={heroImages} heroTextProps={heroTextProps} isLandscape />

      <Testimonial />

      <BeforeVsAfter
        title="Struggling to create thumbnails that get clicks?"
        beforePhotos={beforePhotos}
        beforeList={[
          { text: "Hours spent on thumbnail design" },
          { text: "Inconsistent thumbnail quality" },
          { text: "Limited design skills" },
          { text: "Low click-through rates" },
        ]}
        finalPhoto={finalPhoto}
        afterList={[
          { text: "Generate thumbnails in seconds" },
          { text: "Consistently professional results" },
          { text: "No design skills required" },
          { text: "Boost your click-through rates" },
        ]}
        isLandscape
      />
    </>
  );
}
