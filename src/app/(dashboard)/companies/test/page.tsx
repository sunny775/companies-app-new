import { Test } from "@/components/Test/Test";
import { Test2 } from "@/components/Test/Test2";
import { Test3 } from "@/components/Test/Test3";
import CompanyPreview from "@/components/view/CompanyPreview/CompanyPreview";

export default function Home() {
  return (
    <div>
      <CompanyPreview />
      <Test />
      <Test2 />
      <Test3 />
    </div>
  );
}
