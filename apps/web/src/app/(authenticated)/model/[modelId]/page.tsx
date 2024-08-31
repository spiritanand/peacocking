import { getMyGensByModelId } from "@web/data/db";
import { redirect } from "next/navigation";
import CustomGenerateForm from "./CustomGenerateForm";

export default async function page({
  params,
}: {
  params: { modelId: string };
}) {
  const gens = await getMyGensByModelId(params.modelId);

  if (!gens) redirect("/dashboard");

  return (
    <main className="container my-10">
      <h1 className="mx-auto my-10 w-fit scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight lg:text-5xl">
        Your <span className="font-black text-primary">model</span>
      </h1>

      <CustomGenerateForm />
    </main>
  );
}
