import "server-only";
import { db } from "@web/server/db";
import { models } from "@web/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { getServerAuthSession } from "@web/server/auth";
import { RequestStatus } from "@web/lib/constants";

export async function updateModelWithFiles({
  requestId,
  configFile,
  loraFile,
}: {
  requestId: string;
  configFile: string;
  loraFile: string;
}) {
  const updateValue = {
    requestId,
    configFile,
    loraFile,
  };

  const id = await db
    .update(models)
    .set(updateValue)
    .where(eq(models.requestId, requestId))
    .returning({ updatedId: models.id });

  return {
    id: id[0]?.updatedId,
  };
}

export async function getAllCompletedModelsByUser() {
  const session = await getServerAuthSession();

  if (!session) return null;

  const allModels = await db.query.models.findMany({
    where: eq(models.userId, session.user.id),
    with: {
      request: true,
    },
    orderBy: desc(models.createdAt),
  });

  const completedModel = allModels.filter(
    (m) => m.request.status === RequestStatus.COMPLETED,
  );

  return completedModel;
}
