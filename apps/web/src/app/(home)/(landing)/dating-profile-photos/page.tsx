import BeforeVsAfter from "../../BeforeVsAfter";
import Hero from "../../Hero";
import { type Metadata } from "next";

const heroImages = {
  topLeft: "/man-in-suit.jpeg",
  bottomLeft: "/man-water.jpeg",
  middle: "/red-hair.jpeg",
  topRight: "/man-street-art.jpeg",
  bottomRight: "/hike-man.jpeg",
};

const heroTextProps = {
  title: {
    line1: "Better Photos",
    line2: "=",
    line3: "More Dates",
    subtitle: "(without an expensive photoshoot)",
  },
  description:
    'Upload <span class="font-bold text-primary">just 10 photos</span> and click <span class="font-bold text-primary">AI Photos</span>. Never need a photographer again.',
  ctaButton: {
    text: "Click pics now",
    href: "/dashboard",
  },
  demoLink: {
    text: "Demo",
    href: "https://youtu.be/FIEQbO8zknk",
  },
};

export const metadata: Metadata = {
  title: "Dating Profile Photos",
};

export default function Page() {
  return (
    <>
      <Hero heroImages={heroImages} heroTextProps={heroTextProps} />

      <BeforeVsAfter />
    </>
  );
}
