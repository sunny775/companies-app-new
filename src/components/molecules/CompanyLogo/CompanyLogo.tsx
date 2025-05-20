import Avatar from "@/components/atoms/Avatar";
import cn from "@/lib/cn";
import { Briefcase } from "lucide-react";
import { ReactNode } from "react";

interface LogoProps {
  s3Key?: string;
  className?: string;
  placeholderIcon?: ReactNode;
}

export function CompanyLogo({ s3Key, className, placeholderIcon }: LogoProps) {
  return s3Key ? (
    <Avatar
      src={`/api/s3-image/${s3Key}`}
      alt="company logo"
      width={400}
      height={400}
      className={className}
      loading="lazy"
      style={{ objectFit: "cover" }}
    />
  ) : (
    <div
      className={cn("flex-shrink-0 size-10 bg-gray-600/10 rounded-full flex items-center justify-center", className)}
    >
      {placeholderIcon ?? <Briefcase className="h-5 w-5 text-muted" />}
    </div>
  );
}
