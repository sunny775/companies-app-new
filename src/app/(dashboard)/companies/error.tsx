"use client";

import Button from "@/components/ui/atoms/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const errorMsg = error.message;

  return (
    <div className="p-4 flex flex-col gap-4 items-center justify-center min-h-screen bg-background">
      <h2 className="text-red-500 mb-4">{errorMsg || "Something went wrong!"}</h2>
      <Button onClick={reset} color="info">
        Try again
      </Button>
    </div>
  );
}
