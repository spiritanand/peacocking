"use client";

import React, { type FormEvent, useState } from "react";
import * as fal from "@fal-ai/serverless-client";
import { Button } from "@web/components/ui/button";
import { api } from "@web/trpc/react";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  prompt: z
    .string()
    .min(5, {
      message: "Must be at least 5 characters",
    })
    .max(50, {
      message: "Must be at most 50 characters",
    }),
});

fal.config({
  proxyUrl: "/api/fal/proxy",
});

function UploadZipForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                  This is what we will use to generate your photo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <span className="mt-8 flex flex-col items-center">
            <Button type="submit" disabled={isPending} className="scale-[1.25]">
              Generate More
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Make sure you have at least{" "}
              <span className="text-primary">1 credit</span> to generate photos.
            </p>
          </span>
        </form>
      </Form>
    </>
  );
}

export default UploadZipForm;
