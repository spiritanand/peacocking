import { cn } from "@web/lib/utils";
import React from "react";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-12 w-auto", className)}
      loading="lazy"
      {...props}
    />
  );
};

export default CustomImage;
