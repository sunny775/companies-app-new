import { getCompanies } from "@/app/actions/companies.actions";
import { companyIdsVar } from "@/lib/apolloClient";

export default async function CompaniesList() {
  console.log(companyIdsVar())
  const { data, loading, error } = await getCompanies();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  console.log(data);

  return (
    <div>
      <h1 className="text-xl font-bold">Companies</h1>
      <ul>
        {data &&
          Object.values(data).map((company) => (
            <li key={company.id}>
              <a href={`/companies/${company.id}`} className="text-blue-600">
                {company.legalName}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
