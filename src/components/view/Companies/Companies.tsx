import { Company } from "@/lib/graphql/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { CompaniesList } from "./CompaniesList";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SearchAndFilters } from "./SearchAndFilters";

// Mock data for companies
const mockCompanies: Company[] = [
  {
    id: "c1",
    legalName: "Acme Corporation",
    industry: "Technology",
    totalNumberOfEmployees: 1500,
    numberOfFullTimeEmployees: 1200,
    numberOfPartTimeEmployees: 300,
    website: "https://acme.example.com",
    stateOfIncorporation: "California",
    phone: "415-555-1234",
    email: "contact@acme.example.com",
    registeredAddress: {
      city: "San Francisco",
      state: "California",
      country: "USA",
    },
    primaryContactPerson: {
      firstName: "John",
      lastName: "Doe",
      email: "john@acme.example.com",
      phone: "415-555-5678",
    },
  },
  {
    id: "c2",
    legalName: "Globex Industries",
    industry: "Manufacturing",
    totalNumberOfEmployees: 3200,
    numberOfFullTimeEmployees: 3000,
    numberOfPartTimeEmployees: 200,
    website: "https://globex.example.com",
    stateOfIncorporation: "Michigan",
    phone: "313-555-4321",
    email: "info@globex.example.com",
    registeredAddress: {
      city: "Detroit",
      state: "Michigan",
      country: "USA",
    },
    primaryContactPerson: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@globex.example.com",
      phone: "313-555-8765",
    },
  },
  {
    id: "c3",
    legalName: "Initech Solutions",
    industry: "Software",
    totalNumberOfEmployees: 750,
    numberOfFullTimeEmployees: 680,
    numberOfPartTimeEmployees: 70,
    website: "https://initech.example.com",
    stateOfIncorporation: "Texas",
    phone: "512-555-9876",
    email: "hello@initech.example.com",
    registeredAddress: {
      city: "Austin",
      state: "Texas",
      country: "USA",
    },
    primaryContactPerson: {
      firstName: "Michael",
      lastName: "Bolton",
      email: "michael@initech.example.com",
      phone: "512-555-3456",
    },
  },
  {
    id: "c4",
    legalName: "Massive Dynamic",
    industry: "Research",
    totalNumberOfEmployees: 4500,
    numberOfFullTimeEmployees: 4200,
    numberOfPartTimeEmployees: 300,
    website: "https://massive.example.com",
    stateOfIncorporation: "New York",
    phone: "212-555-7890",
    email: "inquiries@massive.example.com",
    registeredAddress: {
      city: "New York",
      state: "New York",
      country: "USA",
    },
    primaryContactPerson: {
      firstName: "Walter",
      lastName: "Bishop",
      email: "walter@massive.example.com",
      phone: "212-555-1122",
    },
  },
  {
    id: "c5",
    legalName: "Stark Industries",
    industry: "Energy",
    totalNumberOfEmployees: 9800,
    numberOfFullTimeEmployees: 9500,
    numberOfPartTimeEmployees: 300,
    website: "https://stark.example.com",
    stateOfIncorporation: "California",
    phone: "310-555-3344",
    email: "contact@stark.example.com",
    registeredAddress: {
      city: "Los Angeles",
      state: "California",
      country: "USA",
    },
    primaryContactPerson: {
      firstName: "Virginia",
      lastName: "Potts",
      email: "pepper@stark.example.com",
      phone: "310-555-5566",
    },
  },
  {
    id: "c6",
    legalName: "Wayne Enterprises",
    industry: "Conglomerate",
    totalNumberOfEmployees: 12500,
    numberOfFullTimeEmployees: 12000,
    numberOfPartTimeEmployees: 500,
    website: "https://wayne.example.com",
    stateOfIncorporation: "New Jersey",
    phone: "201-555-7788",
    email: "info@wayne.example.com",
    registeredAddress: {
      city: "Gotham",
      state: "New Jersey",
      country: "USA",
    },
    primaryContactPerson: {
      firstName: "Lucius",
      lastName: "Fox",
      email: "lucius@wayne.example.com",
      phone: "201-555-9900",
    },
  },
];

// Industry options for filter
const industries = ["All Industries", "Technology", "Manufacturing", "Software", "Research", "Energy", "Conglomerate"];

// State options for filter
const states = ["All States", "California", "Michigan", "Texas", "New York", "New Jersey"];

export function Companies() {
  const [companies] = useState(mockCompanies);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "legalName" as keyof Company,
    direction: "ascending",
  });
  const [filters, setFilters] = useState({
    industry: "All Industries",
    state: "All States",
    size: "All",
  });

  // Sort functionality
  const requestSort = (key: keyof Company) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort indicator
  const getSortIndicator = (columnName: string) => {
    if (sortConfig.key !== columnName) return null;

    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="inline-block w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline-block w-4 h-4 ml-1" />
    );
  };

  // Filter companies
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

        let matchesSize = true;
        if (company.totalNumberOfEmployees) {
          if (filters.size === "Small (<100)") {
            matchesSize = company.totalNumberOfEmployees < 100;
          } else if (filters.size === "Medium (100-1000)") {
            matchesSize = company.totalNumberOfEmployees >= 100 && company.totalNumberOfEmployees <= 1000;
          } else if (filters.size === "Large (>1000)") {
            matchesSize = company.totalNumberOfEmployees > 1000;
          }
        }

        return matchesSearch && matchesIndustry && matchesState && matchesSize;
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

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      industry: "All Industries",
      state: "All States",
      size: "All",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          filterOptions={{ industries, states }}
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
