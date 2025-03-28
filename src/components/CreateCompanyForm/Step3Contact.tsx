import cn from "@/lib/cn";
import { Contact } from "@/lib/graphql/types";
import { useForm } from "react-hook-form";

interface Props {
  onNext: (data: Contact) => void;
  onBack(): void;
  defaultValues?: Contact;
}

const splitCamelPascalCase = (str: string): string => {
  const result = str.replace(/([a-zA-Z])([A-Z])/g, "$1 $2");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const keys: Array<keyof Contact> = ["firstName", "lastName", "email", "phone"];

export default function Step3Contact({ onNext, defaultValues, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
      <fieldset>
        <legend className="text-lg font-semibold">Contact Person</legend>
        {keys.map((key) => (
          <label key={key} className="flex flex-col gap-2 my-2">
            {splitCamelPascalCase(key)}:
            <input
              {...register(key, { required: false })}
              placeholder={splitCamelPascalCase(key)}
              className={cn("border p-2", {
                "border-red-600": !!errors[key],
              })}
            />
          </label>
        ))}
      </fieldset>
      <button onClick={onBack} type="button">
        Back
      </button>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Next
      </button>
    </form>
  );
}
