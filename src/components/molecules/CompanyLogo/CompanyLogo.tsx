import { downloadImageFile } from "@/app/actions/files.actions";
import Avatar from "@/components/atoms/Avatar";
import cn from "@/lib/cn";
import { Briefcase } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface LogoProps {
  s3Key?: string;
  className?: string;
  placeholderIcon?: ReactNode;
}

export function CompanyLogo({ s3Key, className, placeholderIcon }: LogoProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadImage = async () => {
      if (!s3Key) return;

      try {
        const response = await downloadImageFile(s3Key);

        if (response?.error) {
          throw error;
        }

        if (response?.data) {
          setImageUrl(URL.createObjectURL(response.data));
        }
      } catch (err) {
        if (err instanceof Error) {
          return setError(err.message);
        }
      }
    };

    loadImage();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s3Key, error]);

  return imageUrl ? (
    <Avatar src={imageUrl} alt="company logo" width={400} height={400} className={className} />
  ) : (
    <div
      className={cn("flex-shrink-0 size-10 bg-gray-600/10 rounded-full flex items-center justify-center", className)}
    >
      {placeholderIcon ?? <Briefcase className="h-5 w-5 text-muted" />}
    </div>
  );
}
