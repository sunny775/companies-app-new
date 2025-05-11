import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { ChevronDown, ChevronUp, Download, Filter, Search, X } from "lucide-react";
import { useState } from "react";

export interface Filters {
  industry: string;
  state: string;
  size: string;
}

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Filters;
  filterOptions: { industries: string[]; states: string[] };
  resetFilters: () => void;
  setFilters: (value: Filters) => void;
}

export function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  resetFilters,
  filterOptions,
}: SearchAndFiltersProps) {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  return (
    <div className="bg-gray-600/5 dark:bg-gray-600/10 rounded-lg shadow mb-6">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search */}
           
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              containerProps={{className: "max-w-xl"}}
              iconLeft={ <Search className="h-5 w-5 text-gray-400" />}
              {...( searchQuery ? {iconRight: <X className="h-4 w-4 text-gray-400" onClick={() => setSearchQuery("")} />} : {}) }
            />

          {/* Filter Toggle */}
          <Button
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            className="flex items-center justify-center"
          >
            <Filter className="h-4 w-4 mr-2 shrink-0" />
            Filters
            {isFiltersVisible ? <ChevronUp className="ml-2 h-4 w-4 shrink-0" /> : <ChevronDown className="ml-2 h-4 w-4 shrink-0" />}
          </Button>

          {/* Export Button */}
          <Button className="flex items-center justify-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Expanded Filters */}
      {isFiltersVisible && (
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="industry-filter" className="block text-sm font-medium mb-1">
                Industry
              </label>
              <select
                id="industry-filter"
                value={filters.industry}
                onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {filterOptions.industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="state-filter" className="block text-sm font-medium mb-1">
                State
              </label>
              <select
                id="state-filter"
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                className="block w-full pl-3 pr-10 py-2 text-base border-border focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {filterOptions.states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="size-filter" className="block text-sm font-medium mb-1">
                Company Size
              </label>
              <select
                id="size-filter"
                value={filters.size}
                onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                className="block w-full pl-3 pr-10 py-2 text-base border-border focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="All">All Sizes</option>
                <option value="Small (<100)">Small (&lt;100)</option>
                <option value="Medium (100-1000)">Medium (100-1000)</option>
                <option value="Large (>1000)">Large (&gt;1000)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
