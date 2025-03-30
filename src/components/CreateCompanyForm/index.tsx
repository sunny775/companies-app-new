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
import { uploadFile } from "@/app/actions/files.actions";
import Button from "../Button";

interface FormData {
  basicInfo?: CompanyBasicInfo;
  address?: {
    registeredAddress?: BasicAddressInput;
    mailingAddress?: BasicAddressInput;
    isMailingAddressDifferent?: boolean;
  };
  contact?: Contact;
  files: FileList | null;
}

export default function CreateCompanyForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ files: null });

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
    <div key="5" className="flex flex-col gap-4 mb-8 mt-12">
      <Button onClick={handleBack} type="button">
        Back
      </Button>
      <Button variant="gradient" onClick={handleCreateCompany}>
        {loading ? "Loading..." : "Submit"}
      </Button>
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

    const input: UpdateCompanyInput = {
      ...formData.basicInfo,
      totalNumberOfEmployees: Number(
        formData.basicInfo?.totalNumberOfEmployees
      ),
      numberOfFullTimeEmployees: Number(
        formData.basicInfo?.numberOfFullTimeEmployees
      ),
      numberOfPartTimeEmployees: Number(
        formData.basicInfo?.numberOfPartTimeEmployees
      ),
      ...formData.address,
      primaryContactPerson: formData.contact,
    };

    if (!formData.files) return;
    try {
      const { data, error: uploadError } = await uploadFile(formData.files[0]);

      if (uploadError) throw uploadError;

      input.logoS3Key = data.s3Key;

      const { company, error } = await createCompany(input);

      if (error) throw error;

      // resetForm();
      console.log("Company Created!", company);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-surface p-6 my-12 shadow-md rounded-md">
      <ProgressBar step={step} />
      {steps[step]}
    </div>
  );
}
