"use client";

import React, { useState } from "react";
import * as fal from "@fal-ai/serverless-client";
import { Button } from "@web/components/ui/button";
import { api } from "@web/trpc/react";
import { useParams, useRouter } from "next/navigation";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@web/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@web/components/ui/select";
import { IMAGE_GENERATION_COST, ImageSize } from "@web/lib/constants";

const formSchema = z.object({
  prompt: z.string().min(5, {
    message: "Must be at least 5 characters",
  }),
  imageSize: z.nativeEnum(ImageSize),
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
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      imageSize: ImageSize.LANDSCAPE_16_9,
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
      router.push("/buy");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { prompt, imageSize } = values;

    setIsPending(true);
    await utils.user.getUser.invalidate();
    createImage.mutate({ modelId, prompt, imageSize });
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
                  <Textarea placeholder="man in a suit" {...field} />
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

          <FormField
            control={form.control}
            name="imageSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select image size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(ImageSize).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {key.replace(/_/g, " ").toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the desired size for your generated image.
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
              {isPending ? (
                <>
                  Generating{" "}
                  <LoaderCircle className="ml-2 h-5 w-5 animate-spin" />
                </>
              ) : (
                "Generate"
              )}
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              It costs{" "}
              <span className="text-primary">
                {IMAGE_GENERATION_COST} credits per image
              </span>
              .
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}

export default CustomGenerateForm;
