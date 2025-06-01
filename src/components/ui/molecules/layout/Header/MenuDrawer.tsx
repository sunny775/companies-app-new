"use client";
import { logout } from "@/app/actions/auth.actions";
import Button from "@/components/ui/atoms/Button";
import { buttonStyles } from "@/components/ui/atoms/Button/button.styles";
import Drawer from "@/components/ui/atoms/Drawer";
import IconButton from "@/components/ui/atoms/IconButton";
import cn from "@/lib/utils/cn";
import { Home, LogOutIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

const MenuDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, formAction, isPending] = useActionState(logout, undefined);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const linkStyles = buttonStyles({ variant: "ghost" });

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        title="Menu Toggle Button"
        className="p-0 size-10 rounded-md border border-gray-600/15 bg-transparent"
      >
        <Menu className="stroke-1" />
      </IconButton>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
        <Drawer.Header>
          <h2 id="drawer-title" className="text-lg font-semibold">
            MENU
          </h2>
          <IconButton onClick={() => setIsOpen(false)} aria-label="Close drawer">
            <X className="w-6 h-6 stroke-1" />
          </IconButton>
        </Drawer.Header>

        <Drawer.Body>
          <div className="flex flex-col gap-4">
            <Link
              href="/companies"
              title="Home"
              className={cn(linkStyles.base(), linkStyles.info(), "flex items-center gap-3")}
            >
              <Home className="size-5" />
              <span>Companies</span>
            </Link>

            {errorMessage && <div>{errorMessage}</div>}
          </div>
        </Drawer.Body>

        <Drawer.Footer>
          <form action={formAction}>
            <Button
              disabled={isPending}
              type="submit"
              variant="ghost"
              color="error"
              className="flex items-center gap-3"
            >
              <LogOutIcon className="size-5" />
              Sign Out
            </Button>
          </form>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
