import "server-only";
import { db } from "@web/server/db";
import { models } from "@web/server/db/schema";
import { eq } from "drizzle-orm";
import { getServerAuthSession } from "@web/server/auth";

export async function insertModel({
  requestId,
  configFile,
  loraFile,
}: {
  requestId: string;
  configFile: string;
  loraFile: string;
}) {
  const session = await getServerAuthSession();

  if (!session) return null;

  const setValue = {
    requestId,
    configFile,
    loraFile,
    userId: session.user.id,
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

export async function getAllModelsByUser() {
  const session = await getServerAuthSession();

  if (!session) return null;

  return await db.query.models.findMany({
    where: eq(models.userId, session.user.id),
  });
}
