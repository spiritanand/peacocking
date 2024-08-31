"use client";

import { api } from "@web/trpc/react";

export default function GensList({ modelId }: { modelId: string }) {
  const [gensList] = api.gen.getMyGensByModelId.useSuspenseQuery({
    modelId,
  });

  return (
    <ul className="mt-10 flex flex-wrap gap-2">
      {gensList?.map((gen) =>
        gen.output?.images.map((image) => (
          <li key={image.url}>
            <img
              src={image.url}
              alt="Peacocked"
              className="h-72 w-auto rounded-lg border border-transparent object-cover hover:border-primary"
            />
            {gen.input?.prompt}
          </li>
        )),
      )}
    </ul>
  );
}
