import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import Link from "next/link";
import { LayoutDashboard, UserCircle, Percent, ScrollText } from "lucide-react";
import { getUserAuth } from "@/lib/auth/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function Sidebar({ className }: SidebarProps) {
  const { session } = await getUserAuth();
  if (!session?.user) {
    return null;
  }
  return (
    <div className={cn("pb-12 border-r-2", className)}>
      <div className="space-y-4 py-4">
        <div className="pr-3 py-2">
          <div className="space-y-1">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard size="16" className="mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/discounts">
              <Button variant="ghost" className="w-full justify-start">
                <Percent size="16" className="mr-2" />
                Discounts
              </Button>
            </Link>
            <Link href="/my">
              <Button variant="ghost" className="w-full justify-start">
                <ScrollText size="16" className="mr-2" />
                My
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost" className="w-full justify-start">
                <UserCircle size="16" className="mr-2" />
                Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
