import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SignOutBtn from "@/components/auth/SignOutBtn";

import { ModeToggle } from "@/components/ui/ThemeToggle";
import { BadgePercent } from "lucide-react";

export default async function Navbar() {
  const { session } = await getUserAuth();
  const nameExists = !!session?.user.name && session?.user.name.length > 2;

  if (session?.user) {
    return (
      <div className="border-b mb-2 md:p-0 px-2">
        <nav className="py-2 flex items-center justify-between transition-all duration-300 max-w-6xl mx-auto">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <BadgePercent />
            <span className="hidden font-bold sm:inline-block">Crusher</span>
          </Link>
          <div className="space-x-2 flex items-center">
            <ModeToggle />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>
                      {nameExists
                        ? session.user.name
                            ?.split(" ")
                            .map((word) => word[0].toUpperCase())
                            .join("")
                        : "~"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <span className="font-semibold">
                      {nameExists ? session.user.name : "New User"}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/discounts">
                    <DropdownMenuItem className="cursor-pointer">
                      Discounts
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/my">
                    <DropdownMenuItem className="cursor-pointer">
                      My Watchlist
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/account">
                    <DropdownMenuItem className="cursor-pointer">
                      Account
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/api/auth/logout">
                    <DropdownMenuItem className="cursor-pointer">
                      Sign out
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">Sign in</Link>
            )}
          </div>
        </nav>
      </div>
    );
  } else return null;
}
