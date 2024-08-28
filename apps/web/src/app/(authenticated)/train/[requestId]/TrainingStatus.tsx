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

function TrainingStatus({ requestId }: { requestId: string }) {
  const [request] = api.request.getById.useSuspenseQuery({
    requestId,
  });

  if (!request) return null;

  const { id, status, statusUrl, cancelUrl, queuePosition } = request;

  // const { data } = api.request.getStatusByUrl.useQuery(
  // { statusUrl },
  // {
  // refetchInterval: 10 * 1000,
  // },
  // );

  // console.log({ data });

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
      <CardFooter>
        <p>
          {queuePosition > 0 ? (
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
