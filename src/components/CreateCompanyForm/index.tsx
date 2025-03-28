"use client";
import { useState } from "react";
import ProgressBar from "./FormProgress";
import Step1CompanyDetails from "./Step1CompanyDetails";
import Step2Address from "./Step2Address";
import Step3Contact from "./Step3Contact";
import Step4UploadLogo from "./Step4UploadLogo";
import {
  BasicAddressInput,
  CompanyBasicInfo,
  Contact,
  UpdateCompanyInput,
} from "@/lib/graphql/types";
import { createCompany } from "@/app/actions/companies.actions";
import { uploadFile } from "@/app/actions/files.actions";

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
    <Step1CompanyDetails
      key="1"
      onNext={(data: CompanyBasicInfo) => handleNext("basicInfo", data)}
      onBack={handleBack}
      defaultValues={formData.basicInfo}
    />,
    <Step2Address
      key="2"
      onNext={(data: FormData["address"]) => handleNext("address", data)}
      onBack={handleBack}
      defaultValues={formData.address}
      isMailingAddressDifferent
    />,
    <Step3Contact
      key="3"
      onNext={(data: Contact) => handleNext("contact", data)}
      onBack={handleBack}
      defaultValues={formData.contact}
    />,
    <Step4UploadLogo
      key="4"
      onNext={(data: FileList | null) => handleNext("files", data)}
      onBack={handleBack}
      defaultValue={formData.files}
    />,
    <div key="5">
      <button onClick={handleBack} type="button">
        Back
      </button>
      <button
        onClick={handleCreateCompany}
        className="bg-blue-500 text-white p-2"
      >
        {loading ? "Loading..." : "Submit"}
      </button>
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
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-600 p-6 my-8 shadow-md">
      <ProgressBar step={step} />
      {steps[step]}
    </div>
  );
}
