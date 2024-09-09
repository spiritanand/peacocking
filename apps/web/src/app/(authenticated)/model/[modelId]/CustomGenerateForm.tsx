"use client";

import React, { useState } from "react";
import * as fal from "@fal-ai/serverless-client";
import { Button } from "@web/components/ui/button";
import { api } from "@web/trpc/react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formSchema = z.object({
  prompt: z.string().min(5, {
    message: "Must be at least 5 characters",
  }),
});

fal.config({
  proxyUrl: "/api/fal/proxy",
});

async function periodicFetch({
  endpointId,
  requestId,
  runOnSuccess,
}: {
  endpointId: string;
  requestId: string;
  runOnSuccess?: () => Promise<void>;
}) {
  async function fetchData() {
    const res = await fal.queue.status(endpointId, {
      requestId,
    });

    if (res.status === "COMPLETED") {
      await runOnSuccess?.();
      return;
    }

    setTimeout(() => void fetchData(), 3000);
  }

  await fetchData();
}

function CustomGenerateForm() {
  const params = useParams<{ modelId: string }>();
  const { modelId } = params;
  const [isPending, setIsPending] = useState(false);

  const utils = api.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const updateGen = api.gen.updateGen.useMutation();

  const createImage = api.fal.createImage.useMutation({
    onSuccess: async ({ requestId, responseUrl }) => {
      await periodicFetch({
        requestId,
        endpointId: "fal-ai/flux-lora",
        runOnSuccess: async () => {
          // Update the gen with the response
          await updateGen.mutateAsync({ requestId, responseUrl });
          // Invalidate the generated images
          await utils.gen.getMyGensByModelId.invalidate({ modelId });

          setIsPending(false);
          form.reset();
          toast.success("Image generated successfully");
        },
      });
    },
    onError: (error) => {
      toast.error(error.message);
      setIsPending(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { prompt } = values;

    setIsPending(true);
    await utils.user.getUser.invalidate();
    createImage.mutate({ modelId, prompt });
    toast.info("Generating image...");
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-screen-md space-y-8 border-b pb-8"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your thought</FormLabel>
                <FormControl>
                  <Input placeholder="hottest me" {...field} />
                </FormControl>
                <FormDescription>
                  Tip: Start with{" "}
                  <span className="font-semibold text-primary">{"man..."}</span>{" "}
                  or{" "}
                  <span className="font-semibold text-primary">
                    {"woman..."}
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-8 flex flex-col items-center">
            <Button
              type="submit"
              disabled={createImage.isPending || isPending}
              className="scale-[1.25]"
            >
              Generate
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              It costs{" "}
              <span className="text-primary">0.25 credits per image</span>.
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}

export default CustomGenerateForm;
