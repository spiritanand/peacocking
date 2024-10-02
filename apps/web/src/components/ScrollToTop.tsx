"use client";

import { useEffect, useState } from "react";
import { Button } from "@web/components/ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // TODO: Debounce this
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full p-2 shadow-md"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="h-5 w-5" />
    </Button>
  );
}
