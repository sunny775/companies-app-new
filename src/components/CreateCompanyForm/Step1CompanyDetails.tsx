import cn from "@/lib/cn";
import { CompanyBasicInfo } from "@/lib/graphql/types";
import { useForm } from "react-hook-form";

interface Props {
  onNext: (data: CompanyBasicInfo) => void;
  onBack(): void;
  defaultValues?: CompanyBasicInfo;
}

const splitCamelPascalCase = (str: string): string => {
  const result = str.replace(/([a-zA-Z])([A-Z])/g, "$1 $2");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const keys: Array<keyof CompanyBasicInfo> = [
  "legalName",
  "industry",
  "stateOfIncorporation",
  "totalNumberOfEmployees",
  "numberOfFullTimeEmployees",
  "numberOfPartTimeEmployees",
  "website",
  "linkedInCompanyPage",
  "facebookCompanyPage",
  "phone",
  "fax",
  "email",
  "otherInformation",
];

export default function Step1CompanyDetails({
  onNext,
  defaultValues,
  onBack,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyBasicInfo>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
      {keys.map((key) => (
        <label
          key={key}
          className={cn("flex flex-col gap-2 my-2", {
            "text-red-600": !!errors[key],
          })}
        >
          {splitCamelPascalCase(key)} *
          <input
            {...register(key, { required: false })}
            placeholder={splitCamelPascalCase(key)}
            className={cn("border p-2", {
              "border-red-600": !!errors[key],
            })}
          />
        </label>
      ))}
      <button onClick={onBack} type="button">
        Back
      </button>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Next
      </button>
    </form>
  );
}
