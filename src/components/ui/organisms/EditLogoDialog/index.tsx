"use client";

import { uploadFile } from "@/app/actions/upload.actions";
import Alert from "@/components/ui/atoms/Alert";
import Button from "@/components/ui/atoms/Button";
import Dialog from "@/components/ui/atoms/Dialog";
import IconButton from "@/components/ui/atoms/IconButton";
import Spinner from "@/components/ui/atoms/loaders/Spinner";
import { useToast } from "@/components/ui/atoms/Toast";
import LogoUploadForm from "@/components/ui/organisms/Forms/LogoUploadForm";
import { UPDATE_COMPANY } from "@/lib/graphql/mutations";
import { GET_COMPANY } from "@/lib/graphql/queries";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { Edit } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const EditLogoDialog = () => {
  const params = useParams<{ companyId: string }>();
  const {
    data: { company },
  } = useSuspenseQuery(GET_COMPANY, { variables: { id: params.companyId } });

  const [updateCompany, { error }] = useMutation(UPDATE_COMPANY);

  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  async function handleUpdateCompany(files: FileList | null) {
    if (!files) return;

    try {
      setLoading(true);
      setErrorMessage(null);
      const { data: uploadResponse, error: uploadError } = await uploadFile(files[0]);

      if (uploadError) throw uploadError;

      const { id, ...updateCompanyInput } = company;

      await updateCompany({
        variables: { companyId: id, input: { ...updateCompanyInput, logoS3Key: uploadResponse?.s3Key } },
        update: (cache, { data: mutationData }) => {
          if (mutationData?.updateCompany) {
            cache.writeQuery({
              query: GET_COMPANY,
              data: {
                company: {
                  ...company,
                  ...mutationData.updateCompany.company,
                },
              },
              variables: {
                id: company.id,
              },
            });
          }
        },
      });

      if (error) throw error;

      toast.success("Company Updated Successfully!");

      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(() => (error instanceof Error ? error.message : "Error updating company"));
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
