"use client";
import { createCompany } from "@/app/actions/companies.actions";
import { BasicAddressInput, CompanyBasicInfo, Contact, UpdateCompanyInput } from "@/lib/graphql/types";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import Spinner from "../atoms/loaders/Spinner";
import AddressesForm from "./AddressesForm";
import CompanyDetailsForm from "./CompanyDetailsForm";
import ContactForm from "./ContactForm";
import { FormProgress } from "./FormProgress";
import LogoUploadForm from "./LogoUploadForm";

interface FormData {
  basicInfo?: CompanyBasicInfo & { dialCode: string };
  address?: {
    registeredAddress: BasicAddressInput;
    mailingAddress?: BasicAddressInput;
    isMailingAddressDifferent?: boolean;
  };
  contact?: Contact & { dialCode: string };
  files: FileList | null;
}

function normalizeInputs(formData: FormData) {
  const input: UpdateCompanyInput = {
    ...formData.basicInfo,
    phone: formData.basicInfo?.dialCode || "" + formData.basicInfo?.phone || "",
    totalNumberOfEmployees: Number(formData.basicInfo?.totalNumberOfEmployees),
    numberOfFullTimeEmployees: Number(formData.basicInfo?.numberOfFullTimeEmployees),
    numberOfPartTimeEmployees: Number(formData.basicInfo?.numberOfPartTimeEmployees),
    ...formData.address,
    primaryContactPerson: formData.contact,
  };
  return input;
}

export default function CreateCompanyForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ files: null });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const steps = [
    <CompanyDetailsForm
      key="1"
      onSubmit={(data: CompanyBasicInfo & { dialCode: string }) => handleNext("basicInfo", data)}
      defaultValues={formData.basicInfo}
    />,
    <AddressesForm
      key="2"
      onSubmit={(data: FormData["address"]) => handleNext("address", data)}
      defaultValues={formData.address}
      isMailingAddressDifferent
    >
      <Button onClick={handleBack} type="button">
        Back
      </Button>
    </AddressesForm>,
    <ContactForm
      key="3"
      onSubmit={(data: Contact & { dialCode: string }) => handleNext("contact", data)}
      defaultValues={formData.contact}
    >
      <Button onClick={handleBack} type="button">
        Back
      </Button>
    </ContactForm>,
    <LogoUploadForm
      key="4"
      onSubmit={(data: FileList | null) => handleNext("files", data)}
      defaultValue={formData.files}
    >
      <Button onClick={handleBack} type="button">
        Back
      </Button>
    </LogoUploadForm>,
    <div key="5" className="flex gap-2 mt-12 mb-8 justify-end">
      <Button onClick={handleBack} type="button">
        Back
      </Button>
      <Button variant="gradient" onClick={handleCreateCompany}>
        {loading ? <Spinner className="fill-white size-6" /> : "Submit"}
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </div>,
  ];

  function handleNext<T extends keyof FormData>(key: T, value: FormData[T]) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (!isLastStep) {
      setActiveStep((prev) => prev + 1);
    }
  }

  function handleBack() {
    if (!isFirstStep) {
      setActiveStep((prev) => prev - 1);
    }
  }

  function resetForm() {
    setFormData({ files: null });
  }
  async function handleCreateCompany() {
    setLoading(true);
    console.log(formData);

    if (!formData.files) return;

    const input = normalizeInputs(formData);
    try {
      const { company, error } = await createCompany(input, formData.files[0]);

      if (error) throw error;

      if (company) {
        const companyIds = localStorage.companyIds;
        localStorage.companyIds = JSON.stringify([...JSON.parse(companyIds || "[]"), company.id]);
      }
      // resetForm();
      console.log("Company Created!", company);
    } catch (error) {
      console.log(error);
      setErrorMessage(() => (error instanceof Error ? error.message : "Error creating company"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl p-6 mx-auto my-12 rounded-md shadow-md bg-surface">
      <FormProgress
        steps={[...Array(steps.length).keys()]}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setIsLastStep={setIsLastStep}
        setIsFirstStep={setIsFirstStep}
      />
      {steps[activeStep]}
    </div>
  );
}
