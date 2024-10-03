import React from "react";
import { Badge } from "@web/components/ui/badge";
import { ArrowBigRight, X, Check } from "lucide-react";
import { cn } from "@web/lib/utils";

interface Before {
  src: string;
  alt: string;
}

interface ListItem {
  text: string;
}

interface BeforeVsAfterProps {
  beforePhotos: Before[];
  title: string;
  finalPhoto: {
    src: string;
    alt: string;
  };
  beforeList: ListItem[];
  afterList: ListItem[];
  isLandscape?: boolean;
}

const BeforeVsAfter: React.FC<BeforeVsAfterProps> = ({
  beforePhotos,
  title,
  finalPhoto,
  beforeList,
  afterList,
  isLandscape = false,
}) => {
  return (
    <div className="container my-20 rounded-3xl bg-gray-900 p-4 text-white md:p-8">
      <h1 className="mb-8 flex flex-col items-center justify-center gap-2 text-center text-2xl font-bold md:text-4xl">
        <span>{title}</span>
        <span>We got you.</span>
      </h1>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col gap-4 md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {beforePhotos.map((before, index) => (
              <div
                key={index}
                className={cn(
                  isLandscape ? "aspect-[16/9]" : "aspect-[3/4]",
                  "overflow-hidden rounded-lg bg-gray-700",
                )}
              >
                <img
                  src={before.src}
                  alt={before.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <ul className="space-y-2">
            {beforeList.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <X className="h-5 w-5 text-red-500" />
                <p className="text-xl">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <ArrowBigRight className="rotate-90 md:rotate-0" size={80} />

        <div className="flex flex-col gap-4 md:w-5/12">
          <div
            className={cn(
              isLandscape ? "aspect-[16/9]" : "aspect-[3/4]",
              "relative w-full overflow-hidden rounded-lg bg-gray-700",
            )}
          >
            <img
              src={finalPhoto.src}
              alt={finalPhoto.alt}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute right-2 top-2">AI</Badge>
          </div>
          <ul className="space-y-2">
            {afterList.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <p className="text-xl">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BeforeVsAfter;
