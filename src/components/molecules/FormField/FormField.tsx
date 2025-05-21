import Input, { InputProps } from "@/components/atoms/Input";
import Label, { LabelProps } from "@/components/atoms/Label";
import cn from "@/lib/utils/cn";
import { splitCamelPascalCase } from "@/lib/utils/splitCamelCasePascalCase";
import { useId } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

export type InputType = "text" | "number" | "email" | "password" | "tel" | "url" | "search" | "date";

export interface FormFieldProps<T extends FieldValues> extends InputProps {
  type: InputType;
  name: Path<T>;
  register: UseFormRegister<T>;
  options?: RegisterOptions<T, Path<T>>;
  errorMessage?: string;
  labelProps?: LabelProps;
}

export const getNestedFieldName = (name: string) => {
  const nameArr = name.split(".");
  return nameArr[nameArr.length - 1];
};

export default function FormField<T extends FieldValues>({
  id,
  type,
  name,
  options,
  register,
  error,
  errorMessage,
  placeholder,
  labelProps,
  ...rest
}: FormFieldProps<T>) {
  const defaultId = useId();

  id = id ?? defaultId;
  error = error ?? !!errorMessage;

  return (
    <>
      <div className="flex items-center gap-2 mt-3">
        <Label htmlFor={id} {...labelProps}>
          {labelProps?.children || splitCamelPascalCase(getNestedFieldName(name))}
        </Label>
        <span
          className={cn("invisible text-amber-600 text-xs font-extralight", {
            visible: error,
          })}
        >
          {errorMessage}
        </span>
      </div>
      <Input
        id={id}
        {...rest}
        type={type}
        {...register(name, {
          ...options,
          setValueAs: (v) => (type === "number" ? Number(v) : v),
        })}
        placeholder={placeholder || splitCamelPascalCase(getNestedFieldName(name))}
        error={error}
      />
    </>
  );
}
