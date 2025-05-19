import { CreateCompanyDialog } from "@/components/molecules/CreateCompanyDialog";

export function Header() {
  return (
    <header className="bg-gray-100 dark:bg-gray-600/10 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Companies</h1>
          <CreateCompanyDialog />
        </div>
      </div>
    </header>
  );
}
