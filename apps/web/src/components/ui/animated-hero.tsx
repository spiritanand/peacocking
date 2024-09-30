// "use client";

// import React, { useState, useEffect } from "react";

// const options = ["dating profile", "headshots", "insta profile", "linkedin"];

const AnimatedHero = () => {
  // const [currentOption, setCurrentOption] = useState(0);
  // const [isFadingOut, setIsFadingOut] = useState(false);

  // useEffect(() => {
  //   const cycleText = () => {
  //     setIsFadingOut(true); // Start fade-out animation
  //     setTimeout(() => {
  //       setCurrentOption((prevOption) => (prevOption + 1) % options.length);
  //       setIsFadingOut(false); // Start fade-in
  //     }, 500); // Match fade-out duration
  //   };

  //   const intervalId = setInterval(cycleText, 3500);
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <h1 className="text-center text-4xl font-bold leading-10 tracking-tight text-gray-900 sm:text-6xl lg:text-left">
      <span>Dating Profile</span>
      <span className="text-xl sm:text-2xl"> Photos</span>
      <br />
      <span className="text-5xl text-primary sm:text-7xl lg:ml-2">
        without a camera
      </span>
    </h1>
  );
};

export default AnimatedHero;
