import IconButton from "@/components/ui/atoms/IconButton";
import { formatFileSize } from "@/lib/utils/formatFileSize";
import { X } from "lucide-react";
import { default as NextImage } from "next/image";
import { Dispatch, SetStateAction } from "react";

export interface ImagePreviewType {
  url: string;
  size: number;
  name: string;
}

interface ImagePreviewProps {
  image: ImagePreviewType | null;
  setImagePreview: Dispatch<SetStateAction<ImagePreviewType | null>>;
}

export function ImagePreview({ image, setImagePreview }: ImagePreviewProps) {
  return (
    !!image && (
      <div className="flex flex-col items-center justify-center mt-4 mb-8 ">
        <div className="relative max-w-60 bg-surface-2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
          <NextImage src={image.url} alt={image.name} width={400} height={400} className="w-full object-cover" />

          <IconButton
            type="button"
            onClick={() => setImagePreview(null)}
            variant="error"
            size="sm"
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="p-3">
          <p className="text-sm font-medium truncate">{image.name}</p>
          <p className="text-xs text-muted">{formatFileSize(image.size)}</p>
        </div>
      </div>
    )
  );
}
