import cn from "@/lib/cn";
import { Contact } from "@/lib/graphql/types";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";

interface Props {
  onSubmit: (data: Contact) => void;
  children?: React.ReactNode
  defaultValues?: Contact;
}

const splitCamelPascalCase = (str: string): string => {
  const result = str.replace(/([a-zA-Z])([A-Z])/g, "$1 $2");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const keys: Array<keyof Contact> = ["firstName", "lastName", "email", "phone"];

export default function ContactForm({ onSubmit, defaultValues, children }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold uppercase mb-8 mt-12">Contact Person</legend>
        {keys.map((key) => (
          <label key={key} className={cn("flex flex-col gap-2")}>
          <div className="flex items-center gap-2">
            <span>{splitCamelPascalCase(key)}</span>
            <p
              className={cn("invisible text-amber-600 text-xs font-extralight", {
                visible: errors[key],
              })}
            >
              This field is required*
            </p>
          </div>
          <Input
            {...register(key, { required: true })}
            placeholder={splitCamelPascalCase(key)}
            className={cn({
              "border-red-600/30 dark:border-red-500/20": !!errors[key],
            })}
          />
        </label>
        ))}
      </fieldset>
      <div className="flex gap-2 my-4">
        {children}
        <Button type="submit" className="flex-1/2">
          Next
        </Button>
      </div>
    </form>
  );
}
