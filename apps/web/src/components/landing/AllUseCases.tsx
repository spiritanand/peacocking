import React from "react";
import { HeroGrid } from "./HeroGrid";
import { Check } from "lucide-react";

interface UseCase {
  text: string;
  highlight: string;
}
const useCases: UseCase[] = [
  { text: "Social Media", highlight: "Thumbnails" },
  { text: "Get", highlight: "Professional headshots" },
  { text: "Become a", highlight: "Superhero" },
  { text: "Dress up as your favorite", highlight: "TV Show Character" },
  { text: "Become a", highlight: "Sports Superstar" },
  { text: "Create stunning", highlight: "Dating Profile Pictures" },
];

function AllUseCases() {
  return (
    <>
      <div className="container my-20 text-center">
        <h2 className="mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="text-primary">Jaw dropping</span> for all cases
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="flex items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <Check className="mr-3 h-6 w-6 flex-shrink-0 text-green-500" />
              <p className="text-left text-lg text-gray-700">
                {useCase.text}{" "}
                <span className="font-semibold text-primary">
                  {useCase.highlight}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mb-28">
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
    </>
  );
}

export default AllUseCases;
