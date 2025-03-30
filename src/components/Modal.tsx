import { X } from "lucide-react";
import { memo, useEffect, useRef } from "react";
import Button from "./Button";

interface ModalProps {
  header: React.ReactNode;
  closeModal(): void;
  children?: React.ReactNode;
  open?: boolean;
  isDefaultOpen?: boolean;
}

const Modal = memo(
  ({ open, closeModal, isDefaultOpen, header, children }: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
      if (open || isDefaultOpen) {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
      }
    }, [open, isDefaultOpen]);

    return (
      <dialog
        ref={dialogRef}
        className="fixed top-20 left-1/2 -translate-x-1/2 bg-white dark:bg-white/5 backdrop:bg-black/5 p-2 rounded-lg shadow-lg backdrop:backdrop-blur-sm w-full max-w-3xl h-[calc(100vh-100px)] overflow-hidden"
        onClose={closeModal}
      >
        <div className="flex flex-col w-full p-4 h-full overflow-auto">
          <div className="flex w-full h-auto justify-center items-center">
            {header}
            <Button
              onClick={closeModal}
              className="w-8 h-8 px-0 bg-gray-400 dark:bg-white/20 rounded-full text-gray-100 dark:text-black/50 fixed top-3 right-3"
            >
              <span className="sr-only">Close Modal</span>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {children}
        </div>
      </dialog>
    );
  }
);

Modal.displayName = "modal";

export default Modal;