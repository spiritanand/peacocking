"use client";

import React, { Fragment, useState, type ChangeEvent } from "react";

interface ImageFile {
  url: string;
  file: File;
}

function UploadImageForm() {
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file: file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];

      if (newImages[index]?.url) {
        URL.revokeObjectURL(newImages[index].url);
        newImages.splice(index, 1);
      }

      return newImages;
    });
  };

  return (
    <>
      <form>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>

      {images.length > 0 && (
        <div>
          <p>Selected Images:</p>
          <ul>
            {images.map((image, index) => (
              <Fragment key={image.url}>
                <img
                  src={image.url}
                  alt=""
                  className="h-20 w-auto object-cover"
                />
                <button type="button" onClick={() => handleDeleteImage(index)}>
                  Delete
                </button>
              </Fragment>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default UploadImageForm;
