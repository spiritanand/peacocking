import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@web/components/ui/tabs";
import React from "react";
import UploadImageForm from "./UploadImageForm";
import UploadZipForm from "./UploadZipForm";

export default function UploadAsset() {
  return (
    <Tabs
      defaultValue="images"
      className="mx-auto max-w-[95vw] items-center sm:max-w-screen-lg"
    >
      <TabsList className="flex items-center">
        <TabsTrigger
          value="images"
          className="text-lg data-[state=active]:text-primary data-[state=active]:shadow-primary"
        >
          Images
        </TabsTrigger>
        <TabsTrigger
          value="zip"
          className="text-lg data-[state=active]:text-primary data-[state=active]:shadow-primary"
        >
          Zip
        </TabsTrigger>
      </TabsList>
      <TabsContent value="images">
        <UploadImageForm />
      </TabsContent>
      <TabsContent value="zip">
        <UploadZipForm />
      </TabsContent>
    </Tabs>
  );
}
