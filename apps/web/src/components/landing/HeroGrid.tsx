import CustomImage from "@web/components/ui/custom-image";
import { cn } from "@web/lib/utils";

interface HeroGridProps {
  images: {
    topLeft: string;
    bottomLeft: string;
    middle: string;
    topRight: string;
    bottomRight: string;
  };
  isLandscape?: boolean;
}

export function HeroGrid({ images, isLandscape = false }: HeroGridProps) {
  return (
    <div
      className={cn(
        isLandscape ? "landscape" : "portrait",
        "hero-photos-grid mt-14 grid gap-4",
      )}
    >
      <div className="relative" style={{ gridArea: "topLeft" }}>
        <CustomImage
          isAiGenerated
          alt="Top left photo"
          src={images.topLeft}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>

      <div className="relative" style={{ gridArea: "bottomLeft" }}>
        <CustomImage
          isAiGenerated
          alt="Bottom left photo"
          src={images.bottomLeft}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>

      <div className="relative" style={{ gridArea: "middle" }}>
        <CustomImage
          isAiGenerated
          alt="Middle photo"
          src={images.middle}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>

      <div className="relative" style={{ gridArea: "topRight" }}>
        <CustomImage
          isAiGenerated
          alt="Top right photo"
          src={images.topRight}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>

      <div className="relative" style={{ gridArea: "bottomRight" }}>
        <CustomImage
          isAiGenerated
          alt="Bottom right photo"
          src={images.bottomRight}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>
    </div>
  );
}
