import CustomImage from "@web/components/ui/custom-image";
import { cn } from "@web/lib/utils";
import { Check, X } from "lucide-react";
import React from "react";

const uploadGuideImages = [
  {
    src: "/images/HIW/woman.avif",
    alt: "Woman",
    valid: true,
  },
  {
    src: "/images/HIW/man.avif",
    alt: "Man in blue shirt",
    valid: true,
  },
  {
    src: "/images/HIW/blonde.avif",
    alt: "Blonde model with short hair closeup",
    valid: true,
  },
  {
    src: "/images/HIW/family.avif",
    alt: "Family",
    valid: false,
  },
  {
    src: "/images/HIW/accessories.avif",
    alt: "Woman with sunglasses",
    valid: false,
  },
  {
    src: "/images/HIW/couple.avif",
    alt: "Couple photo",
    valid: false,
  },
];

export default function UploadGuide({
  showHeader = false,
}: {
  showHeader?: boolean;
}) {
  return (
    <>
      <div className="mb-8">
        {showHeader ? (
          <h3 className="mb-4 text-2xl font-bold">1. Upload</h3>
        ) : null}
        <p className="mb-2 text-gray-600">
          Upload a minimum of{" "}
          <span className="font-semibold text-primary">
            10 high-resolution images
          </span>
        </p>
        <p className="mb-2 text-gray-600">
          Do{" "}
          <span className="font-semibold text-primary">
            NOT include other people
          </span>
        </p>
        <p className="mb-2 text-gray-600">
          Do{" "}
          <span className="font-semibold text-primary">
            NOT include accessories
          </span>{" "}
          like sunglasses
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {uploadGuideImages.map((img, index) => (
          <div key={index} className="relative">
            <CustomImage
              src={img.src}
              alt={img.alt}
              className={cn("w-full rounded-lg object-cover shadow-md", "h-80")}
            />
            <div
              className={`absolute right-2 top-2 rounded-full p-1 ${img.valid ? "bg-green-500" : "bg-red-500"}`}
            >
              {img.valid ? (
                <Check className="h-6 w-6 text-white" />
              ) : (
                <X className="h-6 w-6 text-white" />
              )}
            </div>
          </div>
        ))}
      </div>

      <video
        playsInline
        autoPlay
        muted
        loop
        width="100%"
        className="mx-auto my-4 max-w-4xl rounded-xl shadow-2xl ring-1 ring-gray-900/10"
      >
        <source src="/videos/upload.mp4" type="video/mp4" />
      </video>
    </>
  );
}
