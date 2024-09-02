"use client";

import React from "react";
import { ShootingStars } from "@web/components/ui/shooting-stars";
import { StarsBackground } from "@web/components/ui/stars-background";
import Link from "next/link";

export function YouAndAI() {
  return (
    <div className="relative flex h-[30rem] w-full flex-col items-center justify-around rounded-tl-md rounded-tr-md bg-neutral-900">
      <div className="flex flex-col items-center justify-center">
        <h2 className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-2 bg-gradient-to-b from-neutral-800 via-white to-white bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:flex-row md:gap-8 md:text-5xl md:leading-tight">
          <span>You</span>
          <span className="text-lg font-thin text-white">x</span>
          <span>Our AI Model</span>
        </h2>
        <h2 className="relative z-20 text-center text-2xl font-bold tracking-tight text-black md:text-4xl lg:text-7xl dark:text-white">
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-gradient-to-r from-primary to-emerald-500 bg-clip-text bg-no-repeat py-4 text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">Jaw Dropping Photos</span>
            </div>
            <div className="relative bg-gradient-to-r from-emerald-500 to-primary bg-clip-text bg-no-repeat py-4 text-transparent">
              <span className="">Jaw Dropping Photos</span>
            </div>
          </div>
        </h2>
      </div>

      <div className="flex items-center justify-center gap-32">
        <Link
          href={"/privacy-policy"}
          className="relative z-20 text-2xl text-white"
        >
          Privacy Policy
        </Link>

        <Link href={"/terms"} className="relative z-20 text-2xl text-white">
          Terms
        </Link>
      </div>

      {/* Style */}
      <ShootingStars maxDelay={4000} minDelay={2000} />
      <StarsBackground />
    </div>
  );
}
