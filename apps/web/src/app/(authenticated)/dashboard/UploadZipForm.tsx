"use client";

import React, { useState, type FormEvent } from "react";
import * as fal from "@fal-ai/serverless-client";
import { Button } from "@web/components/ui/button";
import { FileUpload } from "@web/components/ui/file-upload";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

interface Image {
  url: string;
  content_type: string;
  height: number;
  width: number;
}

interface Timings {
  inference?: number;
}

interface GeneratedImageResponse {
  images: Image[];
  timings: Timings;
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
}

function UploadZipForm() {
  const [files, setFile] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFile(files);
    console.log(files);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files) {
      alert("Please select a ZIP file before submitting.");
      return;
    }

    // Here you would typically send the file to your server
    // This is a placeholder for that process
    console.log("Uploading file:", files);

    // Placeholder for API call
    try {
      const result: GeneratedImageResponse | undefined = await fal.subscribe(
        "fal-ai/flux/schnell",
        {
          input: {
            prompt: "A large blue whale swimming in space",
          },
          pollInterval: 500,
          logs: true,
          onQueueUpdate(update) {
            if (update.status === "COMPLETED") {
              console.log("Completed with result:", update);
            }
          },
        },
      );

      const image = result?.images?.[0];

      console.log({ result, image });
      console.log("File would be uploaded here");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 flex flex-col items-center gap-2 border-b pb-5"
    >
      <FileUpload
        onChange={handleFileUpload}
        multiple={false}
        label="Upload Zip of photos"
        accept=".zip"
      />

      <Button type="submit" disabled={!files.length}>
        Upload ZIP
      </Button>
    </form>
  );
}

export default UploadZipForm;
