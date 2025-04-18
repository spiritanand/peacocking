import "@web/styles/globals.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@web/trpc/react";
import { Josefin_Sans } from "next/font/google";
import { Toaster } from "@web/components/ui/sonner";
import Script from "next/script";

const JS = Josefin_Sans({ subsets: ["latin"] });

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
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster richColors theme="light" />
        </body>
      </html>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
