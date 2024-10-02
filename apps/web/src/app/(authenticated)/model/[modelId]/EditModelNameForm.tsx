"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@web/components/ui/button";
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
import { api } from "@web/trpc/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function EditModelNameForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const params = useParams<{ modelId: string }>();
  const modelId = params.modelId;

  const trpcUtils = api.useUtils();

  const [gensList] = api.gen.getMyGensByModelId.useSuspenseQuery({
    modelId,
  });
  const defaultName = gensList[0]?.model.name ?? "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName,
    },
  });

  const { mutate, isPending } = api.model.updateModelName.useMutation({
    onSuccess: ({ message }) => {
      toast.success(message);
      closeDialog();
    },
    onError: () => {
      toast.error("Failed to update model name");
    },
    onSettled: () => {
      void trpcUtils.gen.getMyGensByModelId.invalidate({
        modelId,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ id: modelId, name: values.name });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                You can use this model name to identify your model.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
