"use client";

import Button from "@/components/ui/atoms/Button";
import { Custom404 } from "@/components/ui/views/Custom404/Custom404";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const errorMsg = error.message?.toLowerCase() || "";

  if (errorMsg.includes("company not found") || errorMsg.includes("invalid input syntax for type uuid")) {
    return <Custom404 />;
  }

  return (
    <div className="p-4 flex flex-col gap-4 items-center justify-center min-h-screen bg-background">
      <h2 className="text-red-500 mb-4">Something went wrong!</h2>
      <Button onClick={reset} color="info">
        Try again
      </Button>
    </div>
  );
}
