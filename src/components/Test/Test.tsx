"use client";

import { buttonStyles } from "@/components/Button";
import cn from "@/lib/cn";
import Link from "next/link";
import { useState } from "react";
import DialogExample from "../atoms/Dialog/DialogExample";
import DrawerExample from "../atoms/Drawer/DrawerExample";
import MenuExample from "../atoms/Menu/MenuExample";
import Select from "../atoms/Select";
import { StepperExample } from "../atoms/Stepper/StepperExample";
import { TabsExample } from "../atoms/Tabs/TabsExample";
import { data } from "./data";

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
        <div className="w-72 my-4">
          <Select
            defaultValue={value}
            searchQuery={query}
            setSearchQuery={setQuery}
            filteredOptions={options}
            onChange={(value) => setValue(value)}
          >
            <Select.Trigger>Select Fruit</Select.Trigger>
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
        <div className="w-full max-w-3xl">
          <MenuExample />
        </div>
        <StepperExample />
        <TabsExample />
        <DrawerExample />
        <DialogExample />
      </main>
    </div>
  );
}
