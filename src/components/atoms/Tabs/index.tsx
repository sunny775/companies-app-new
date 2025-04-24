import { Tab, TabProps } from "./Tab";
import { TabPanel, TabPanelProps } from "./TabPanel";
import { TabsBody, TabsBodyProps } from "./TabsBody";
import { TabsHeader, TabsHeaderProps } from "./TabsHeader";
import { TabsProps, TabsRoot } from "./TabsRoot";

export { useTabs, type TabsContextType } from "./TabsContext";

const Tabs = Object.assign(TabsRoot, {
  Header: TabsHeader,
  Body: TabsBody,
  Panel: TabPanel,
  Tab,
});

export default Tabs;

export { Tab, TabPanel, TabsRoot as Tabs, TabsBody, TabsHeader };

export type { TabPanelProps, TabProps, TabsBodyProps, TabsHeaderProps, TabsProps };
