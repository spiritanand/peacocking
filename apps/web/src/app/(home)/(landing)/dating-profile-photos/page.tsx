import BeforeVsAfter from "../../../../components/landing/BeforeVsAfter";
import Hero from "../../../../components/landing/Hero";
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

export const metadata: Metadata = {
  title: "Dating Profile Photos",
};

export default function Page() {
  return (
    <>
      <Hero heroImages={heroImages} heroTextProps={heroTextProps} />

      <BeforeVsAfter
        beforePhotos={selfies}
        title="Missed out on clicking eventful photos?"
        finalPhoto={finalPhoto}
        beforeList={[
          { text: "Limited selection of photos" },
          { text: "Awkward selfies or group shots" },
          { text: "Outdated or repetitive images" },
          { text: "Lack of variety in settings" },
        ]}
        afterList={[
          { text: "Diverse, high-quality photos" },
          { text: "Professional-looking solo shots" },
          { text: "Fresh, current appearance" },
          { text: "Showcase various interests and locations" },
        ]}
      />
    </>
  );
}
