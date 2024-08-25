"use client";

import React, { useState, type ChangeEvent, type FormEvent } from "react";
import * as fal from "@fal-ai/serverless-client";
import { Button } from "@web/components/ui/button";

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
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/zip") {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert("Please select a ZIP file.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a ZIP file before submitting.");
      return;
    }

    // Here you would typically send the file to your server
    // This is a placeholder for that process
    console.log("Uploading file:", file.name);

    // Example of creating FormData for upload
    const formData = new FormData();
    formData.append("zipFile", file);

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="zipFile">Select ZIP file:</label>
        <input
          type="file"
          id="zipFile"
          accept=".zip"
          onChange={handleFileChange}
        />
      </div>
      <Button type="submit" disabled={!file}>
        Upload ZIP
      </Button>
    </form>
  );
}

export default UploadZipForm;
