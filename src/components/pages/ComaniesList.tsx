"use client";
import { useQuery } from "@apollo/client";
import { GET_COMPANIES } from "@/lib/graphql/queries";
import { GetCompaniesQuery } from "@/lib/graphql/types";

export default function CompaniesList() {
  const { data, loading, error } = useQuery<GetCompaniesQuery>(GET_COMPANIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading companies.</p>;

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
