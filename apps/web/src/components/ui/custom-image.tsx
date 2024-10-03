import { cn } from "@web/lib/utils";
import React from "react";
import { Badge } from "./badge";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  isAiGenerated?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  className,
  isAiGenerated = false,
  ...props
}) => {
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={cn("h-12 w-auto", className)}
        loading="lazy"
        {...props}
      />
      {isAiGenerated && <Badge className="absolute right-2 top-2">AI</Badge>}
    </>
  );
};

export default CustomImage;
