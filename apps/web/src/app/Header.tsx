import { Button } from "@web/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@web/components/ui/dropdown-menu";
import Link from "next/link";

export const navigation = [
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Peacocking</span>
            <img alt="" src="/logo.png" className="h-12 w-auto" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <Link href={"/api/auth/signin"} className="hidden lg:block">
          <Button>Sign In</Button>
        </Link>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="lg:hidden">Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <DropdownMenuItem>{item.name}</DropdownMenuItem>
              </a>
            ))}
            <Link href={"/api/auth/signin"}>
              <Button>Sign In</Button>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
