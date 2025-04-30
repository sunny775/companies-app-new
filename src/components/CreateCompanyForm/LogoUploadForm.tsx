"use client";
import Button from "@/components/atoms/Button";
import { CloudUpload } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

interface Props {
  onSubmit: (data: FileList | null) => void;
  defaultValue: FileList | null;
  children?: React.ReactNode;
}
export default function LogoUploadForm({ onSubmit, children, defaultValue }: Props) {
  const [files, setFiles] = useState<FileList | null>(defaultValue);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const open = () => {
    if (inputRef.current) {
      inputRef.current.click();
      console.log(defaultValue);
    }
  };

  const reset = () => {
    setFiles(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    console.log(files);
    console.log(event.target.value);
    if (files?.length) {
      if (files[0].size <= 2 * 1024 * 1024) {
        setFiles(files);
      } else {
        alert("File too large! Max size is 2MB.");
        reset();
      }
    }
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log(files);
    if (!files) {
      alert("No Files selected");
      return;
    }
    onSubmit(files);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-span-full">
        <label htmlFor="company-logo" className="block text-lg font-semibold uppercase my-8">
          Company Logo
        </label>
        <div
          onClick={open}
          className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-600/30 px-6 py-10"
        >
          <div className="text-center">
            <CloudUpload aria-hidden="true" className="mx-auto size-12 text-gray-300 dark:text-gray-600" />
            <div className="mt-4 text-center text-sm/6 cursor-pointer rounded-md font-semibold text-green-600 dark:text-green-500 hover:opacity-70">
              <span>{files?.[0]?.name || "Upload a file"}</span>
              <input
                ref={inputRef}
                onChange={handleFileChange}
                type="file"
                accept="image/jpeg,image/png"
                multiple={false}
                id="company-logo"
                name="company-logo"
                className="sr-only"
              />
            </div>
            <p className="text-xs/5 text-gray-600 dark:text-gray-400">(JPEG and PNG only, 2MB maximum.)</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 my-4">
        {children}
        <Button type="submit" className="flex-1/2">
          Next
        </Button>
      </div>
    </form>
  );
}
