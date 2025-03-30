import { signOut } from "@/lib/auth";
import BrandLogo from "../BrandLogo";
import MenuDrawer from "./MenuDrawer";

export default function Header() {
  const logout = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 shadow dark:shadow-md bg-surface backdrop-blur-sm">
      <div className="relative flex h-16 items-center justify-between px-8">
        <BrandLogo />
        <MenuDrawer logout={logout} />
      </div>
    </header>
  );
}
