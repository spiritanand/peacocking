"use client";

import { type Session } from "next-auth";
import posthog from "posthog-js";
import React from "react";

export default function PHIdentify({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session }>) {
  const { user } = session;
  const { id, email, name } = user;

  posthog.identify(id, {
    email,
    name,
  });

  return <>{children}</>;
}
