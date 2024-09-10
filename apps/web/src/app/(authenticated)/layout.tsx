import { getServerAuthSession } from "@web/server/auth";
import { redirect } from "next/navigation";
import Header from "./Header";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (!session) redirect("/api/auth/signin?callbackUrl=/dashboard");

  return (
    <>
      <Header />
      {children}
    </>
  );
}
