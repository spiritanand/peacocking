"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@web/components/ui/card";
import { api } from "@web/trpc/react";
import { Button } from "@web/components/ui/button";
import { Badge } from "@web/components/ui/badge";
import { RequestStatus } from "@web/lib/constants";
import { cn } from "@web/lib/utils";
import { useRouter } from "next/navigation";

function TrainingStatus({ requestId }: { requestId: string }) {
  const router = useRouter();

  const [request] = api.request.getById.useSuspenseQuery({
    requestId,
  });

  if (!request) return null;

  const { id, status, statusUrl, cancelUrl, queuePosition } = request;

  const { data } = api.request.getStatusByUrl.useQuery(
    { id, statusUrl, prevStatus: status },
    {
      refetchInterval: 10 * 1000,
    },
  );

  // Update the status and queue position if data is available
  const newStatus = data?.status ?? status;
  const newQueuePosition = data?.queuePosition ?? queuePosition;

  if (newStatus === RequestStatus.COMPLETED) router.push(`/model/${requestId}`);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Request</CardTitle>
        <CardDescription># {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge
          variant="secondary"
          className={cn(
            "mb-4 p-2",
            newStatus === RequestStatus.IN_QUEUE
              ? "text-orange-500"
              : "text-green-700",
          )}
        >
          {status}
        </Badge>
        {newQueuePosition > 0 ? (
          <p>
            Position Number{" "}
            <span className="font-extrabold">{newQueuePosition}</span> in the
            Queue
          </p>
        ) : null}
      </CardContent>
      <CardFooter>
        <p>
          {newQueuePosition > 0 ? (
            <Button
              variant="destructive"
              onClick={() => {
                console.log({ cancelUrl });
              }}
            >
              Cancel
            </Button>
          ) : null}
        </p>
        <Button
          onClick={() => {
            console.log({ id });
          }}
        >
          Gen an image
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TrainingStatus;
