import { CreateCompanyDialog } from "@/components/ui/organisms/CreateCompanyDialog";
import { Company } from "@/lib/graphql/types";

interface HeaderProps {
  onCompanyCreated: (company: Company) => void;
}

export function Header({ onCompanyCreated }: HeaderProps) {
  return (
    <header className="bg-gray-600/5 shadow backdrop-blur-sm">
      <div className="max-w-[90vw] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center sm:justify-between items-center">
          <h1 className="text-2xl font-bold hidden sm:block">Companies</h1>
          <CreateCompanyDialog onCompanyCreated={onCompanyCreated} className="w-full sm:w-fit" />
        </div>
      </div>
    </header>
  );
}
