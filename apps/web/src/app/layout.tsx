import "@web/styles/globals.css";
import { type Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Toaster } from "@web/components/ui/sonner";
import Script from "next/script";
import { Providers } from "./providers";
import dynamic from "next/dynamic";
import { siteConfig } from "config/site";

const JS = Josefin_Sans({ subsets: ["latin"] });

const PostHogPageView = dynamic(
  () => import("../components/analytics/PageView"),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    card: "summary_large_image",
  },
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
