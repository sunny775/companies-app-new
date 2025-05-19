"use client";

import { updateCompany } from "@/app/actions/companies.actions";
import Alert from "@/components/atoms/Alert";
import Button from "@/components/atoms/Button";
import Dialog from "@/components/atoms/Dialog";
import IconButton from "@/components/atoms/IconButton";
import Spinner from "@/components/atoms/loaders/Spinner";
import { useToast } from "@/components/atoms/Toast";
import LogoUploadForm from "@/components/molecules/Forms/LogoUploadForm";
import { Company } from "@/lib/graphql/types";
import { Edit } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setCompany: Dispatch<SetStateAction<Company>>;
  company: Company;
}

export const EditLogoDialog = ({ setCompany, company }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

   const toast = useToast();

  async function handleUpdateCompany(files: FileList | null) {
    setLoading(true);

    if (!files) return;

    try {
      const { company: data, error } = await updateCompany(company, files[0]);

      if (error) throw error;

      if (data) {
        setCompany((prev) => {
          return { ...prev, ...data };
        });
      }

      toast.success("Company Update3d Successfully!")

      setIsOpen(false);

    } catch (error) {
      console.log(error);
      setErrorMessage(() => (error instanceof Error ? error.message : "Error creating company"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <IconButton onClick={openDialog} className="absolute -top-2 -right-2 bg-surface/80 border border-border">
        <Edit size={15} />
      </IconButton>

      <Dialog
        open={isOpen}
        onClose={closeDialog}
        size="xl"
        aria-labelledby="dialog-title"
        className="border border-border/50"
      >
        <Dialog.Header id="dialog-title">Upload New Logo</Dialog.Header>
        <Dialog.Body divider>
          <Alert variant="error" open={!!errorMessage} onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
          <LogoUploadForm defaultValue={null} onSubmit={(files: FileList | null) => handleUpdateCompany(files)}>
            <Button
              type="submit"
              variant="gradient"
              disabled={loading}
              className="flex items-center justify-center gap-2"
            >
              {loading && <Spinner className="fill-white size-4" />} {loading ? "Uploading" : "Upload"}
            </Button>
          </LogoUploadForm>
        </Dialog.Body>
        <Dialog.Footer className="gap-2">
          <Button onClick={closeDialog}>Cancel</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};
