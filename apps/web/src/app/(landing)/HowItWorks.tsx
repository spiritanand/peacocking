import React from "react";
import { Check, X } from "lucide-react";

const imageData = [
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

export default function HowItWorks() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-8" id="how-it-works">
      <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight">
        How it works
      </h2>

      <div className="mb-8">
        <h3 className="mb-4 text-2xl font-bold">Upload guide</h3>
        <p className="mb-2 text-gray-600">
          Upload a minimum of{" "}
          <span className="font-semibold text-primary">
            12 high-resolution images
          </span>{" "}
          for the AI to train on.
        </p>
        <p className="mb-2 text-gray-600">
          Do{" "}
          <span className="font-semibold text-primary">
            not include other people
          </span>{" "}
          in the images.
        </p>
        <p className="mb-2 text-gray-600">
          Do{" "}
          <span className="font-semibold text-primary">
            not include other accessories
          </span>{" "}
          like sunglasses in the images.
        </p>
        <p className="text-gray-600">
          It is that <span className="font-semibold text-primary">simple</span>.
          Our AI does the rest.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {imageData.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img.src}
              alt={img.alt}
              className="h-80 w-full rounded-lg object-cover shadow-md"
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
    </div>
  );
}
