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
  title: "Get Dates and Jobs | Peacocking Photos",
  description: "Get more dates and jobs with your generated photographs.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://peacocking.pro"),
  openGraph: {
    title: "Get Dates and Jobs | Peacocking Photos",
    description: "Get more dates and jobs with your generated photographs.",
    url: "https://peacocking.pro",
    type: "website",
    images: [
      {
        url: "https://peacocking.pro/images/og-wide.png",
        alt: "Generate your Photos | Peacocking",
      },
    ],
  },
  twitter: {
    title: "Get Dates and Jobs | Peacocking Photos",
    description: "Get more dates and jobs with your generated photographs.",
    images: [
      {
        url: "https://peacocking.pro/images/og-wide.png",
        alt: "Generate your Photos | Peacocking",
      },
    ],
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
