"use client";

import { type RouterOutput } from "@web/server/api/root";
import { api } from "@web/trpc/react";

export default function Credits({
  placeholderData,
}: {
  placeholderData: RouterOutput["user"]["getUser"];
}) {
  const data = api.user.getUser.useQuery(null, {
    placeholderData,
  });
  const user = data.data?.user;

  return (
    <>
      <span className="hidden lg:block">Credits: </span>
      {user?.credits}{" "}
    </>
  );
}
