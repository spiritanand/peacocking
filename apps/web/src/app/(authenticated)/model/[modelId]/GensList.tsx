"use client";

import { api } from "@web/trpc/react";
import { useParams } from "next/navigation";
import GenCard from "./GenCard";

export default function GensList() {
  const params = useParams<{ modelId: string }>();
  const modelId = params.modelId;

  const [gensList] = api.gen.getMyGensByModelId.useSuspenseQuery({
    modelId,
  });

  return (
    <ul className="mt-10 grid grid-cols-1 items-center justify-center gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {gensList?.map((gen) =>
        gen.output?.images.map((image) => (
          <GenCard
            key={image.url}
            prompt={gen.input?.prompt?.trim() ?? ""}
            imageUrl={image.url}
          />
        )),
      )}
    </ul>
  );
}
