// app/providers.js
"use client";

import { env } from "@web/env";
import { TRPCReactProvider } from "@web/trpc/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { type ReactNode } from "react";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true, // Enable pageleave capture,
    autocapture: false,
  });
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TRPCReactProvider>
      <PostHogProvider client={posthog}>{children}</PostHogProvider>
    </TRPCReactProvider>
  );
}
