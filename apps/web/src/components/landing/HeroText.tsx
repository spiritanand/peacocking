import { Button } from "@web/components/ui/button";
import Link from "next/link";

interface HeroTextProps {
  title: {
    line1: string;
    line2: string;
    line3: string;
    subtitle: string;
  };
  description: string;
  ctaButton: {
    text: string;
    href: string;
  };
  demoLink?: {
    text: string;
    href: string;
  };
}

export function HeroText({
  title,
  description,
  ctaButton,
  demoLink,
}: HeroTextProps) {
  return (
    <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
      <h1 className="flex flex-col items-center text-center text-4xl font-bold leading-10 tracking-tight text-gray-900 sm:text-6xl">
        <span>{title.line1}</span>
        <span className="text-primary">{title.line2}</span>
        <span>{title.line3}</span>
        <span className="text-2xl text-primary sm:text-3xl lg:ml-2">
          {title.subtitle}
        </span>
      </h1>

      <p
        className="text-md mt-6 text-center leading-8 text-gray-600 sm:max-w-md sm:text-left sm:text-lg lg:max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="mt-10 flex items-center justify-center gap-x-6 sm:justify-start">
        <Link
          href={ctaButton.href}
          className="flex flex-col items-center gap-1"
        >
          <Button className="text-xl" size="lg">
            {ctaButton.text}
          </Button>

          <p className="text-sm leading-6 text-gray-500">
            No Design Skills Required
          </p>
        </Link>
        {demoLink && (
          <a
            href={demoLink.href}
            className="text-sm font-semibold leading-6 text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            {demoLink.text} <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
