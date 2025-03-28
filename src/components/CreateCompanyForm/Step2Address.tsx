import cn from "@/lib/cn";
import { BasicAddressInput } from "@/lib/graphql/types";
import { useForm } from "react-hook-form";

type FormData = {
  isMailingAddressDifferentFromRegisteredAddress?: boolean;
  registeredAddress?: BasicAddressInput;
  mailingAddress?: BasicAddressInput; // Optional if not different
};

interface Props {
  onNext: (data: FormData) => void;
  onBack(): void;
  defaultValues?: FormData;
  isMailingAddressDifferent: boolean;
}

const splitCamelPascalCase = (str: string): string => {
  const result = str.replace(/([a-zA-Z])([A-Z])/g, "$1 $2");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const keys: Array<keyof BasicAddressInput> = [
  "country",
  "state",
  "city",
  "street",
  "zipCode",
];

export default function Step2Address({ onNext, defaultValues, onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  });

  const isMailingAddressDifferent = watch("isMailingAddressDifferentFromRegisteredAddress");

  const onSubmit = (data: FormData) => {
    // If mailing address is not different, copy registeredAddress
    if (!data.isMailingAddressDifferentFromRegisteredAddress) {
      data.mailingAddress = data.registeredAddress;
    }
    onNext(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold">Registered Address</legend>
        {keys.map((key) => (
          <label key={key} className="flex flex-col gap-2 my-2">
            {splitCamelPascalCase(key)}:
            <input
              {...register(`registeredAddress.${key}`, { required: false })}
              placeholder={splitCamelPascalCase(key)}
              className={cn("border p-2", {
                "border-red-600": errors.registeredAddress?.[key],
              })}
            />
          </label>
        ))}
      </fieldset>
      <label>
        <input type="checkbox" {...register("isMailingAddressDifferentFromRegisteredAddress")} />
        Is mailing address is different from registered address ?
      </label>

      {isMailingAddressDifferent && (
        <fieldset className="flex flex-col gap-4">
          <legend className="text-lg font-semibold">Mailing Address</legend>

          {keys.map((key) => (
            <label key={key} className="flex flex-col gap-2 my-2">
             {splitCamelPascalCase(key)}:
              <input
                {...register(`mailingAddress.${key}`, { required: false })}
                placeholder={splitCamelPascalCase(key)}
                className={cn("border p-2", {
                  "border-red-600": errors.mailingAddress?.[key],
                })}
              />
            </label>
          ))}
        </fieldset>
      )}
      <button onClick={onBack} type="button">
        Back
      </button>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Next
      </button>
    </form>
  );
}
