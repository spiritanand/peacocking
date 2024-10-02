import { HeroGrid } from "@web/components/landing/HeroGrid";
import { HeroText } from "@web/components/landing/HeroText";
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
    <div className="relative isolate">
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
      >
        <div
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
          className="aspect-[801/1036] w-[50.0625rem] bg-primary opacity-40"
        />
      </div>
      <div className="container flex flex-col items-center justify-center pb-20 pt-32 lg:flex-row lg:py-32">
        <HeroText {...heroTextProps} />
        <HeroGrid images={heroImages} />
      </div>
    </div>
  );
}
