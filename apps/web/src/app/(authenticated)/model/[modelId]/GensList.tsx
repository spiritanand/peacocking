"use client";

import { Button } from "@web/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@web/components/ui/tooltip";
import { copyToClipboard } from "@web/lib/utils";
import { api } from "@web/trpc/react";
import { Info } from "lucide-react";
import { toast } from "sonner";

export default function GensList({ modelId }: { modelId: string }) {
  const [gensList] = api.gen.getMyGensByModelId.useSuspenseQuery({
    modelId,
  });

  return (
    <ul className="mt-10 flex flex-wrap gap-2">
      {gensList?.map((gen) =>
        gen.output?.images.map((image) => (
          <li key={image.url} className="relative">
            <img
              src={image.url}
              alt="Peacocked"
              className="h-72 w-auto rounded-lg border border-transparent object-cover hover:border-primary"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-opacity-50 p-0 hover:bg-opacity-75"
                    aria-label="Show prompt"
                    onClick={() => {
                      void copyToClipboard(gen.input?.prompt);
                      toast.success("Prompt copied to clipboard");
                    }}
                  >
                    <Info size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{gen.input?.prompt}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        )),
      )}
    </ul>
  );
}
