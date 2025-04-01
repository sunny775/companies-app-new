"use client";
import { useState } from "react";
import ProgressBar from "./FormProgress";
import CompanyDetailsForm from "./CompanyDetailsForm";
import AddressesForm from "./AddressesForm";
import ContactForm from "./ContactForm";
import LogoUploadForm from "./LogoUploadForm";
import {
  BasicAddressInput,
  CompanyBasicInfo,
  Contact,
  UpdateCompanyInput,
} from "@/lib/graphql/types";
import { createCompany } from "@/app/actions/companies.actions";
import Button from "../Button";
import Spinner from "../loaders/Spinner";

interface FormData {
  basicInfo?: CompanyBasicInfo;
  address?: {
    registeredAddress: BasicAddressInput;
    mailingAddress?: BasicAddressInput;
    isMailingAddressDifferent?: boolean;
  };
  contact?: Contact;
  files: FileList | null;
}

function normalizeInputs(formData: FormData) {
  const input: UpdateCompanyInput = {
    ...formData.basicInfo,
    totalNumberOfEmployees: Number(formData.basicInfo?.totalNumberOfEmployees),
    numberOfFullTimeEmployees: Number(
      formData.basicInfo?.numberOfFullTimeEmployees
    ),
    numberOfPartTimeEmployees: Number(
      formData.basicInfo?.numberOfPartTimeEmployees
    ),
    ...formData.address,
    primaryContactPerson: formData.contact,
  };
  return input;
}

export default function CreateCompanyForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ files: null });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const steps = [
    <CompanyDetailsForm
      key="1"
      onSubmit={(data: CompanyBasicInfo) => handleNext("basicInfo", data)}
      defaultValues={formData.basicInfo}
    />,
    <AddressesForm
      key="2"
      onSubmit={(data: FormData["address"]) => handleNext("address", data)}
      defaultValues={formData.address}
      isMailingAddressDifferent
    >
      <Button onClick={handleBack} type="button" className="flex-1/2">
        Back
      </Button>
    </AddressesForm>,
    <ContactForm
      key="3"
      onSubmit={(data: Contact) => handleNext("contact", data)}
      defaultValues={formData.contact}
    >
      <Button onClick={handleBack} type="button" className="flex-1/2">
        Back
      </Button>
    </ContactForm>,
    <LogoUploadForm
      key="4"
      onSubmit={(data: FileList | null) => handleNext("files", data)}
      defaultValue={formData.files}
    >
      <Button onClick={handleBack} type="button" className="flex-1/2">
        Back
      </Button>
    </LogoUploadForm>,
    <div key="5" className="flex flex-col gap-4 mt-12 mb-8">
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
    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep((prev) => prev - 1);
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
        localStorage.companyIds = JSON.stringify([
          ...JSON.parse(companyIds || "[]"),
          company.id,
        ]);
      }
      // resetForm();
      console.log("Company Created!", company);
    } catch (error) {
      console.log(error);
      setErrorMessage(() =>
        error instanceof Error ? error.message : "Error creating company"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl p-6 mx-auto my-12 rounded-md shadow-md bg-surface">
      <ProgressBar step={step} />
      {steps[step]}
    </div>
  );
}
