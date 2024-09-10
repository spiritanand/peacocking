import "@web/styles/globals.css";
import { type Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Toaster } from "@web/components/ui/sonner";
import Script from "next/script";
import { Providers } from "./providers";
import dynamic from "next/dynamic";

const JS = Josefin_Sans({ subsets: ["latin"] });

const PostHogPageView = dynamic(
  () => import("../components/analytics/PageView"),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: "Peacocking",
  description: "Generate mesmerizing photos for your dating profile.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <html lang="en" className={`${JS.className}`}>
        <body>
          <Providers>
            <PostHogPageView />
            {children}
          </Providers>
          <Toaster richColors theme="light" />
        </body>
      </html>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
