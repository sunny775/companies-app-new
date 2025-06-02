"use client";
import { uploadFile } from "@/app/actions/upload.actions";
import Alert from "@/components/ui/atoms/Alert";
import Button from "@/components/ui/atoms/Button";
import Dialog from "@/components/ui/atoms/Dialog";
import Spinner from "@/components/ui/atoms/loaders/Spinner";
import { useToast } from "@/components/ui/atoms/Toast";
import CompanyPreview from "@/components/ui/views/CompanyPreview";
import { CREATE_COMPANY } from "@/lib/graphql/mutations";
import { Company, UpdateCompanyInput } from "@/lib/graphql/types";
import cn from "@/lib/utils/cn";
import { validateSchema } from "@/lib/utils/zod";
import { useMutation } from "@apollo/client";
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

interface CreateCompanyDialogProps {
  onCompanyCreated: (company: Company) => void;
  className?: string;
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

export function CreateCompanyDialog({ onCompanyCreated, className }: CreateCompanyDialogProps) {
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

  const [createCompany, { error }] = useMutation(CREATE_COMPANY);

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

  function resetForm() {
    setFormData({ files: null });
    setActiveStep(0);
  }

  async function handleCreateCompany() {
    if (!formData.files) return;

    const { input, errors } = validateAndFormatFormData(formData);

    if (errors) {
      console.log(errors);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const { data: uploadResponse, error: uploadError } = await uploadFile(formData.files[0]);

      if (uploadError) throw uploadError;

      await createCompany({
        variables: { input: { ...input, logoS3Key: uploadResponse.s3Key } },
        update: (cache, { data: mutationData }) => {
          if (mutationData?.createCompany) {
            onCompanyCreated(mutationData.createCompany.company);
          }
        },
      });

      if (error) throw error;

      toast.success("Company created successfully!");

      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.log(error);
      setErrorMessage(() => (error instanceof Error ? error.message : "Error creating company"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={openDialog} className={cn("flex items-center justify-center gap-2", className)}>
        <Plus className="w-5 h-5 mr-2" />
        Add Company
      </Button>

      <Dialog
        open={isOpen}
        onClose={closeDialog}
        size="xl"
        aria-labelledby="dialog-title"
        className="border border-border/50 bg-background"
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
