import CustomImage from "@web/components/ui/custom-image";
import { cn } from "@web/lib/utils";
import { Check, X } from "lucide-react";
import React from "react";

const uploadGuideImages = [
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Woman",
    valid: true,
  },
  {
    src: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3NldXAlMjBmYWNlJTIwc2hvdHMlMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
    alt: "Man in blue shirt",
    valid: true,
  },
  {
    src: "https://images.unsplash.com/photo-1724709972210-4beb408de580?q=80&w=3287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Blonde model with short hair closeup",
    valid: true,
  },
  {
    src: "https://images.unsplash.com/photo-1478061653917-455ba7f4a541?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3NldXAlMjBmYWNlJTIwc2hvdHMlMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
    alt: "Family",
    valid: false,
  },
  {
    src: "https://images.unsplash.com/photo-1628591765015-aae219c65a82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZSUyMHNob3RzJTIwcGVvcGxlfGVufDB8fDB8fHww",
    alt: "Woman with sunglasses",
    valid: false,
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fHww",
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
    </>
  );
}
