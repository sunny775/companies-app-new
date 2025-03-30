"use client";
import { useState } from "react";
import Drawer from "../Drawer";
import Button from "../Button";
import { Menu, Home, PowerCircle } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
  ssr: false,
});

export interface MenuProps {
  logout?: () => void;
}

const MenuDrawer = ({ logout }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Button onClick={toggleDrawer} title="Menu Button" className="p-0 size-10">
        <Menu className="stroke-1" />
      </Button>

      <Drawer isOpen={isOpen} onClose={toggleDrawer}>
        <div className="p-4 rounded-sm flex flex-col gap-4 shadow dark:shadow-md dark:bg-black/10">
          <div
            onClick={toggleDrawer}
            className="rounded-sm bg-sky-50 dark:bg-black/30 px-2 py-1.5 text-sky-700 p-4"
          >
            <Link
              href="/companies"
              title="Home"
              className="flex items-center gap-4"
            >
              <Home className="size-4" />
              <span>Companies</span>
            </Link>
          </div>

          <div className="rounded-sm bg-sky-50 dark:bg-black/30 px-2 py-1.5 text-sky-700 p-4 flex  items-center gap-4">
            <ThemeToggle />
          </div>

          <div className="rounded-sm bg-sky-50 dark:bg-black/30 px-2 py-1.5 text-sky-700 p-4 flex  items-center gap-4">
            <form onSubmit={logout}>
              <button
                type="submit"
                className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              >
                <PowerCircle className="w-6" />
                <div className="hidden md:block">Sign Out</div>
              </button>
            </form>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
