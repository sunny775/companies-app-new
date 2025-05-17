import Button from "@/components/atoms/Button";
import Collapse from "@/components/atoms/Collapse";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { ChevronDown, Filter, Search, X } from "lucide-react";
import { useState } from "react";
import { ExportCompaniesDialog } from "./ExportCompaniesDialog";

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
  jsonInputForExports: string;
}

export function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  resetFilters,
  filterOptions,
  jsonInputForExports,
}: SearchAndFiltersProps) {
  const [industriesSearch, setIndustriesSearch] = useState("");
  const [statesSearch, setStatesSearch] = useState("");

  const industries = filterOptions.industries.filter((option) =>
    option.toLowerCase().includes(industriesSearch.toLowerCase())
  );
  const states = filterOptions.states.filter((option) => option.toLowerCase().includes(statesSearch.toLowerCase()));

  return (
    <div className="bg-gray-100 dark:bg-gray-600/10 rounded-lg shadow mb-6">
      <Collapse.Root className="mb-8 shadow-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search companies..."
            containerProps={{ className: "md:max-w-xl" }}
            iconLeft={<Search className="h-5 w-5 text-gray-400" />}
            {...(searchQuery
              ? { iconRight: <X className="h-4 w-4 text-gray-400" onClick={() => setSearchQuery("")} /> }
              : {})}
          />

          <div className="flex  gap-2 flex-col md:flex-row md:items-center">
            <Collapse.Trigger asChild>
              <Button className="flex items-center justify-center">
                <Filter className="h-4 w-4 mr-2 shrink-0" />
                Filters
                <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </Collapse.Trigger>

            <ExportCompaniesDialog jsonInput={jsonInputForExports} />
          </div>
        </div>

        <Collapse.Content>
          <div className="p-4 border-t border-border flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-xl">
              <Select
                value={filters.industry}
                searchQuery={industriesSearch}
                setSearchQuery={setIndustriesSearch}
                filteredOptions={industries}
                onChange={(value) => setFilters({ ...filters, industry: value })}
                label="Filter By Industry"
                className="w-full"
              >
                <Select.Trigger>Select Industry</Select.Trigger>
                <Select.Dropdown>
                  <Select.Input />
                  <Select.List>
                    {industries.map((option, i) => (
                      <Select.Item key={i + option} value={option}>
                        {option}
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Dropdown>
              </Select>

              <Select
                value={filters.state}
                searchQuery={statesSearch}
                setSearchQuery={setStatesSearch}
                filteredOptions={states}
                onChange={(value) => setFilters({ ...filters, state: value })}
                label="Filter By State"
                className="w-full"
              >
                <Select.Trigger>Select State</Select.Trigger>
                <Select.Dropdown>
                  <Select.Input />
                  <Select.List>
                    {states.map((option, i) => (
                      <Select.Item key={i + option} value={option}>
                        {option}
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Dropdown>
              </Select>
            </div>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        </Collapse.Content>
      </Collapse.Root>
    </div>
  );
}
