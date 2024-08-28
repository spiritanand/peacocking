import "server-only";
import { db } from "@web/server/db";
import { models } from "@web/server/db/schema";

export async function insertModel({
  requestId,
  configFile,
  loraFile,
}: {
  requestId: string;
  configFile: string;
  loraFile: string;
}) {
  const id = await db
    .insert(models)
    .values({
      requestId,
      configFile,
      loraFile,
    })
    .onConflictDoNothing()
    .returning({ insertedId: models.id });

  return {
    id: id?.[0]?.insertedId ?? "",
  };
}
