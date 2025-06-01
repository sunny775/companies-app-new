import Button from "@/components/ui/atoms/Button";
import { Company } from "@/lib/graphql/types";

export function Pagination({ data }: { data: Company[] }) {
  return (
    <nav className="bg-gray-100 dark:bg-gray-600/10 px-4 py-3 flex items-center justify-between border-t border-border sm:px-6">
      <div className="hidden sm:block">
        <p className="text-sm flex gap-1">
          <span className="text-muted">Showing</span>
          <span className="font-medium">1</span>
          <span className="text-muted">to</span>
          <span className="font-medium">{data.length}</span>
          <span className="text-muted">of</span>
          <span className="font-medium">{data.length}</span>
          <span className="text-muted">results</span>
        </p>
      </div>
      <div className="flex-1 flex gap-2 justify-between sm:justify-end">
        <Button>Previous</Button>
        <Button>Next</Button>
      </div>
    </nav>
  );
}
