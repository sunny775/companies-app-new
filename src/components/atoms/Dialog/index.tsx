import { DialogBody, DialogBodyProps } from "./DialogBody";
import { DialogFooter, DialogFooterProps } from "./DialogFooter";
import { DialogHeader, DialogHeaderProps } from "./DialogHeader";
import { DialogProps, DialogRoot } from "./DialogRoot";

export { useDialog, type DialogContextType } from "./DialogContext";

const Dialog = Object.assign(DialogRoot, {
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});

export default Dialog;

export { DialogRoot as Dialog, DialogBody, DialogFooter, DialogHeader };

export type { DialogBodyProps, DialogFooterProps, DialogHeaderProps, DialogProps };
