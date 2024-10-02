import CustomImage from "@web/components/ui/custom-image";

interface HeroGridProps {
  images: {
    topLeft: string;
    bottomLeft: string;
    middle: string;
    topRight: string;
    bottomRight: string;
  };
}

export function HeroGrid({ images }: HeroGridProps) {
  return (
    <div className="hero-photos-grid mt-14 grid grid-cols-3 gap-4">
      <div className="relative" style={{ gridArea: "topLeft" }}>
        <CustomImage
          alt="Top left photo"
          src={images.topLeft}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>

      <div className="relative" style={{ gridArea: "bottomLeft" }}>
        <CustomImage
          alt="Bottom left photo"
          src={images.bottomLeft}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>

      <div className="relative" style={{ gridArea: "middle" }}>
        <CustomImage
          alt="Middle photo"
          src={images.middle}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>

      <div className="relative" style={{ gridArea: "topRight" }}>
        <CustomImage
          alt="Top right photo"
          src={images.topRight}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>

      <div className="relative" style={{ gridArea: "bottomRight" }}>
        <CustomImage
          alt="Bottom right photo"
          src={images.bottomRight}
          className="h-full w-full rounded-md bg-gray-900/5 object-cover shadow-lg lg:rounded-xl"
        />
      </div>
    </div>
  );
}
