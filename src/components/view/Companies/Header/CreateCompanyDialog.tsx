"use client";

import Button from "@/components/atoms/Button";
import Dialog from "@/components/atoms/Dialog";
import CreateCompanyForm from "@/components/molecules/Forms/CreateCompanyForm";
import { Plus } from "lucide-react";
import { useState } from "react";

export const CreateCompanyDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

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
          <CreateCompanyForm />
        </Dialog.Body>
        <Dialog.Footer className="gap-2">
          <Button onClick={closeDialog}>Cancel</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};
