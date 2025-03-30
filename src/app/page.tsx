import { buttonStyles } from "@/components/Button";
import cn from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col  gap-[32px] items-center justify-center">
        <Image
          className="dark:invert"
          src="/favicon.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <Link
          href={"/companies"}
          className={cn(buttonStyles.base, buttonStyles.gradient)}
        >
          Go to Companies List
        </Link>
      </main>
    </div>
  );
}
