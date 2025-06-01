import Label, { LabelProps } from "@/components/ui/atoms/Label";
import Textarea, { TextareaProps } from "@/components/ui/atoms/Textarea";
import cn from "@/lib/utils/cn";
import { splitCamelPascalCase } from "@/lib/utils/splitCamelCasePascalCase";
import { useId } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

export interface TextareaFieldProps<T extends FieldValues> extends TextareaProps {
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

export default function TextareaField<T extends FieldValues>({
  id,
  name,
  options,
  register,
  error,
  errorMessage,
  placeholder,
  labelProps,
  ...rest
}: TextareaFieldProps<T>) {
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
      <Textarea
        id={id}
        {...rest}
        rows={4}
        {...register(name, options)}
        placeholder={placeholder || splitCamelPascalCase(getNestedFieldName(name))}
        error={error}
      />
    </>
  );
}
