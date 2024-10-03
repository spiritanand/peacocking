import { Badge } from "@web/components/ui/badge";
import { ArrowBigRight } from "lucide-react";
import React from "react";

interface Selfie {
  src: string;
  alt: string;
}

interface BeforeVsAfterProps {
  selfies: Selfie[];
  title: string;
  finalPhoto: {
    src: string;
    alt: string;
  };
}

const BeforeVsAfter: React.FC<BeforeVsAfterProps> = ({
  selfies,
  title,
  finalPhoto,
}) => {
  return (
    <div className="container my-20 rounded-3xl bg-gray-900 p-4 text-white md:p-8">
      <h1 className="mb-8 flex flex-col items-center justify-center gap-2 text-center text-2xl font-bold md:text-4xl">
        <span>{title}</span>
        <span>We got you.</span>
      </h1>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="grid h-full grid-cols-2 gap-4 md:w-1/2">
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
            src={finalPhoto.src}
            alt={finalPhoto.alt}
            className="h-full w-full object-cover"
          />
          <Badge className="absolute right-2 top-2">AI GENERATED PHOTO</Badge>
        </div>
      </div>
    </div>
  );
};

export default BeforeVsAfter;
