import { ReactNode } from "react";
import { X } from "lucide-react";
import cn from "@/lib/cn";
import Button from "./Button";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

const Drawer = ({ children, isOpen, onClose, className }: DrawerProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300 opacity-0 pointer-events-none",
        { "opacity-100 pointer-events-auto": isOpen },
        className
      )}
    >
      <aside
        className={`w-screen max-w-lg h-screen fixed right-0 top-0 bg-surface shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-labelledby="drawer-title"
      >
        <div className="flex justify-between items-center px-4 border-b border-gray-200 dark:border-gray-600 h-16">
          <h2 id="drawer-title" className="text-lg font-semibold">
            MENU
          </h2>
          <Button
            onClick={onClose}
            aria-label="Close drawer"
            className="size-10 p-0 rounded-full"
          >
            <X className="w-6 h-6 stroke-1" />
          </Button>
        </div>

        <div className="p-4">{children}</div>
      </aside>
    </div>
  );
};

export default Drawer;