import { Button } from "@web/components/ui/button";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

export default function Hero() {
  return (
    <main>
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
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Your dating profile <br />
                  <span className="ml-2 text-5xl text-primary sm:text-7xl">
                    supercharged
                  </span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  Upload{" "}
                  <span className="font-bold text-primary">just 10 photos</span>{" "}
                  and get{" "}
                  <span className="font-bold text-primary">mesmerizing</span>{" "}
                  results. Never miss a beat.
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <BadgeCheck className="text-emerald-700" /> Certified by
                  dating experts
                </div>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link href={"/api/auth/signin?callbackUrl=/dashboard"}>
                    <Button>Get Started</Button>
                  </Link>
                  {/* <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Demo <span aria-hidden="true">→</span>
                    </a> */}
                </div>
              </div>
              <div className="mt-14 hidden justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:flex lg:pl-0">
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <div className="relative">
                    <img
                      alt="man in suit"
                      src="/man-in-suit.jpeg"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div className="relative">
                    <img
                      alt="red hair"
                      src="/red-hair.jpeg"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <img
                      alt="man water"
                      src="/man-water.jpeg"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      style={{
                        objectPosition: "73% 50%",
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                  <div className="relative">
                    <img
                      alt="man street art"
                      src="/man-street-art.jpeg"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      style={{
                        objectPosition: "200% 50%",
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <img
                      alt="hiker"
                      src="/hike-man.jpeg"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      style={{
                        objectPosition: "200% 50%",
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
