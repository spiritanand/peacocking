"use client";

import React, { type FormEvent, useState } from "react";
import * as fal from "@fal-ai/serverless-client";
import { Button } from "@web/components/ui/button";
import { FileUpload } from "@web/components/ui/file-upload";
import { api } from "@web/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { env } from "@web/env";
import { LoaderCircle } from "lucide-react";

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

    if (files.length < 10) {
      toast.error("Please select atleast 10 photos.");
      return;
    }

    setIsPending(true);

    toast.info("Uploading images...");

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("photos", file); // 'photos' is the key used for all images
    });

    try {
      const res = await axios.post<{ zipUrl: string }>(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/zip`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (!res.data.zipUrl) {
        setIsPending(false);
        toast.error("Failed to upload images.");
        return;
      }

      const zipUrl = res.data.zipUrl;

      createModel.mutate(
        { zipUrl },
        {
          onSuccess: ({ requestId }) => {
            toast.info("Training model...");

            router.push(`/train/${requestId}`);
          },
          onError: (error) => {
            toast.error(error.message);
          },
          onSettled: () => setIsPending(false),
        },
      );
    } catch (e) {
      console.log({ e });

      toast.error("Failed to upload images.");
      setIsPending(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-10 flex flex-col items-center gap-2 border-b pb-5"
        encType="multipart/form-data"
      >
        <FileUpload
          files={files}
          setFiles={handleFileUpload}
          label="Upload Images"
          multiple
          accept="image/*"
        />

        <Button type="submit" disabled={files.length < 10 || isPending}>
          {isPending ? (
            <>
              Uploading <LoaderCircle className="ml-2 h-5 w-5 animate-spin" />
            </>
          ) : (
            "Upload Images (requires 5 credits)"
          )}
        </Button>
      </form>
    </>
  );
}

export default UploadImageForm;
