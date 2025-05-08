import { CollapseContent, CollapseContentProps } from "./CollapseContent";
import { CollapseProps, CollapseRoot } from "./CollapseRoot";
import { CollapseTrigger, CollapseTriggerProps } from "./CollapseTrigger";

export { useCollapse, type CollapseContextType } from "./CollapseContext";

const Collapse = {
  Root: CollapseRoot,
  Content: CollapseContent,
  Trigger: CollapseTrigger,
};

export { CollapseRoot as Collapse, CollapseContent, CollapseTrigger };

export default Collapse;

export type { CollapseContentProps, CollapseProps, CollapseTriggerProps };
