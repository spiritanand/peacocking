"use client";

import React, { useState, useEffect } from "react";

const options = ["dating profile", "headshots", "insta profile", "linkedin"];

const AnimatedHero = () => {
  const [currentOption, setCurrentOption] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentOption((prevOption) => (prevOption + 1) % options.length);
        setIsVisible(true);
      }, 0.5 * 1000); // Wait for fade out before changing text
    }, 5 * 1000); // Change every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="text-center text-4xl font-bold leading-10 tracking-tight text-gray-900 sm:text-6xl lg:text-left">
      <span className="text-xl sm:text-2xl">Your </span>
      <span
        className={`inline-block transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {options[currentOption]}
      </span>
      <span className="text-5xl text-primary sm:text-7xl lg:ml-2">
        supercharged
      </span>
    </h1>
  );
};

export default AnimatedHero;
