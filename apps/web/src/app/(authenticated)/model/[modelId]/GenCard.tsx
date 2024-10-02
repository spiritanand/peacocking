"use client";

import { Button } from "@web/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@web/components/ui/tooltip";
import { copyToClipboard } from "@web/lib/utils";
import { Copy, Download, Info } from "lucide-react";
import { toast } from "sonner";

interface GenCardProps {
  prompt: string;
  imageUrl: string;
}

export default function GenCard({ prompt, imageUrl }: GenCardProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "peacocked_image.png";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully");
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download image");
    }
  };

  const copyImageToClipboard = async () => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      try {
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve),
        );
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          toast.success("Image copied to clipboard");
        } else {
          throw new Error("Failed to create blob from canvas");
        }
      } catch (err) {
        console.error("Failed to copy image: ", err);
        toast.error("Failed to copy image");
        alert("Failed to copy image. See console for details.");
      }
    };
  };

  return (
    <li className="group relative mx-auto h-fit w-fit bg-primary/10">
      <img
        src={imageUrl}
        alt="Peacocked"
        className="h-72 w-full min-w-[200px] rounded-lg border border-transparent object-contain group-hover:border-primary"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 transition-opacity sm:bg-transparent sm:opacity-0 sm:group-hover:opacity-100">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="absolute right-2 top-2 h-10 w-10 rounded-full p-0"
                aria-label="Show prompt"
                onClick={() => {
                  void copyToClipboard(prompt);
                  toast.success("Prompt copied to clipboard");
                }}
              >
                <Info size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">{prompt}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          className="absolute bottom-2 right-2 h-10 w-10 rounded-full p-0"
          aria-label="Download image"
          onClick={handleDownload}
        >
          <Download size={16} />
        </Button>
        <Button
          className="absolute bottom-2 right-14 h-10 w-10 rounded-full p-0"
          aria-label="Copy image URL"
          onClick={copyImageToClipboard}
        >
          <Copy size={16} />
        </Button>
      </div>
    </li>
  );
}
