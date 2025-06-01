"use client";
import cn from "@/lib/utils/cn";
import { Search, X } from "lucide-react";
import { ChangeEvent } from "react";
import { useSelect } from "./SelectContext";

export interface SelectInputProps {
  placeholder?: string;
  className?: string;
}

export function SelectInput({ placeholder, className }: SelectInputProps) {
  const { searchQuery, setSearchQuery, searchInputRef, listboxId, searchId } = useSelect();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = (): void => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  return (
    <div className={cn("px-3 py-2 sticky top-0 border-b border-black/5 dark:border-gray-600/10", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          autoFocus
          id={searchId}
          ref={searchInputRef}
          className="block w-full pl-10 pr-8 py-1 border border-black/10 dark:border-white/5 rounded-md leading-5  placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-4 focus:ring-green-500/10 focus:border-green-500/50 sm:text-sm transition-all duration-300"
          placeholder={placeholder || "Search ..."}
          value={searchQuery}
          onChange={handleSearchChange}
          aria-controls={listboxId}
          role="searchbox"
          aria-label="Search options"
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-500" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
