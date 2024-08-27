import { redirect } from "next/navigation";
import TrainingStatus from "@web/app/(authenticated)/train/[requestId]/TrainingStatus";
import { RequestStatus, RequestType } from "@web/lib/constants";
import { api } from "@web/trpc/server";
import { getServerAuthSession } from "@web/server/auth";

// const desc =

export default async function Page({
  params,
}: {
  params: { requestId: string };
}) {
  const session = await getServerAuthSession();
  const request = await api.request.getById({ requestId: params?.requestId });

  if (
    !request ||
    request.userId !== session?.user.id ||
    request.type === RequestType.GEN
  )
    redirect("/dashboard");

  if (request.status === RequestStatus.COMPLETED) redirect(`/dashboard`); // TODO: Redirect to specific model page

  return (
    <main className="container mt-10">
      <h1 className="mb-10 mt-20 w-fit scroll-m-20 border-b text-4xl font-semibold tracking-tight lg:text-5xl">
        Your request is being processed
      </h1>

      <TrainingStatus />
    </main>
  );
}
