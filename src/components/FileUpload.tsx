"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SIGNED_UPLOAD_URL } from "@/lib/graphql/queries";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState<File | null>(null);

  const { refetch } = useQuery(GET_SIGNED_UPLOAD_URL, {
    skip: true,
  });

  const uploadFile = async () => {
    if (!file) return;
    const { data } = await refetch({
      input: { fileName: file.name, contentType: file.type },
    });

    const { url, key } = data.getSignedUploadUrl;

    await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    onUpload(key);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={uploadFile} className="bg-green-500 text-white px-4 py-2">
        Upload
      </button>
    </div>
  );
}
