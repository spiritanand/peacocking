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
  const setValue = {
    requestId,
    configFile,
    loraFile,
  };

  const id = await db
    .insert(models)
    .values(setValue)
    .onConflictDoUpdate({ target: models.requestId, set: setValue })
    .returning({ insertedId: models.id });

  return {
    id: id?.[0]?.insertedId ?? "",
  };
}
