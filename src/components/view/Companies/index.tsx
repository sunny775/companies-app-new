"use client";

import { getCompanies } from "@/app/actions/companies.actions";
import apiError from "@/lib/apiError";
import { Company } from "@/lib/graphql/types";
import { useEffect, useState } from "react";
import { Companies } from "./Companies";

export default function CompaniesListPage() {
  const [companies, setCompanies] = useState<Company[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const companyIds = JSON.parse(localStorage.companyIds) || [];
        console.log(companyIds);

        //localStorage.companyIds = JSON.stringify(['9191ecc8-2c83-4ec0-b493-2776ade16cf5', '9b4ac1a6-76c9-4544-b3f7-c618d65ec311'])

        const { data, error } = await getCompanies(companyIds);
        if (error) throw error;

        setCompanies(data);
      } catch (error) {
        setError(apiError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center py-6 text-gray-600">Loading companies...</div>;
  if (error) return <div className="text-center py-6 text-red-500">Error loading companies: {error.message}</div>;

  return <Companies />;
}
