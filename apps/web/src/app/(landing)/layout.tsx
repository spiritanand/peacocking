import "@web/styles/globals.css";
import Header from "./Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
