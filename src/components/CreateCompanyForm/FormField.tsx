import cn from "@/lib/cn";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Input from "../Input";
import Textarea from "../Textarea";
import { splitCamelPascalCase } from "@/lib/splitCamelCasePascalCase";

export type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "textarea";

export interface FormFieldProps<T extends FieldValues> {
  type: InputType;
  name: Path<T>;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  options?: RegisterOptions<T, Path<T>>;
}

export const getNestedFieldName = (name: string) => {
  const nameArr = name.split(".");
  return nameArr[nameArr.length - 1];
};

export default function FormField<T extends FieldValues>({
  name,
  type,
  options,
  register,
  error,
  errorMessage,
  placeholder,
}: FormFieldProps<T>) {
  return (
    <label key={name} className={cn("flex flex-col gap-2")}>
      <div className="flex items-center gap-2">
        <span>{splitCamelPascalCase(getNestedFieldName(name))}</span>
        <p
          className={cn("invisible text-amber-600 text-xs font-extralight", {
            visible: error,
          })}
        >
          {errorMessage}
        </p>
      </div>
      {type === "textarea" ? (
        <Textarea
          rows={4}
          {...register(name, options)}
          placeholder={placeholder || splitCamelPascalCase(getNestedFieldName(name))}
          className={cn({
            "border-red-600/30 dark:border-red-500/20": error,
          })}
        />
      ) : (
        <Input
          type={type}
          {...register(name, {
            ...options,
            setValueAs: (v) => (type === "number" ? Number(v) : v),
          })}
          placeholder={placeholder || splitCamelPascalCase(getNestedFieldName(name))}
          className={cn({
            "border-red-600/30 dark:border-red-500/20": error,
          })}
        />
      )}
    </label>
  );
}
