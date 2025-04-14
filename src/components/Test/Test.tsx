"use client";

import { Option, Select } from "@/components/atoms/Select";
import { buttonStyles } from "@/components/Button";
import cn from "@/lib/cn";
import Link from "next/link";
import { useState } from "react";
import Input from "../atoms/Input";
import { ChevronDown } from "lucide-react";

export function Test() {
  const [value, setValue] = useState<string | null>(null);

  const options = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Purple", "Pink", "Maroon", "Black", "White"];
  return (
    <div>
      <main className="flex flex-col  gap-[32px] items-center justify-center">
        <Link href={"/companies"} className={cn(buttonStyles({ variant: "gradient" }))}>
          Go to Companies List
        </Link>
        <div className="w-72">
          <Select
            placeholder="Select Color"
            value={value}
            onChange={(v) => {
              console.log(v);
              setValue(v);
            }}
          >
            {options.map((option, i) => (
              <Option key={i + option} index={i} value={option}>
                {option}
              </Option>
            ))}
          </Select>
          <Input id="test name" as="textarea" name="Name" placeholder="Name" showLabel icon={<ChevronDown strokeWidth={1}/>} />
        </div>
       
      </main>
    </div>
  );
}
