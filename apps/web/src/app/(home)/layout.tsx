import "@web/styles/globals.css";
import Header from "../../components/landing/Header";
import { Footer } from "../../components/landing/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />

      <main className="flex flex-col items-center justify-center">
        {children}
      </main>

      <Footer />
    </>
  );
}
