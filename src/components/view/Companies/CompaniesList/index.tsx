import Button from "@/components/atoms/Button";
import { Company } from "@/lib/graphql/types";
import { Briefcase, Search } from "lucide-react";
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
    <div className="bg-surface shadow overflow-hidden rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-gray-100 dark:bg-gray-600/10">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("legalName")}
              >
                <div className="flex items-center">Company {getSortIndicator("legalName")}</div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("industry")}
              >
                <div className="flex items-center">Industry {getSortIndicator("industry")}</div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("totalNumberOfEmployees")}
              >
                <div className="flex items-center">Employees {getSortIndicator("totalNumberOfEmployees")}</div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-100 dark:hover:bg-gray-600/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-600/10 rounded-full flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-muted" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{company.legalName}</div>
                        <div className="text-sm text-muted">{company.website}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{company.industry}</div>
                    <div className="text-sm text-muted">{company.stateOfIncorporation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{company.totalNumberOfEmployees?.toLocaleString()}</div>
                    <div className="text-sm text-muted">
                      {company.numberOfFullTimeEmployees?.toLocaleString()} FT /{" "}
                      {company.numberOfPartTimeEmployees?.toLocaleString()} PT
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {company.registeredAddress?.city}, {company.registeredAddress?.state}
                    </div>
                    <div className="text-sm text-muted">{company.registeredAddress?.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {company.primaryContactPerson ? (
                      <div>
                        <div className="text-sm">
                          {company.primaryContactPerson.firstName} {company.primaryContactPerson.lastName}
                        </div>
                        <div className="text-sm text-muted">{company.primaryContactPerson.email}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted">No contact person</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/companies/${company.id}`} className="text-blue-600 hover:text-blue-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Search className="h-12 w-12 text-muted mb-2" />
                    <h3 className="text-lg font-medium">No companies found</h3>
                    <p className="text-gray-500 max-w-md">
                      We couldnt find any companies matching your search criteria. Try adjusting your filters or search
                      term.
                    </p>
                    <Button onClick={resetFilters} variant="ghost" color="info">
                      Reset filters
                    </Button>
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
