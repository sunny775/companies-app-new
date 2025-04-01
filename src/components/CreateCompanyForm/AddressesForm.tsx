import { BasicAddressInput } from "@/lib/graphql/types";
import { useForm } from "react-hook-form";
import Button from "../Button";
import FormField, { InputType } from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicAddressSchema } from "./schema";
import { z } from "zod";
import { useEffect } from "react";

export const formDataSchema = z.object({
  isMailingAddressDifferentFromRegisteredAddress: z.boolean().optional(),
  registeredAddress: basicAddressSchema,
  mailingAddress: basicAddressSchema.optional(),
});

type FormData = z.infer<typeof formDataSchema>;

interface Props {
  onSubmit: (data: FormData) => void;
  children?: React.ReactNode;
  defaultValues?: FormData;
  isMailingAddressDifferent: boolean;
}

const addressFields: { name: keyof BasicAddressInput; type: InputType }[] = [
  { name: "country", type: "text" },
  { name: "state", type: "text" },
  { name: "city", type: "text" },
  { name: "street", type: "text" },
  { name: "zipCode", type: "text" },
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
    resetField,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(formDataSchema),
  });

  const isMailingAddressDifferent = watch(
    "isMailingAddressDifferentFromRegisteredAddress"
  );

  useEffect(() => {
    if (!isMailingAddressDifferent) {
      resetField("mailingAddress");
    }
  }, [isMailingAddressDifferent, resetField]);

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
        <legend className="text-lg font-semibold uppercase mb-8 mt-12">
          Registered Address
        </legend>
        {addressFields.map((field) => (
          <FormField
            key={`registeredAddress.${field.name}`}
            name={`registeredAddress.${field.name}`}
            type={field.type}
            register={register}
            error={!!errors.registeredAddress?.[field.name]}
            errorMessage={errors.registeredAddress?.[field.name]?.message}
          />
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
          <legend className="text-lg font-semibold uppercase mb-8 mt-12">
            Mailing Address
          </legend>

          {addressFields.map((field) => (
            <FormField
              key={`mailingAddress.${field.name}`}
              name={`mailingAddress.${field.name}`}
              type={field.type}
              register={register}
              error={!!errors.mailingAddress?.[field.name]}
              errorMessage={errors.mailingAddress?.[field.name]?.message}
            />
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
