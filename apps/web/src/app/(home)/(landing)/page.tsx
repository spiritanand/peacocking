import BeforeVsAfter from "../BeforeVsAfter";
import Hero from "../Hero";

const heroImages = {
  topLeft: "/man-in-suit.jpeg",
  bottomLeft: "/man-water.jpeg",
  middle: "/red-hair.jpeg",
  topRight: "/man-street-art.jpeg",
  bottomRight: "/hike-man.jpeg",
};

const heroTextProps = {
  title: {
    line1: "Better Thumbnails",
    line2: "=",
    line3: "More Views",
    subtitle: "(without an expensive studio)",
  },
  description:
    'Upload <span class="font-bold text-primary">just 10 photos</span> and click <span class="font-bold text-primary">AI Photos</span>. Never need a photographer again.',
  ctaButton: {
    text: "Generate Thumbnails",
    href: "/dashboard",
  },
  demoLink: {
    text: "Demo",
    href: "https://youtu.be/FIEQbO8zknk",
  },
};

export default function LandingPage() {
  return (
    <>
      <Hero heroImages={heroImages} heroTextProps={heroTextProps} />

      <BeforeVsAfter />
    </>
  );
}
