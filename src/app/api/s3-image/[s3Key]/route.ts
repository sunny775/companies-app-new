import { GET_SIGNED_DOWNLOAD_URL } from "@/lib/graphql/queries";
import apiError from "@/lib/utils/apiError";
import { getClient } from "@/lib/utils/apolloClient";
import { NextRequest, NextResponse } from "next/server";

async function getSignedDownloadUrl(s3Key: string) {
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

export async function GET(request: NextRequest, { params }: { params: { s3Key: string } }) {
  const { s3Key } = await params;

  try {
    const result = await getSignedDownloadUrl(s3Key);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    if (!result.data) {
      return NextResponse.json({ error: "No URL returned" }, { status: 404 });
    }

    const imageResponse = await fetch(result.data.url);

    if (!imageResponse.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`,
        },
        { status: imageResponse.status }
      );
    }

    const imageData = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";

    return new NextResponse(imageData, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000", // Cache for 1 year
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
