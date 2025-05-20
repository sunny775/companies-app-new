"use server";

import apiError from "@/lib/apiError";
import { getClient } from "@/lib/apolloClient";
import { GET_SIGNED_UPLOAD_URL } from "@/lib/graphql/queries";
import { SignedFileUploadInput } from "@/lib/graphql/types";

export async function getSignedUploadUrl(input: SignedFileUploadInput) {
  try {
    const { data, loading } = await getClient().query({
      query: GET_SIGNED_UPLOAD_URL,
      variables: { input },
    });
    return { data: data.signedUploadUrl, loading };
  } catch (error) {
    return { error: apiError(error) };
  }
}

export async function uploadFile(file: File) {
  try {
    const { data, error } = await getSignedUploadUrl({
      fileName: file.name,
      contentType: file.type,
    });

    if (error) {
      return { error };
    }

    if (!data.url) {
      return { error: new Error("Invalid server response. Please try again.") };
    }

    const response = await fetch(data.url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }
    return { data: { s3Key: data.key } };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return { error: apiError(error) };
  }
}
