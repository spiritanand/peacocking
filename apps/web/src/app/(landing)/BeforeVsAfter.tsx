import { Badge } from "@web/components/ui/badge";
import { ArrowBigRight } from "lucide-react";
import React from "react";

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

const BeforeVsAfter = () => {
  return (
    <div className="container rounded-3xl bg-gray-900 p-4 text-white md:p-8">
      <h1 className="mb-8 text-center text-2xl font-bold md:text-4xl">
        Selfies to AI photo: It is easy
      </h1>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="grid w-full grid-cols-2 gap-4 md:w-1/2">
          {selfies.map((selfie, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg bg-gray-700"
            >
              <img
                src={selfie.src}
                alt={selfie.alt}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <ArrowBigRight className="rotate-90 md:rotate-0" size={150} />

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-700 md:w-5/12">
          <img
            src="beach-chill.jpg"
            alt="AI Generated Photo"
            className="h-full w-full object-cover"
          />
          <Badge className="absolute right-2 top-2">AI GENERATED PHOTO</Badge>
        </div>
      </div>
    </div>
  );
};

export default BeforeVsAfter;
