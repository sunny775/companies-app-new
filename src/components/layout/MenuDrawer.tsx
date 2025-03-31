"use client";
import { useActionState, useState } from "react";
import Drawer from "../Drawer";
import Button, { buttonStyles } from "../Button";
import { Menu, Home, PowerCircle } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/auth.actions";
import cn from "@/lib/cn";

const MenuDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, formAction, isPending] = useActionState(
    logout,
    undefined
  );

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Button
        onClick={toggleDrawer}
        title="Menu Button"
        className="p-0 size-10"
      >
        <Menu className="stroke-1" />
      </Button>

      <Drawer isOpen={isOpen} onClose={toggleDrawer}>
        <div className="flex flex-col gap-4 p-4">
          <div
            onClick={toggleDrawer}
            className="rounded-sm bg-green-50 dark:bg-black/30 px-2 py-1.5 p-4"
          >
            <Link
              href="/companies"
              title="Home"
              className={cn(
                buttonStyles.base,
                buttonStyles.default,
                "gap-4 border-0 shadow-none hover:shadow-none"
              )}
            >
              <Home className="size-5" />
              <span>Companies</span>
            </Link>
          </div>

          <div className="rounded-sm bg-green-50 dark:bg-black/30 px-2 py-1.5 p-4 flex items-center gap-4">
            <form action={formAction}>
              <Button
                disabled={isPending}
                type="submit"
                className="gap-4 border-0 shadow-none hover:shadow-none"
              >
                <PowerCircle className="size-5" />
                <div className="hidden md:block">Sign Out</div>
              </Button>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
