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
import { toast } from "sonner";

function TrainingStatus({ requestId }: { requestId: string }) {
  const router = useRouter();
  const utils = api.useUtils();

  const [request] = api.request.getById.useSuspenseQuery(
    {
      requestId,
    },
    {
      refetchInterval: 20 * 1000, // 20 seconds
    },
  );

  if (!request) return null;

  const { id, status, cancelUrl, queuePosition } = request;

  if (status === RequestStatus.COMPLETED) {
    utils.model.getAllCompletedModelsByUser
      .invalidate()
      .catch(() => {
        router.push(`/dashboard`);
      })
      .finally(() => {
        toast.success("Model has been trained successfully 🎉");
        router.push(`/dashboard`);
      });

    return null;
  }

  if (status === RequestStatus.FAILED) {
    toast.error("Model training failed 😬. Please contact support.");
    router.push(`/dashboard`);

    return null;
  }

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
            status === RequestStatus.IN_QUEUE
              ? "text-orange-500"
              : "text-green-700",
          )}
        >
          {status}
        </Badge>
        {queuePosition > 0 ? (
          <p>
            Position Number{" "}
            <span className="font-extrabold">{queuePosition}</span> in the Queue
          </p>
        ) : null}
      </CardContent>
      {queuePosition > 0 ? (
        <CardFooter>
          <p>
            {
              <Button
                variant="destructive"
                onClick={() => {
                  console.log({ cancelUrl });
                }}
              >
                Cancel
              </Button>
            }
          </p>
        </CardFooter>
      ) : null}
    </Card>
  );
}

export default TrainingStatus;
