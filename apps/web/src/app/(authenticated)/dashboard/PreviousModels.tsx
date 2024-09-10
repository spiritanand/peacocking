import ModelCard from "./ModelCard";
import { api } from "@web/trpc/server";

async function PreviousModels() {
  const allModels = await api.model.getAllCompletedModelsByUser();

  return (
    <>
      <h3 className="mb-3 scroll-m-20 text-2xl font-semibold tracking-tight">
        Previous photo shoots 😉
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allModels?.map((model, index) => (
          <ModelCard model={model} key={model.id} index={index} />
        ))}
      </div>
    </>
  );
}

export default PreviousModels;
