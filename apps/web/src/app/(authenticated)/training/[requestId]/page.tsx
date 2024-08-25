import TrainingStatus from "@web/app/(authenticated)/training/[requestId]/TrainingStatus";

export default function Page({ params }: { params: { requestId: string } }) {
  return (
    <main className="container mt-10">
      <h1 className="mb-10 mt-20 w-fit scroll-m-20 border-b text-4xl font-semibold tracking-tight lg:text-5xl">
        Your request is being processed
      </h1>

      <TrainingStatus />
    </main>
  );
}
