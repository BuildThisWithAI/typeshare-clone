"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";

const navItems = [
  { name: "Explore", path: "/" },
  { name: "My Writings", path: "/writings" },
];

export function SiteHeader() {
  const path = usePathname();

  return (
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex gap-2 items-center mr-8">
              <span className="font-bold text-xl">/T</span>
              <span className="text-muted-foreground">/</span>
              <UserButton />
            </div>
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${
                    path === item.path
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  } font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {/* <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 pr-2 py-1 rounded-full text-sm"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-gray-400" />
            </Button> */}
            <Link href="/new">
              <Button
                className="rounded-lg bg-[#54A056] text-white hover:bg-green-700 font-semibold"
                size="sm"
              >
                <PlusCircleIcon className="inline-flex mr-2 size-4" />
                New Piece
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
