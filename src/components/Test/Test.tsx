"use client";

import { buttonStyles } from "@/components/Button";
import cn from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Combobox from "../molecules/Combobox";
import { data } from "./data";

// const data = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Purple", "Pink", "Maroon", "Black", "White"];

export function Test() {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const items = data.filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase()));

  return (
    <div>
      <main className="flex flex-col  gap-[32px] items-center justify-center">
        <Link href={"/companies"} className={cn(buttonStyles({ variant: "gradient" }))}>
          Go to Companies List
        </Link>

        <div className="w-72 my-4">
          <Select
            placeholder="Select Color"
            value={value}
            onChange={(v) => {
              console.log(v);
              setValue(v);
            }}
          >
            {items.map((option, i) => (
              <Select.Option key={i + option} index={i} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
          <Input id="test name" name="Name" placeholder="Name" showLabel icon={<ChevronDown strokeWidth={1} />} />
        </div>

        <div className="w-72 my-4">
          <Combobox
            showLabel
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSelect={(v) => {
              console.log(v);
              setValue(v);
            }}
            id="colors select"
            name="Select Color"
            items={items}
          >
            {items.map((option, i) => (
              <Combobox.Item key={i + option} value={option}>
                {option}
              </Combobox.Item>
            ))}
          </Combobox>
        </div>
      </main>
    </div>
  );
}
