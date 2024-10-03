import React from "react";
import { LoaderCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <div
      className="container relative flex flex-col items-center justify-center gap-12 py-8"
      id="how-it-works"
    >
      <h2 className="text-center text-4xl font-extrabold tracking-tight">
        How it works
      </h2>

      <h3 className="flex items-center gap-2 text-2xl font-bold">1. Upload</h3>
      <video
        playsInline
        autoPlay
        muted
        loop
        width="100%"
        className="mx-auto my-4 -mt-8 max-w-4xl rounded-xl shadow-2xl ring-1 ring-gray-900/10"
      >
        <source src="/videos/upload.mp4" type="video/mp4" />
      </video>

      <h3 className="flex items-center gap-2 text-2xl font-bold">
        2. AI Trains for 5 mins <LoaderCircle className="animate-spin" />
      </h3>

      <h3 className="text-2xl font-bold">
        3. Enter prompt to generate desired images
      </h3>
      <video
        playsInline
        autoPlay
        muted
        loop
        width="100%"
        className="mx-auto -mt-8 max-w-4xl rounded-xl shadow-2xl ring-1 ring-gray-900/10"
      >
        <source src="/videos/gen.mp4" type="video/mp4" />
      </video>

      <p className="text-center text-gray-600">
        Et Voila. It is that{" "}
        <span className="font-semibold text-primary">simple</span>.
      </p>
    </div>
  );
}
