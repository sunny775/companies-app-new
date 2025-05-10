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
  const [companies, setCompanies] = useState(mockCompanies);
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
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  // Sort functionality
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort indicator
  const getSortIndicator = (columnName) => {
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

  // View company details
  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanyDetails(true);
  };

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
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewCompany(company)}
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewCompany(company);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
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
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No companies found</h3>
                        <p className="text-gray-500 max-w-md">
                          We couldn't find any companies matching your search criteria. Try adjusting your filters or
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

      {/* Company Details Modal */}
      {showCompanyDetails && selectedCompany && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">{selectedCompany.legalName}</h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowCompanyDetails(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-6 max-h-screen overflow-y-auto">
                {/* Company Overview */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-3">Company Overview</h4>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Legal Name</p>
                          <p className="text-sm text-gray-900">{selectedCompany.legalName}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Website</p>
                          <p className="text-sm text-blue-600 hover:underline">{selectedCompany.website}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Employees</p>
                          <p className="text-sm text-gray-900">
                            {selectedCompany.totalNumberOfEmployees.toLocaleString()} total (
                            {selectedCompany.numberOfFullTimeEmployees.toLocaleString()} full-time,{" "}
                            {selectedCompany.numberOfPartTimeEmployees.toLocaleString()} part-time)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="text-sm text-gray-900">{selectedCompany.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-sm text-blue-600 hover:underline">{selectedCompany.email}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <div className="h-5 w-5 flex items-center justify-center text-gray-400 mr-2">
                          <span className="text-xs font-bold">IN</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Industry</p>
                          <p className="text-sm text-gray-900">{selectedCompany.industry}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-3">Address Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedCompany.registeredAddress ? (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Registered Address</p>
                        <p className="text-sm text-gray-900 mb-4">
                          {selectedCompany.registeredAddress.street && `${selectedCompany.registeredAddress.street}, `}
                          {selectedCompany.registeredAddress.city}, {selectedCompany.registeredAddress.state},{" "}
                          {selectedCompany.registeredAddress.country}
                          {selectedCompany.registeredAddress.zipCode && ` ${selectedCompany.registeredAddress.zipCode}`}
                        </p>

                        {selectedCompany.mailingAddress &&
                          selectedCompany.registeredAddress.isMailingAddressDifferentFromRegisteredAddress && (
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Mailing Address</p>
                              <p className="text-sm text-gray-900">
                                {selectedCompany.mailingAddress.street && `${selectedCompany.mailingAddress.street}, `}
                                {selectedCompany.mailingAddress.city}, {selectedCompany.mailingAddress.state},{" "}
                                {selectedCompany.mailingAddress.country}
                                {selectedCompany.mailingAddress.zipCode && ` ${selectedCompany.mailingAddress.zipCode}`}
                              </p>
                            </div>
                          )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No address information available</p>
                    )}
                  </div>
                </div>

                {/* Contact Person */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-3">Primary Contact Person</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedCompany.primaryContactPerson ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Name</p>
                          <p className="text-sm text-gray-900">
                            {selectedCompany.primaryContactPerson.firstName}{" "}
                            {selectedCompany.primaryContactPerson.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-sm text-blue-600 hover:underline">
                            {selectedCompany.primaryContactPerson.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="text-sm text-gray-900">{selectedCompany.primaryContactPerson.phone}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No primary contact person specified</p>
                    )}
                  </div>
                </div>

                {/* Company Insights - Add a visual component */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-3">Company Insights</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Employee Distribution</h5>
                      <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="flex h-full">
                          <div
                            className="bg-blue-600"
                            style={{
                              width: `${
                                (selectedCompany.numberOfFullTimeEmployees / selectedCompany.totalNumberOfEmployees) *
                                100
                              }%`,
                            }}
                          ></div>
                          <div
                            className="bg-blue-400"
                            style={{
                              width: `${
                                (selectedCompany.numberOfPartTimeEmployees / selectedCompany.totalNumberOfEmployees) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
                          <span>
                            Full-time (
                            {Math.round(
                              (selectedCompany.numberOfFullTimeEmployees / selectedCompany.totalNumberOfEmployees) * 100
                            )}
                            %)
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-400 rounded-full mr-1"></div>
                          <span>
                            Part-time (
                            {Math.round(
                              (selectedCompany.numberOfPartTimeEmployees / selectedCompany.totalNumberOfEmployees) * 100
                            )}
                            %)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Industry Ranking</p>
                        <p className="text-xl font-semibold text-gray-900">#3</p>
                        <p className="text-xs text-gray-500">among {selectedCompany.industry} companies</p>
                      </div>
                      <div className="bg-white p-3 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Growth Rate</p>
                        <p className="text-xl font-semibold text-green-600">+12.5%</p>
                        <p className="text-xs text-gray-500">year over year</p>
                      </div>
                      <div className="bg-white p-3 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Risk Assessment</p>
                        <p className="text-xl font-semibold text-blue-600">Low</p>
                        <p className="text-xs text-gray-500">based on industry analysis</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-3">Recent Activity</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flow-root">
                      <ul className="divide-y divide-gray-200">
                        <li className="py-3">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Edit className="h-4 w-4 text-blue-600" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-900">Profile updated</p>
                              <p className="text-sm text-gray-500">Company details were updated by Admin</p>
                            </div>
                            <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">2 days ago</div>
                          </div>
                        </li>
                        <li className="py-3">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Plus className="h-4 w-4 text-green-600" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-900">Contact person added</p>
                              <p className="text-sm text-gray-500">New primary contact person was assigned</p>
                            </div>
                            <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">1 week ago</div>
                          </div>
                        </li>
                        <li className="py-3">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <Briefcase className="h-4 w-4 text-purple-600" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-900">Company created</p>
                              <p className="text-sm text-gray-500">Company profile was created in the system</p>
                            </div>
                            <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">1 month ago</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setShowCompanyDetails(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Company
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Edit Form Modal - placeholder for future implementation */}

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

      {/* Toast Notification Component - can be used for user feedback */}
      <div className="fixed bottom-0 right-0 pb-4 pr-4 z-50 pointer-events-none">
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto border-l-4 border-green-500 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">Company data loaded successfully!</p>
                <p className="mt-1 text-sm text-gray-500">The list displays all available companies in the system.</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
