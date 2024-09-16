"use client";

import React, { useState, useEffect } from "react";

const options = ["dating profile", "headshots", "insta profile", "linkedin"];

const AnimatedHero = () => {
  const [currentOption, setCurrentOption] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const cycleText = () => {
      setIsFadingOut(true); // Start fade-out animation
      setTimeout(() => {
        setCurrentOption((prevOption) => (prevOption + 1) % options.length);
        setIsFadingOut(false); // Start fade-in
      }, 500); // Match fade-out duration
    };

    const intervalId = setInterval(cycleText, 3500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="text-center text-4xl font-bold leading-10 tracking-tight text-gray-900 sm:text-6xl lg:text-left">
      <span className="text-xl sm:text-2xl">Your </span>
      <span
        className={`inline-block w-[160px] whitespace-nowrap transition-opacity duration-500 ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {options[currentOption]}
      </span>
      <br />
      <span className="text-5xl text-primary sm:text-7xl lg:ml-2">
        supercharged
      </span>
    </h1>
  );
};

export default AnimatedHero;
