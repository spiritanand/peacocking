import { redirect } from "next/navigation";
import CustomGenerateForm from "./CustomGenerateForm";
import { api, HydrateClient } from "@web/trpc/server";
import GensList from "./GensList";

export default async function page({
  params,
}: {
  params: { modelId: string };
}) {
  const gens = await api.gen.getMyGensByModelId({ modelId: params.modelId });
  void api.gen.getMyGensByModelId.prefetch({ modelId: params.modelId });

  if (!gens) redirect("/dashboard");

  return (
    <main className="container my-10">
      <h1 className="mx-auto my-10 w-fit scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight lg:text-5xl">
        Your <span className="font-black text-primary">model</span>
      </h1>

      <CustomGenerateForm />

      <HydrateClient>
        <GensList modelId={params.modelId} />
      </HydrateClient>
    </main>
  );
}
