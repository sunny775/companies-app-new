"use server";

import apiError from "@/lib/apiError";
import { getClient } from "@/lib/apolloClient";
import { GET_SIGNED_DOWNLOAD_URL, GET_SIGNED_UPLOAD_URL } from "@/lib/graphql/queries";
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

export async function getSignedDownloadUr(s3Key: string) {
  try {
    const { data, loading } = await getClient().query({
      query: GET_SIGNED_DOWNLOAD_URL,
      variables: { s3Key },
    });
    return { data: data.signedDownloadUrl, loading };
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

export async function downloadImageFile(s3Key: string) {
  if (!s3Key) return;

  try {
    const { data, error } = await getSignedDownloadUr(s3Key);

    if (error) {
      return { error };
    }

    if (!data.url) {
      return { error: new Error("Invalid server response. Please try again.") };
    }

    const response = await fetch(data.url);

    if (!response.ok) {
      throw new Error(`Download failed with status: ${response.status}`);
    }

    /* const arrayBuffer = await response.arrayBuffer();

    const contentType = response.headers.get("content-type") || "image/jpeg";

    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;

    return { dataUrl, contentType };*/
    const blob = await response.blob();

    return { data: blob };
  } catch (error) {
    console.error("Error downloading file from S3:", error);
    return { error: apiError(error) };
  }
}
