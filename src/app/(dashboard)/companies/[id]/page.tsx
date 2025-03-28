import { getCompany } from "@/app/actions/companies.actions";

export default async function CompaniesList(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { data, loading, error } = await getCompany(params.id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">{data.legalName}</h1>
      <p>Industry: {data.industry}</p>
    </div>
  );
}
