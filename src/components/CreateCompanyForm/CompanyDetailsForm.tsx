import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../Button";
import { companyBasicInfoSchema } from "./schema";
import FormField, { InputType } from "./FormField";
import PhoneFormField from "../PhoneFormField";

type CompanyBasicInfo = z.infer<typeof companyBasicInfoSchema>;

interface Props {
  onSubmit: (data: CompanyBasicInfo) => void;
  children?: React.ReactNode;
  defaultValues?: CompanyBasicInfo;
}

const companyFields: { name: keyof CompanyBasicInfo; type: InputType }[] = [
  { name: "legalName", type: "text" },
  { name: "industry", type: "text" },
  { name: "stateOfIncorporation", type: "text" },
  { name: "totalNumberOfEmployees", type: "number" },
  { name: "numberOfFullTimeEmployees", type: "number" },
  { name: "numberOfPartTimeEmployees", type: "number" },
  { name: "website", type: "url" },
  { name: "linkedInCompanyPage", type: "url" },
  { name: "facebookCompanyPage", type: "url" },
  { name: "phone", type: "tel" },
  { name: "fax", type: "tel" },
  { name: "email", type: "email" },
  { name: "otherInformation", type: "textarea" },
];

export default function CompanyDetailsForm({
  onSubmit,
  defaultValues,
  children,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyBasicInfo>({
    defaultValues,
    resolver: zodResolver(companyBasicInfoSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="my-4 text-lg font-semibold uppercase">
        Basic Information
      </div>
      {companyFields.map((field) =>
        field.name === "phone" ? (
          <PhoneFormField key={field.name} />
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
      <div className="flex gap-2 my-4">
        {children}
        <Button type="submit" className="flex-1/2">
          Next
        </Button>
      </div>
    </form>
  );
}
