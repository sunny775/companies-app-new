import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Filter,
  Globe,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// Mock data for companies
const mockCompanies = [
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

export  function CompaniesList() {
  const [companies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "legalName",
    direction: "ascending",
  });
  const [filters, setFilters] = useState({
    industry: "All Industries",
    state: "All States",
    size: "All",
  });
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Sort functionality
  const requestSort = (key: string) => {
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
          company.legalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (company.industry && company.industry.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesIndustry = filters.industry === "All Industries" || company.industry === filters.industry;

        const matchesState =
          filters.state === "All States" ||
          (company.registeredAddress && company.registeredAddress.state === filters.state);

        let matchesSize = true;
        if (filters.size === "Small (<100)") {
          matchesSize = company.totalNumberOfEmployees < 100;
        } else if (filters.size === "Medium (100-1000)") {
          matchesSize = company.totalNumberOfEmployees >= 100 && company.totalNumberOfEmployees <= 1000;
        } else if (filters.size === "Large (>1000)") {
          matchesSize = company.totalNumberOfEmployees > 1000;
        }

        return matchesSearch && matchesIndustry && matchesState && matchesSize;
      })
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
  }, [companies, searchTerm, sortConfig, filters]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      industry: "All Industries",
      state: "All States",
      size: "All",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus className="w-5 h-5 mr-2" />
              Add Company
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-grow max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search companies..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {isFiltersVisible ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>

              {/* Export Button */}
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {isFiltersVisible && (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="industry-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select
                    id="industry-filter"
                    value={filters.industry}
                    onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="state-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    id="state-filter"
                    value={filters.state}
                    onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="size-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size
                  </label>
                  <select
                    id="size-filter"
                    value={filters.size}
                    onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="All">All Sizes</option>
                    <option value="Small (<100)">Small (&lt;100)</option>
                    <option value="Medium (100-1000)">Medium (100-1000)</option>
                    <option value="Large (>1000)">Large (&gt;1000)</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Company List */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("legalName")}
                  >
                    <div className="flex items-center">Company {getSortIndicator("legalName")}</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("industry")}
                  >
                    <div className="flex items-center">Industry {getSortIndicator("industry")}</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("totalNumberOfEmployees")}
                  >
                    <div className="flex items-center">Employees {getSortIndicator("totalNumberOfEmployees")}</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <tr
                      key={company.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{company.legalName}</div>
                            <div className="text-sm text-gray-500">{company.website}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{company.industry}</div>
                        <div className="text-sm text-gray-500">{company.stateOfIncorporation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{company.totalNumberOfEmployees.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">
                          {company.numberOfFullTimeEmployees?.toLocaleString()} FT /{" "}
                          {company.numberOfPartTimeEmployees?.toLocaleString()} PT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {company.registeredAddress?.city}, {company.registeredAddress?.state}
                        </div>
                        <div className="text-sm text-gray-500">{company.registeredAddress?.country}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {company.primaryContactPerson ? (
                          <div>
                            <div className="text-sm text-gray-900">
                              {company.primaryContactPerson.firstName} {company.primaryContactPerson.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{company.primaryContactPerson.email}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">No contact person</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-3">
                          <Link
                            href={`/companies/${company.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                          <div className="relative inline-block text-left">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add dropdown functionality here
                              }}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No companies found</h3>
                        <p className="text-gray-500 max-w-md">
                          We couldnt find any companies matching your search criteria. Try adjusting your filters or
                          search term.
                        </p>
                        <button
                          onClick={resetFilters}
                          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Reset filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - simplified for demonstration */}
          <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredCompanies.length}</span> of{" "}
                <span className="font-medium">{filteredCompanies.length}</span> results
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </nav>
        </div>
      </main>

      {/* Status Bar */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              {filteredCompanies.length} companies displayed (of {companies.length} total)
            </div>
            <div>Last synced: Today at 14:32</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
