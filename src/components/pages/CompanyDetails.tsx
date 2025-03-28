"use client";

import { useQuery } from "@apollo/client";
import { GET_COMPANY } from "@/lib/graphql/queries";
import { useParams } from "next/navigation";
import { GetCompanyQuery } from "@/lib/graphql/types";

export default function CompanyDetails() {
  const { id } = useParams();
  const { data, loading } = useQuery<GetCompanyQuery>(GET_COMPANY, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Company not found.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">{data.getCompany.legalName}</h1>
      <p>Industry: {data.getCompany.industry}</p>
    </div>
  );
}
