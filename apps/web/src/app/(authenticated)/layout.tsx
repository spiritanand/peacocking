import { getServerAuthSession } from "@web/server/auth";
import { redirect } from "next/navigation";
import Header from "./Header";
import PHIdentify from "./PHIdentify";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  // TODO: Redirect to signin page if user is not authenticated (though this cannot be treated as a middleware)
  if (!session) redirect("/api/auth/signin?callbackUrl=/buy");

  return (
    <>
      <PHIdentify session={session}>
        <Header />
        {children}
      </PHIdentify>
    </>
  );
}
