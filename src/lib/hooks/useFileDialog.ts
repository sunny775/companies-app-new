import { useState, useCallback, RefObject } from "react";

export interface UseFileDialogOptions {
  multiple?: boolean;
  accept?: string;
  reset?: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  initialFiles?: File[] | FileList;
}

const DEFAULT_OPTIONS: Partial<UseFileDialogOptions> = {
  multiple: true,
  accept: "*",
  reset: false,
};

const prepareInitialFiles = (
  files?: UseFileDialogOptions["initialFiles"]
): FileList | null => {
  if (!files) return null;
  if (files instanceof FileList) return files;

  const dt = new DataTransfer();
  files.forEach((file) => dt.items.add(file));
  return dt.files;
};

export function useFileDialog({
  inputRef,
  initialFiles,
  ...options
}: UseFileDialogOptions) {
  const [files, setFiles] = useState<FileList | null>(
    prepareInitialFiles(initialFiles)
  );

  const reset = useCallback(() => {
    setFiles(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [inputRef]);

  const open = useCallback(() => {
    if (inputRef.current) {
      const _options = { ...DEFAULT_OPTIONS, ...options };
      inputRef.current.multiple = _options.multiple!;
      inputRef.current.accept = _options.accept!;

      if (_options.reset) reset();

      inputRef.current.click();
    }
  }, [inputRef, options, reset]);

  const onChange = (files: FileList | null) => {
    setFiles(files);
  };

  return { files, open, reset, onChange };
}
