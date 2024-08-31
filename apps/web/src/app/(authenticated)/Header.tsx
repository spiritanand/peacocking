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

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/dashboard">
          <span className="sr-only">Peacocking</span>
          <img alt="" src="/logo.png" className="h-12 w-auto" />
        </Link>

        <div>
          <Link href="/dashboard">Dashboard</Link>
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

          <Button>Sign Out</Button>
        </div>
      </nav>
    </header>
  );
}
