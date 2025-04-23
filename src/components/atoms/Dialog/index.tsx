import { DialogProps, Root } from "./Dialog";
import { DialogBody, DialogBodyProps } from "./DialogBody";
import { DialogFooter, DialogFooterProps } from "./DialogFooter";
import { DialogHeader, DialogHeaderProps } from "./DialogHeader";

export { useDialog, type DialogContextType } from "./DialogContext";

const Dialog = Object.assign(Root, {
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});

export default Dialog;

export { Root as Dialog, DialogBody, DialogFooter, DialogHeader };

export type { DialogBodyProps, DialogFooterProps, DialogHeaderProps, DialogProps };
