import React from "react";
import { useTheme } from "next-themes";

import Button from "./Button";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className="h-0 p-0 px-0 py-0"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="w-6 h-6 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-6 h-6 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
