"use client";

import React, { type FormEvent, useState } from "react";
import * as fal from "@fal-ai/serverless-client";
import { Button } from "@web/components/ui/button";
import { FileUpload } from "@web/components/ui/file-upload";
import { api } from "@web/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

function UploadImageForm() {
  const router = useRouter();
  const [files, setFile] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);

  const createModel = api.fal.createModel.useMutation();

  const handleFileUpload = (files: File[]) => {
    setFile(files);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    if (files.length < 10) {
      toast.error("Please select atleast 10 photos.");
      return;
    }

    // const zipUrl = await fal.storage.upload(zipFile);

    // createModel.mutate(
    //   { zipUrl },
    //   {
    //     onSuccess: ({ requestId }) => router.push(`/train/${requestId}`),
    //     onError: (error) => {
    //       toast.error(error.message);
    //     },
    //     onSettled: () => setIsPending(false),
    //   },
    // );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-10 flex flex-col items-center gap-2 border-b pb-5"
      >
        <FileUpload
          onChange={handleFileUpload}
          label="Upload Images"
          multiple
          accept="image/*"
        />

        <Button type="submit" disabled={files.length < 10 || isPending}>
          Upload Images (requires 5 credits)
        </Button>
      </form>
    </>
  );
}

export default UploadImageForm;
