"use client";

import Alert from "@/components/ui/atoms/Alert";
import { initialCompanyIds } from "@/lib/data/initialCompanyIds";
import { GET_COMPANIES } from "@/lib/graphql/queries";
import { Company } from "@/lib/graphql/types";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import cn from "@/lib/utils/cn";
import { useQuery } from "@apollo/client";
import { ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CompaniesListSkeleton } from "../Skeleton/CompaniesList";
import { CompaniesList } from "./CompaniesList";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SearchAndFilters } from "./SearchAndFilters";

const serializeDataForExprts = (data: Company[]) => {
  const transformedData = data.map((company) => {
    const {
      legalName,
      industry,
      totalNumberOfEmployees,
      numberOfFullTimeEmployees,
      numberOfPartTimeEmployees,
      website,
      stateOfIncorporation,
      phone,
      email,
      registeredAddress,
      primaryContactPerson,
    } = company;
    return {
      legalName,
      industry,
      totalNumberOfEmployees,
      numberOfFullTimeEmployees,
      numberOfPartTimeEmployees,
      website,
      stateOfIncorporation,
      phone,
      email,
      Location: `${registeredAddress?.state}, ${registeredAddress?.country}`,
      ContactPerson: `${primaryContactPerson?.email}`,
    };
  });

  return JSON.stringify(transformedData);
};

export function Companies() {
  const [companyIds, setCompanyIds] = useLocalStorage("companyIds", initialCompanyIds);
  const { data, error } = useQuery(GET_COMPANIES(companyIds));

  const [companies, setCompanies] = useState<Company[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "legalName" as keyof Company,
    direction: "ascending",
  });
  const [filters, setFilters] = useState({
    industry: "All Industries",
    state: "All States",
  });

  useEffect(() => {
    if (data) {
      setCompanies(Object.values(data));
    }
  }, [data]);

  const requestSort = (key: keyof Company) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (columnName: string) => {
    if (sortConfig.key !== columnName) return null;

    return (
      <ChevronUp
        className={cn("inline-block w-4 h-4 ml-1 transition-all", {
          "rotate-180": sortConfig.direction === "ascending",
        })}
      />
    );
  };

  const industries = [
    "All Industries",
    ...new Set(
      companies.map((company) => company.industry).filter((industry): industry is string => Boolean(industry))
    ),
  ];
  const states = [
    "All States",
    ...new Set(
      companies.map((company) => company.registeredAddress?.state).filter((state): state is string => Boolean(state))
    ),
  ];

  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company) => {
        const matchesSearch =
          company.legalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (company.industry && company.industry.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesIndustry = filters.industry === "All Industries" || company.industry === filters.industry;

        const matchesState =
          filters.state === "All States" ||
          (company.registeredAddress && company.registeredAddress.state === filters.state);

        return matchesSearch && matchesIndustry && matchesState;
      })
      .sort((a, b) => {
        const keyA = a[sortConfig.key] || "";
        const keyB = b[sortConfig.key] || "";

        if (keyA < keyB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (keyA > keyB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
  }, [companies, searchQuery, sortConfig, filters]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      industry: "All Industries",
      state: "All States",
    });
  };

  const onCompanyCreated = (company: Company) => {
    setCompanies((prev) => [company, ...prev]);
    setCompanyIds((prev) => [company.id, ...prev]);
  };

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background max-w-2xl">
        <Alert variant="error">{error.message}</Alert>
      </div>
    );

  if (!companies.length) return <CompaniesListSkeleton />;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onCompanyCreated={onCompanyCreated} />
      <main className="flex-1 max-w-[90vw] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          filterOptions={{ industries, states }}
          jsonInputForExports={serializeDataForExprts(companies)}
        />
        <CompaniesList
          resetFilters={resetFilters}
          filteredCompanies={filteredCompanies}
          requestSort={requestSort}
          getSortIndicator={getSortIndicator}
        />
      </main>

      <Footer totalDisplayed={filteredCompanies.length} totalCompanies={companies.length} />
    </div>
  );
}
