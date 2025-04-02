import React, { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Button from "./Button";

interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

export function InputWithDropdown() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/sunny775/f6f6c6691e259fb8b432a0718b15410f/raw/449258552611926be9ee7a8b4acc2ed9b2243a97/countries.json"
        );
        const data = await response.json();
        setCountries(data);
        console.log(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!menuOpen) return;

    if (event.key === "ArrowDown") {
      setFocusedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, countries.length - 1)
      );
      event.preventDefault();
    } else if (event.key === "ArrowUp") {
      setFocusedIndex((prev) =>
        prev === null ? countries.length - 1 : Math.max(prev - 1, 0)
      );
      event.preventDefault();
    } else if (event.key === "Enter" && focusedIndex !== null) {
      setSelectedIndex(focusedIndex);
      setMenuOpen(false);
    } else if (event.key === "Escape") {
      setMenuOpen(false);
    }
  };

  if (loading) {
    return <p>Loading countries...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const { flag, dial_code } = countries[selectedIndex];

  return (
    <div className="relative flex w-full" ref={menuRef}>
      {/* Country Select Button */}
      <Button
        type="button"
        ref={buttonRef}
        onClick={() => setMenuOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 pl-3 pr-2 focus:outline-none py-0 shadow-none hover:shadow-none border-black/10 dark:border-white/10"
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
      >
        <div className="text-3xl rounded-full">{flag}</div>
        {dial_code}
      </Button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute left-0 top-full z-10 mt-1 max-h-[20rem] max-w-[18rem] overflow-y-auto bg-surface shadow-lg border border-gray-100 dark:border-gray-900/20 rounded-md"
        >
          {countries.map(({ name, flag, dial_code }, index) => (
            <li
              key={name}
              role="option"
              aria-selected={index === selectedIndex}
              tabIndex={0}
              onClick={() => {
                setSelectedIndex(index);
                setMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-green-600/10`}
            >
              <div className="text-3xl rounded-full">{flag}</div>
              {name} <span className="ml-auto">{dial_code}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Mobile Number Input */}
      <Input
        type="tel"
        placeholder="Mobile Number"
        className="rounded-l-none px-3 py-2 w-full"
      />
    </div>
  );
}
