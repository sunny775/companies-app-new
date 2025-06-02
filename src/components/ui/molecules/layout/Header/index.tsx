import BrandLogo from "@/components/ui/molecules/Logo";
import MenuDrawer from "./MenuDrawer";

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 shadow dark:shadow-md bg-surface/20 backdrop-blur-sm border-b border-border">
      <div className="relative flex items-center justify-between h-16 px-8">
        <BrandLogo />
        <MenuDrawer />
      </div>
    </header>
  );
}
