import { redirect } from "next/navigation";
import CustomGenerateForm from "./CustomGenerateForm";
import { api, HydrateClient } from "@web/trpc/server";
import GensList from "./GensList";
import EditDialog from "./EditDialog";
import ModelName from "./ModelName";
import { ScrollToTop } from "@web/components/ScrollToTop";

export default async function page({
  params,
}: {
  params: { modelId: string };
}) {
  const gens = await api.gen.getMyGensByModelId({ modelId: params.modelId });
  void api.gen.getMyGensByModelId.prefetch({ modelId: params.modelId });

  if (!gens) redirect("/dashboard");

  return (
    <>
      <div className="container flex flex-col items-start justify-center gap-10 lg:flex-row">
        <aside className="max-w-72 self-center lg:self-start">
          <div className="my-10 flex items-center justify-center gap-10">
            <ModelName />
            <EditDialog />
          </div>

          <CustomGenerateForm />
        </aside>

        <main className="flex-1">
          <HydrateClient>
            <GensList />
          </HydrateClient>
        </main>
      </div>

      <ScrollToTop />
    </>
  );
}
