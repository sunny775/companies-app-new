import { downloadImageFile } from "@/app/actions/files.actions";
import { Briefcase } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoProps {
  s3Key?: string;
}

export function CompanyLogo({ s3Key }: LogoProps) {
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

        setImageUrl(response?.dataUrl);
      } catch (err) {
        if (err instanceof Error) {
          return setError(err.message);
        }
      }
    };

    loadImage();
  }, [s3Key, error, imageUrl]);

  return (
    <div className="flex-shrink-0 h-10 w-10 bg-gray-600/10 rounded-full flex items-center justify-center">
      {imageUrl ? (
        <Image src={imageUrl} alt="company logo" width={400} height={400} />
      ) : (
        <Briefcase className="h-5 w-5 text-muted" />
      )}
    </div>
  );
}
