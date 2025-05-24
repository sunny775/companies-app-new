import FormField, { InputType } from "@/components/molecules/FormField/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneFormField from "../../molecules/FormField/PhoneField";
import { FormContact as Contact, contactSchema } from "./schema/createCompany.schema";

interface Props {
  onSubmit: (data: Contact) => void;
  children: React.ReactNode;
  defaultValues?: Contact;
}

const contactFields: { name: keyof Contact; type: InputType }[] = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "phone", type: "tel" },
  { name: "email", type: "email" },
];

export default function ContactForm({ onSubmit, defaultValues, children }: Props) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    defaultValues,
    resolver: zodResolver(contactSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-4">
        <legend className="mt-12 mb-8 text-lg font-semibold uppercase">Contact Person</legend>
        {contactFields.map((field) =>
          field.name === "phone" ? (
            <PhoneFormField
              key={field.name}
              name={field.name}
              register={register}
              error={!!errors[field.name]}
              errorMessage={errors[field.name]?.message}
              dialCodeError={!!errors.dialCode}
              dialCodeErrorMessage={errors.dialCode?.message}
              setDialCode={(value: string) => setValue("dialCode", value, { shouldValidate: true })}
              dialCode={defaultValues?.dialCode}
            />
          ) : (
            <FormField
              key={field.name}
              name={field.name}
              type={field.type}
              register={register}
              error={!!errors[field.name]}
              errorMessage={errors[field.name]?.message}
            />
          )
        )}
      </fieldset>
      <div className="flex gap-2 my-4 justify-end">{children}</div>
    </form>
  );
}
