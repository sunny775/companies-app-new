"use client";
import { createCompany } from "@/app/actions/companies.actions";
import Alert from "@/components/atoms/Alert";
import Button from "@/components/atoms/Button";
import Dialog from "@/components/atoms/Dialog";
import Spinner from "@/components/atoms/loaders/Spinner";
import { useToast } from "@/components/atoms/Toast";
import CompanyPreview from "@/components/view/CompanyPreview";
import { UpdateCompanyInput } from "@/lib/graphql/types";
import { validateSchema } from "@/lib/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import AddressesForm from "../Forms/AddressesForm";
import CompanyDetailsForm from "../Forms/CompanyDetailsForm";
import ContactForm from "../Forms/ContactForm";
import { FormProgress } from "../Forms/FormProgress";
import LogoUploadForm from "../Forms/LogoUploadForm";
import {
  FormAddress,
  FormCompanyBasicInfo,
  FormContact,
  createCompanySchema,
} from "../Forms/schema/createCompany.schema";

interface FormData extends Partial<z.infer<typeof createCompanySchema>> {
  files: FileList | null;
}

function validateAndFormatFormData(formData: FormData) {
  const { data, errors } = validateSchema(createCompanySchema, formData);
  if (errors) return { errors };
  const {
    basicInfo: { dialCode: basicInfoDialCode, phone: basicInfoPhone, ...basicInfo },
    address,
    contact: { dialCode: contactDialCode, phone: contactPhone, ...contact },
  } = data;
  const input: UpdateCompanyInput = {
    ...basicInfo,
    phone: basicInfoDialCode + basicInfoPhone,
    ...address,
    primaryContactPerson: { ...contact, phone: contactDialCode + contactPhone },
  };
  return { input };
}

export function CreateCompanyDialog() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ files: null });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const toast = useToast();

  const steps = [
    <CompanyDetailsForm
      key="1"
      onSubmit={(data: FormCompanyBasicInfo) => handleNext("basicInfo", data)}
      defaultValues={formData.basicInfo}
    >
      <Button type="submit">Next</Button>
    </CompanyDetailsForm>,
    <AddressesForm
      key="2"
      onSubmit={(data: FormAddress) => handleNext("address", data)}
      defaultValues={formData.address}
      isMailingAddressDifferent
    >
      <Button onClick={handleBack} type="button">
        Back
      </Button>
      <Button type="submit">Next</Button>
    </AddressesForm>,
    <ContactForm key="3" onSubmit={(data: FormContact) => handleNext("contact", data)} defaultValues={formData.contact}>
      <Button onClick={handleBack} type="button">
        Back
      </Button>
      <Button type="submit">Next</Button>
    </ContactForm>,
    <LogoUploadForm
      key="4"
      onSubmit={(data: FileList | null) => handleNext("files", data)}
      defaultValue={formData.files}
    >
      <Button onClick={handleBack} type="button">
        Back
      </Button>
      <Button type="submit">Next</Button>
    </LogoUploadForm>,
    <div key="5" className="mt-12 mb-8 flex flex-col gap-4">
      <CompanyPreview data={formData} />
      <div className="flex gap-2 justify-end">
        <Button onClick={handleBack} type="button" disabled={loading}>
          Back
        </Button>
        <Button
          variant="gradient"
          disabled={loading}
          onClick={handleCreateCompany}
          className="flex items-center justify-center gap-2"
        >
          {loading && <Spinner className="fill-white size-4" />} {loading ? "Submitting" : "Submit"}
        </Button>
      </div>
      <Alert variant="error" open={!!errorMessage} onClose={() => setErrorMessage(null)}>
        {errorMessage}
      </Alert>
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

  async function handleCreateCompany() {
    setLoading(true);
    console.log(formData);

    if (!formData.files) return;

    const { input, errors } = validateAndFormatFormData(formData);

    if (errors) {
      console.log(errors);
      return;
    }
    try {
      const { company, error } = await createCompany(input, formData.files[0]);

      if (error) throw error;

      if (company) {
        // const companyIds = localStorage.companyIds;
        // localStorage.companyIds = JSON.stringify([...JSON.parse(companyIds || "[]"), company.id]);
      }

       toast.success("Company Created Successfully!")

      setIsOpen(false);
      console.log("Company Created!", company);
    } catch (error) {
      console.log(error);
      setErrorMessage(() => (error instanceof Error ? error.message : "Error creating company"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={openDialog} className="flex items-center gap-2">
        <Plus className="w-5 h-5 mr-2" />
        Add Company
      </Button>

      <Dialog
        open={isOpen}
        onClose={closeDialog}
        size="xl"
        aria-labelledby="dialog-title"
        className="border border-border/50"
      >
        <Dialog.Header id="dialog-title">Add Company</Dialog.Header>
        <Dialog.Body divider>
          <FormProgress
            steps={[...Array(steps.length).keys()]}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setIsLastStep={setIsLastStep}
            setIsFirstStep={setIsFirstStep}
          />
          {steps[activeStep]}
        </Dialog.Body>
        <Dialog.Footer className="gap-2">
          <Button onClick={closeDialog}>Cancel</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}
