"use client";

import { api } from "@web/trpc/react";
import { useParams } from "next/navigation";

export default function ModelName() {
  const params = useParams<{ modelId: string }>();
  const modelId = params.modelId;

  const [gensList] = api.gen.getMyGensByModelId.useSuspenseQuery({
    modelId,
  });
  const modelName = gensList[0]?.model.name ?? "";

  return (
    <h1 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight lg:text-5xl">
      {modelName ? (
        <span className="font-black text-primary">{modelName}</span>
      ) : (
        <>
          Your <span className="font-black text-primary">model</span>
        </>
      )}
    </h1>
  );
}
