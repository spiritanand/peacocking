import React from "react";
import UploadGuide from "../../components/UploadGuide";
import { HeroGrid } from "@web/components/landing/HeroGrid";

export default function HowItWorks() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-8" id="how-it-works">
      <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight">
        How it works
      </h2>
      <UploadGuide showHeader />
      <h3 className="my-8 text-2xl font-bold">2. AI Trains for 5 mins</h3>
      <h3 className="my-8 text-2xl font-bold">
        3. Enter prompt to generate desired image
      </h3>
      <p className="text-gray-600">
        Et Voila. It is that{" "}
        <span className="font-semibold text-primary">simple</span>.
      </p>
      <div className="my-14">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="text-primary">Jaw dropping</span> for all cases
        </h1>
        <p className="mb-2 text-gray-600">
          Get <span className="font-semibold text-primary">Professional</span>{" "}
          headshots
        </p>
        <p className="mb-2 text-gray-600">
          Become a <span className="font-semibold text-primary">superhero</span>{" "}
        </p>
        <p className="mb-2 text-gray-600">
          Dress up as favorite{" "}
          <span className="font-semibold text-primary">TV show characters</span>
        </p>
        <p className="mb-2 text-gray-600">
          Become a{" "}
          <span className="font-semibold text-primary">sports superstar</span>
        </p>
      </div>

      <HeroGrid
        images={{
          topLeft: "/green-lantern.jpg",
          bottomLeft: "/model.jpg",
          middle: "/professional.jpg",
          topRight: "/footballer.jpg",
          bottomRight: "/got.jpg",
        }}
      />
    </div>
  );
}
