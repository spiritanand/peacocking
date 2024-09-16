import React from "react";
import CustomImage from "@web/components/ui/custom-image";
import UploadGuide from "../../components/UploadGuide";

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
      <div className="hero-photos-grid mt-14 grid grid-cols-3">
        {/* First Column */}
        <div className="relative" style={{ gridArea: "suit" }}>
          <CustomImage
            alt="green-lantern"
            src="/green-lantern.jpg"
            className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
          />
        </div>

        <div className="relative" style={{ gridArea: "water" }}>
          <CustomImage
            alt="model"
            src="/model.jpg"
            className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
          />
        </div>

        {/* Second Column */}
        <div className="relative" style={{ gridArea: "red" }}>
          <CustomImage
            alt="professional"
            src="/professional.jpg"
            className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
          />
        </div>

        {/* Third Column */}
        <div className="relative" style={{ gridArea: "street" }}>
          <CustomImage
            alt="footballer"
            src="/footballer.jpg"
            className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
          />
        </div>

        <div className="relative" style={{ gridArea: "hiker" }}>
          <CustomImage
            alt="GOT"
            src="/got.jpg"
            className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
