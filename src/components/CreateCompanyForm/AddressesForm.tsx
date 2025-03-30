import cn from "@/lib/cn";
import { BasicAddressInput } from "@/lib/graphql/types";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";

type FormData = {
  isMailingAddressDifferentFromRegisteredAddress?: boolean;
  registeredAddress?: BasicAddressInput;
  mailingAddress?: BasicAddressInput;
};

interface Props {
  onSubmit: (data: FormData) => void;
  children?: React.ReactNode;
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

export default function AddressesForm({
  onSubmit,
  defaultValues,
  children,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  });

  const isMailingAddressDifferent = watch(
    "isMailingAddressDifferentFromRegisteredAddress"
  );

  const _onSubmit = (data: FormData) => {
    // If mailing address is not different, copy registeredAddress
    if (!data.isMailingAddressDifferentFromRegisteredAddress) {
      data.mailingAddress = data.registeredAddress;
    }
    onSubmit(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold uppercase mb-8 mt-12">Registered Address</legend>
        {keys.map((key) => (
          <label key={key} className={cn("flex flex-col gap-2")}>
            <div className="flex items-center gap-2">
              <span>{splitCamelPascalCase(key)}</span>
              <p
                className={cn(
                  "invisible text-amber-600 text-xs font-extralight",
                  {
                    visible: !!errors.registeredAddress?.[key],
                  }
                )}
              >
                This field is required*
              </p>
            </div>
            <Input
              {...register(`registeredAddress.${key}`, { required: true })}
              placeholder={splitCamelPascalCase(key)}
              className={cn({
                "border-red-600/30 dark:border-red-500/20":
                  !!errors.registeredAddress?.[key],
              })}
            />
          </label>
        ))}
      </fieldset>
      <div className="my-8">
        <input
          type="checkbox"
          id="isMailingAdressDifferent"
          {...register("isMailingAddressDifferentFromRegisteredAddress")}
        />
        <label htmlFor="isMailingAdressDifferent" className="ml-2">
          Is mailing address is different from registered address ?
        </label>
      </div>

      {isMailingAddressDifferent && (
        <fieldset className="flex flex-col gap-4">
          <legend className="text-lg font-semibold uppercase mb-8 mt-12">Mailing Address</legend>

          {keys.map((key) => (
            <label key={key} className={cn("flex flex-col gap-2")}>
              <div className="flex items-center gap-2">
                <span>{splitCamelPascalCase(key)}</span>
                <p
                  className={cn(
                    "invisible text-amber-600 text-xs font-extralight",
                    {
                      visible: !!errors.mailingAddress?.[key],
                    }
                  )}
                >
                  This field is required*
                </p>
              </div>
              <Input
                {...register(`mailingAddress.${key}`, { required: true })}
                placeholder={splitCamelPascalCase(key)}
                className={cn({
                  "border-red-600/30 dark:border-red-500/20":
                    !!errors.mailingAddress?.[key],
                })}
              />
            </label>
          ))}
        </fieldset>
      )}
      <div className="flex gap-2 my-4">
        {children}
        <Button type="submit" className="flex-1/2">
          Next
        </Button>
      </div>
    </form>
  );
}
