"use client";

import { api } from "@web/trpc/react";
import { useParams } from "next/navigation";
import GenCard from "./GenCard";
import { format } from "date-fns";

export default function GensList() {
  const params = useParams<{ modelId: string }>();
  const modelId = params.modelId;

  const [gensList] = api.gen.getMyGensByModelId.useSuspenseQuery({
    modelId,
  });

  // Group gens by date
  const gensByDate = gensList?.reduce(
    (acc, gen) => {
      const date = format(new Date(gen.createdAt), "MMMM d, yyyy");
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(gen);
      return acc;
    },
    {} as Record<string, typeof gensList>,
  );

  return (
    <div className="space-y-8">
      {gensByDate &&
        Object.entries(gensByDate).map(([date, gens]) => (
          <div key={date} className="space-y-4">
            <h2 className="text-2xl font-semibold">{date}</h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {gens.map((gen) =>
                gen.output?.images.map((image) => (
                  <GenCard
                    key={image.url}
                    imageUrl={image.url}
                    featuredPhoto={gen.model.featurePhotoUrl ?? ""}
                    prompt={gen.input?.prompt?.trim() ?? ""}
                    createdAt={new Date(gen.createdAt)}
                  />
                )),
              )}
            </ul>
          </div>
        ))}
    </div>
  );
}
