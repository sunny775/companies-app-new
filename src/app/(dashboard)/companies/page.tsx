import { getCompanies } from "@/app/actions/companies.actions";
import { Companies } from "@/components/views/Companies";

export default async function Page() {
  const { data, loading, error } = await getCompanies();

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading companies</p>;
  return <Companies data={data} />;
}
