import { Avatar, AvatarFallback, AvatarImage } from "@web/components/ui/avatar";
import { Button } from "@web/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@web/components/ui/tooltip";
import { api } from "@web/trpc/server";
import Link from "next/link";
import Credits from "./Credits";
import PaymentButton from "./PaymentButton";
import { getServerAuthSession } from "@web/server/auth";
import { env } from "@web/env";

export default async function Header() {
  const session = await getServerAuthSession();
  const data = await api.user.getUser(null);
  const { user } = data;

  if (!session) return null;
  if (!user) return null;

  return (
    <header className="p-4">
      <nav className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/dashboard">
          <span className="sr-only">Peacocking</span>
          <img alt="" src="/logo.png" className="h-12 w-auto" />
        </Link>

        <Link href="/dashboard" className="hidden lg:block">
          Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src={user.image ?? ""} />
                  <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{user.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="flex items-center gap-2">
            <Credits placeholderData={data} />

            <PaymentButton session={session} key={env.RAZORPAY_ID} />
          </span>

          <Link
            href="/api/auth/signout?callbackUrl=/"
            className="hidden lg:block"
          >
            <Button variant="secondary">Sign Out</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
