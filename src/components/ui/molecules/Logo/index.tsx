import { globe } from "@/assets";
import cn from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <div className={cn("inline-flex gap-1.5 justify-center items-center text-sm", className)}>
        <span className="font-medium uppercase">Companies App</span>

        <span aria-hidden="true" role="img">
          <Image src={globe} width={16} height={16} className="w-6 h-6 dark:invert" alt="App Logo" />
        </span>
      </div>
    </Link>
  );
}
