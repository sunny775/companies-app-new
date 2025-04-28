import { useForm } from "react-hook-form";
import { z } from "zod";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { ReactNode } from "react";
import cn from "@/lib/cn";

// Import your components
import Button from "@/components/atoms/Button";
import FormField, { InputType } from "./FormField";
import PhoneFormField from "../PhoneFormField";

// Create a FormContext to share form state
import { createContext, useContext } from "react";

// Generic form context type
interface FormContextType<T extends FieldValues> {
  form: UseFormReturn<T>;
  schema?: z.ZodType<T>;
}

const FormContext = createContext<FormContextType<any> | null>(null);

// Helper hook to access form context
function useFormContext<T extends FieldValues>() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Form components must be used within a Form component");
  }
  return context as FormContextType<T>;
}

// Main Form component
interface FormProps<T extends FieldValues> {
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
  children: ReactNode;
  schema?: z.ZodType<T>;
  resolver?: any; // zodResolver or other resolver
  className?: string;
}

function Form<T extends FieldValues>({
  onSubmit,
  defaultValues,
  children,
  schema,
  resolver,
  className,
}: FormProps<T>) {
  const form = useForm<T>({
    defaultValues: defaultValues as T,
    resolver: resolver,
  });

  return (
    <FormContext.Provider value={{ form, schema }}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

// Form.Head component
interface HeadProps {
  children: ReactNode;
  className?: string;
}

function Head({ children, className }: HeadProps) {
  return (
    <div className={cn("my-4 text-lg font-semibold uppercase", className)}>
      {children}
    </div>
  );
}

// Form.Fields component for grouping fields
interface FieldsProps {
  children: ReactNode;
  className?: string;
}

function Fields({ children, className }: FieldsProps) {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
}

// Form.Field component (wrapper around your FormField)
interface FieldProps<T extends FieldValues> {
  name: keyof T & string;
  type: InputType;
  placeholder?: string;
  options?: any;
  className?: string;
}

function Field<T extends FieldValues>({
  name,
  type,
  placeholder,
  options,
  className,
}: FieldProps<T>) {
  const { form } = useFormContext<T>();
  const { register, resetField, formState } = form;
  const { errors } = formState;

  if (type === "tel" && name === "phone") {
    return (
      <PhoneFormField
        key={name as string}
        name={name as string}
        register={register}
        error={!!errors[name]}
        errorMessage={errors[name]?.message as string}
        reset={(field: keyof T) => resetField(field as any)}
        className={className}
      />
    );
  }

  return (
    <FormField
      key={name as string}
      name={name as string}
      type={type}
      register={register}
      error={!!errors[name]}
      errorMessage={errors[name]?.message as string}
      placeholder={placeholder}
      options={options}
      className={className}
    />
  );
}

// Form.Actions component
interface ActionsProps {
  children: ReactNode;
  className?: string;
}

function Actions({ children, className }: ActionsProps) {
  return <div className={cn("flex gap-2 my-4", className)}>{children}</div>;
}

// Form.Submit component (a wrapper around Button)
interface SubmitProps {
  children: ReactNode;
  className?: string;
}

function Submit({ children, className }: SubmitProps) {
  return (
    <Button type="submit" className={cn("flex-1", className)}>
      {children}
    </Button>
  );
}

// Attach subcomponents to Form
Form.Head = Head;
Form.Fields = Fields;
Form.Field = Field;
Form.Actions = Actions;
Form.Submit = Submit;

export default Form;