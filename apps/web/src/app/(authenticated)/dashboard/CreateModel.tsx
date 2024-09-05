import React from "react";
import UploadAsset from "./_uploads/UploadAsset";

const CreateModel = () => {
  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Upload a new set of photos 📸
      </h3>

      <UploadAsset />
    </div>
  );
};

export default CreateModel;
