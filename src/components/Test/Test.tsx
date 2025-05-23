"use client";

import { useState } from "react";
import DialogExample from "../atoms/Dialog/Dialog.Example";
import DrawerExample from "../atoms/Drawer/Drawer.Example";
import MenuExample from "../atoms/Menu/Menu.Example";
import Select from "../atoms/Select";
import { StepperExample } from "../atoms/Stepper/Stepper.Example";
import { TabsExample } from "../atoms/Tabs/Tabs.Example";
import { ToastExample } from "../atoms/Toast/Toast.Example";
import { data } from "./data";

// const data = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Purple", "Pink", "Maroon", "Black", "White"];

export function Test() {
  const [value, setValue] = useState<string>();
  const [query, setQuery] = useState("");

  const options = data.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <main className="flex flex-col  gap-[32px] items-center justify-center">
        <ToastExample />
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
