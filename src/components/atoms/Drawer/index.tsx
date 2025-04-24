import { DrawerBody, DrawerBodyProps } from "./DrawerBody";
import { DrawerFooter, DrawerFooterProps } from "./DrawerFooter";
import { DrawerHeader, DrawerHeaderProps } from "./DrawerHeader";
import { DrawerProps, DrawerRoot } from "./DrawerRoot";

export { useDrawer, type DrawerContextType } from "./DrawerContext";

const Drawer = Object.assign(DrawerRoot, {
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
});

export default Drawer;

export { DrawerRoot as Drawer, DrawerBody, DrawerFooter, DrawerHeader };

export type { DrawerBodyProps, DrawerFooterProps, DrawerHeaderProps, DrawerProps };
