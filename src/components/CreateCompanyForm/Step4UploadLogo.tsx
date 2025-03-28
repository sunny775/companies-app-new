"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { CloudUpload } from "lucide-react";


interface Props {
  onBack(): void;
  onNext: (data: FileList | null) => void;
  defaultValue: FileList | null;
}
export default function Step4UploadLogo({
  onNext,
  onBack,
  defaultValue,
}: Props) {
  const [files, setFiles] = useState<FileList | null>(defaultValue);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const open = () => {
    if (inputRef.current) {
      inputRef.current.click();
      console.log(defaultValue)
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
    console.log(files)
    console.log(event.target.value)
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
    if (!files) return;
    onNext(files);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-span-full">
        <label
          htmlFor="company-logo"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Cover photo
        </label>
        <div
          onClick={open}
          className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        >
          <div className="text-center">
            <CloudUpload
              aria-hidden="true"
              className="mx-auto size-12 text-gray-300"
            />
            <div className="mt-4 flex text-sm/6 cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
              <span>{(files?.[0])?.name || "Upload a file"}</span>
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
            <p className="text-xs/5 text-gray-600">
              (JPEG and PNG only, 2MB maximum.)
            </p>
          </div>
        </div>
      </div>

      <button onClick={onBack} type="button">
        Back
      </button>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Next
      </button>
    </form>
  );
}
