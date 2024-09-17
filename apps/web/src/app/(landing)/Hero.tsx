import { Button } from "@web/components/ui/button";
import Link from "next/link";
import CustomImage from "@web/components/ui/custom-image";
import AnimatedHero from "@web/components/ui/animated-hero";

export default function Hero() {
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
        {/* hero text */}
        <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
          <AnimatedHero />
          <p className="text-md mt-6 text-center leading-8 text-gray-600 sm:max-w-md sm:text-left sm:text-lg lg:max-w-none">
            Upload{" "}
            <span className="font-bold text-primary">just 10 photos</span> and
            get <span className="font-bold text-primary">mesmerizing</span>{" "}
            results. Never miss a beat.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 sm:justify-start">
            <Link href={"/dashboard"}>
              <Button>Click pics now</Button>
            </Link>
            <a
              href="https://youtu.be/FIEQbO8zknk"
              className="text-sm font-semibold leading-6 text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        {/* hero grid */}
        <div className="hero-photos-grid mt-14 grid grid-cols-3">
          {/* First Column */}
          <div className="relative" style={{ gridArea: "suit" }}>
            <CustomImage
              alt="man in suit"
              src="/man-in-suit.jpeg"
              className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
            />
          </div>

          <div className="relative" style={{ gridArea: "water" }}>
            <CustomImage
              alt="man water"
              src="/man-water.jpeg"
              className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
            />
          </div>

          {/* Second Column */}
          <div className="relative" style={{ gridArea: "red" }}>
            <CustomImage
              alt="red hair"
              src="/red-hair.jpeg"
              className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
            />
          </div>

          {/* Third Column */}
          <div className="relative" style={{ gridArea: "street" }}>
            <CustomImage
              alt="man street art"
              src="/man-street-art.jpeg"
              className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
            />
          </div>

          <div className="relative" style={{ gridArea: "hiker" }}>
            <CustomImage
              alt="hiker"
              src="/hike-man.jpeg"
              className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
