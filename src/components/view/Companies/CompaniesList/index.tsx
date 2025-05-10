import { Company } from "@/lib/graphql/types";
import { Briefcase, MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";
import { Pagination } from "./Pagination";

interface ListProps {
  resetFilters: () => void;
  filteredCompanies: Company[];
  requestSort: (key: keyof Company) => void;
  getSortIndicator: (columnName: string) => React.ReactElement | null;
}

export function CompaniesList({ resetFilters, filteredCompanies, requestSort, getSortIndicator }: ListProps) {
  return (
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
                <tr key={company.id} className="hover:bg-gray-50">
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
                    <div className="text-sm text-gray-900">{company.totalNumberOfEmployees?.toLocaleString()}</div>
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
                      <Link href={`/companies/${company.id}`} className="text-blue-600 hover:text-blue-900">
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
                      We couldnt find any companies matching your search criteria. Try adjusting your filters or search
                      term.
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
      <Pagination data={filteredCompanies} />
    </div>
  );
}
