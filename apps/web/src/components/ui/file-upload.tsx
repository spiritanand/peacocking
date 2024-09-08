import { cn } from "@web/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import { CircleX } from "lucide-react";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  label = "Upload file",
  multiple = true,
  onChange,
  accept = "*",
}: {
  label?: string;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  accept?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileDelete(index: number) {
    const newFiles = [...files];
    newFiles.splice(index, 1);

    setFiles(newFiles);
    onChange?.(newFiles);
  }

  const handleFileChange = (newFiles: File[]) => {
    if (!newFiles.length) return;

    // Split the 'accepts' string into an array of accepted MIME types/extensions
    const acceptedTypes = accept?.split(",").map((type) => type.trim()) || [];

    // Filter the newFiles array to only include files that match the accepted types
    const filteredFiles =
      accept === "*"
        ? newFiles
        : newFiles.filter((file) => {
            // Check against both MIME type and file extension
            return acceptedTypes.some((type) => {
              if (type.startsWith(".")) {
                // If the accept type is a file extension (e.g., '.jpg'), check the file name
                return file.name.endsWith(type);
              } else {
                // Otherwise, assume it's a MIME type (e.g., 'image/jpeg') and check the file type
                return (
                  file.type === type ||
                  file.type.startsWith(type.split("/")[0] + "/")
                );
              }
            });
          });

    setFiles((prevFiles) => {
      if (!multiple) return [...filteredFiles]; // only keep the last file, if multiple is false

      return [...prevFiles, ...filteredFiles]; // keep all files
    });

    onChange?.(filteredFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => {
            handleFileChange(Array.from(e.target.files ?? []));
          }}
          className="hidden"
          multiple={multiple}
          accept={accept}
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
            {label}
          </p>
          <p className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400">
            Drag and drop your {multiple ? "files" : "file"} here or click to
            upload
          </p>
          <div className="relative mx-auto mt-10 w-full max-w-screen-md">
            {files.length > 0 && (
              <motion.div
                className={cn(
                  files.length > 1 &&
                    "grid grid-cols-2 gap-4 md:grid-cols-3 md:grid-cols-4",
                  "",
                )}
              >
                {files.map((file, idx) => (
                  <motion.div
                    key={"file" + idx}
                    layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                    className={cn(
                      "relative z-40 flex flex-col items-center justify-center overflow-hidden rounded-md bg-white p-4 dark:bg-neutral-900",
                      "shadow-sm",
                    )}
                  >
                    {/* Cross Button to delete the image */}
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileDelete(idx);
                      }}
                      className="absolute right-0 top-0 z-50 h-8 w-8 rounded-full bg-gray-400 p-0 text-gray-700"
                    >
                      <CircleX />
                    </Button>

                    {/* Preview the image if the file is an image */}
                    {file.type.startsWith("image/") && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-32 w-full rounded-md object-cover"
                      />
                    )}

                    <div className="mt-2 flex w-full items-center justify-between gap-4">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="truncate text-base text-neutral-700 dark:text-neutral-300"
                      >
                        {file.name}
                      </motion.p>
                    </div>

                    <div className="flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-md bg-gray-100 dark:bg-neutral-800"
                      >
                        {file.type}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="w-fit flex-shrink-0 rounded-lg text-sm text-neutral-600 shadow-input dark:bg-neutral-800 dark:text-white"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white group-hover/file:shadow-2xl dark:bg-neutral-900",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-neutral-600"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-primary/40 bg-transparent opacity-0"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex flex-shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-gray-100 dark:bg-neutral-900">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`flex h-10 w-10 flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:bg-neutral-950 dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        }),
      )}
    </div>
  );
}
