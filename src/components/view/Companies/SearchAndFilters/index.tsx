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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
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
                {filterOptions.industries.map((industry) => (
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
                {filterOptions.states.map((state) => (
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
  );
}
