"use client";

import { buttonStyles } from "@/components/Button";
import cn from "@/lib/cn";
import Link from "next/link";
import { useState } from "react";
import Select from "../atoms/Select";
import { data } from "./data";
import DialogExample from "../atoms/Dialog/DialogExample";

// const data = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Purple", "Pink", "Maroon", "Black", "White"];

export function Test() {
  const [value, setValue] = useState<string>();
  const [query, setQuery] = useState("");

  const options = data.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <main className="flex flex-col  gap-[32px] items-center justify-center">
        <Link href={"/companies"} className={cn(buttonStyles({ variant: "gradient" }))}>
          Go to Companies List
        </Link>

        <DialogExample />
        <div className="w-72 my-4">
          <Select
            defaultValue={value}
            searchQuery={query}
            setSearchQuery={setQuery}
            filteredOptions={options}
            onChange={(value) => setValue(value)}
          >
            <Select.Trigger color="error">Select Fruit</Select.Trigger>
            <Select.Dropdown>
              <Select.Input />
              <Select.List>
                {options.map((option, i) => (
                  <Select.Item key={i + option} value={option}>
                    {option}
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Dropdown>
          </Select>
        </div>
      </main>
    </div>
  );
}
