import { getCompanies } from "@/app/actions/companies.actions";
import { Companies } from "@/components/view/Companies";

export default async function Page() {
  const { data, loading, error } = await getCompanies();

  /* async function downloadImageFile(s3Key: string) {
    "use server"
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
  
      const blob = await response.blob();
  
      return { data: blob };
    } catch (error) {
      console.error("Error downloading file from S3:", error);
      return { error: apiError(error) };
    }
  }; */

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading companies</p>;
  return <Companies data={data} />;
}
