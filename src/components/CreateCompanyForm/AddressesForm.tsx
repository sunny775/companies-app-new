import Button from "@/components/atoms/Button";
import FormField, { InputType } from "@/components/molecules/Form/FormField";
import { BasicAddressInput } from "@/lib/graphql/types";
import useCountries from "@/lib/hooks/useCountries";
import useCountryStates from "@/lib/hooks/useStates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectField from "../molecules/Form/SelectField";
import { basicAddressSchema } from "./schema";

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
  { name: "city", type: "text" },
  { name: "street", type: "text" },
  { name: "zipCode", type: "text" },
];

export default function AddressesForm({ onSubmit, defaultValues, children }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(formDataSchema),
  });

  const isMailingAddressDifferent = watch("isMailingAddressDifferentFromRegisteredAddress");

  const registeredCountry = watch("registeredAddress.country");
  const mailingCountry = watch("mailingAddress.country");

  const { countries } = useCountries();
  const { countryStates: registeredCountryStates } = useCountryStates({ countryName: registeredCountry });
  const { countryStates: mailingCountryStates } = useCountryStates({ countryName: mailingCountry });

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
      <fieldset className="flex flex-col gap-2">
        <legend className="text-lg font-semibold uppercase mb-8 mt-12">Registered Address</legend>
        <SelectField
          key="registeredAddress.country"
          name="registeredAddress.country"
          value={defaultValues?.registeredAddress.country}
          error={!!errors.registeredAddress?.country}
          errorMessage={errors.registeredAddress?.country?.message}
          options={countries.map((country) => ({ value: country.name, label: country.name }))}
          onChange={(value) => {
            setValue("registeredAddress.country", value, { shouldValidate: true });
            resetField("registeredAddress.state");
          }}
        />
        {registeredCountryStates.length ? (
          <SelectField
            name="registeredAddress.state"
            value={defaultValues?.registeredAddress.state}
            onChange={(value: string) => setValue("registeredAddress.state", value, { shouldValidate: true })}
            error={!!errors.registeredAddress?.state}
            errorMessage={errors.registeredAddress?.state?.message}
            options={registeredCountryStates.map((state) => ({ value: state.name, label: state.name }))}
          />
        ) : (
          <FormField
            key="registeredAddress.state"
            name="registeredAddress.state"
            type="text"
            register={register}
            error={!!errors.registeredAddress?.state}
            errorMessage={errors.registeredAddress?.state?.message}
          />
        )}
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
        <fieldset className="flex flex-col gap-2">
          <legend className="text-lg font-semibold uppercase mb-8 mt-12">Mailing Address</legend>

          <SelectField
            key="mailingAddress.country"
            name="mailingAddress.country"
            value={defaultValues?.mailingAddress?.country}
            onChange={(value: string) => {
              setValue("mailingAddress.country", value, { shouldValidate: true });
              resetField("mailingAddress.state");
            }}
            error={!!errors.mailingAddress?.country}
            errorMessage={errors.mailingAddress?.country?.message}
            options={countries.map((country) => ({ value: country.name, label: country.name }))}
          />
          {mailingCountryStates.length ? (
            <SelectField
              name="mailingAddress.state"
              value={defaultValues?.mailingAddress?.state}
              onChange={(value: string) => setValue("mailingAddress.state", value, { shouldValidate: true })}
              error={!!errors.mailingAddress?.state}
              errorMessage={errors.mailingAddress?.state?.message}
              options={mailingCountryStates.map((state) => ({ value: state.name, label: state.name }))}
            />
          ) : (
            <FormField
              key="mailingAddress.state"
              name="mailingAddress.state"
              type="text"
              register={register}
              error={!!errors.mailingAddress?.state}
              errorMessage={errors.mailingAddress?.state?.message}
            />
          )}
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
