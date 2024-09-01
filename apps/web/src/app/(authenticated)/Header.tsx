import { Avatar, AvatarFallback, AvatarImage } from "@web/components/ui/avatar";
import { Button } from "@web/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@web/components/ui/tooltip";
import { getServerAuthSession } from "@web/server/auth";
import Link from "next/link";
import PaymentButton from "../PaymentButton";
import { env } from "@web/env";

export default async function Header() {
  const session = await getServerAuthSession();

  if (!session) return null;

  return (
    <header className="p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/dashboard">
          <span className="sr-only">Peacocking</span>
          <img alt="" src="/logo.png" className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/dashboard">Dashboard</Link>

          <PaymentButton session={session} amount={999} key={env.RAZORPAY_ID} />
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src={session?.user.image ?? ""} />
                  <AvatarFallback>
                    {session?.user.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{session?.user.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <p>Credits: {session?.user.credits}</p>

          <Link href="/api/auth/signout?callbackUrl=/">
            <Button variant="secondary">Sign Out</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
