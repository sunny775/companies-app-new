import cn from "@/lib/cn";

interface SummaryItemProps {
  label: string;
  value?: string | number;
  isLink?: boolean;
  fullWidth?: boolean;
}

export function SummaryItem({ label, value, isLink = false, fullWidth = false }: SummaryItemProps) {
  return (
    <div className={cn("mb-3", { "col-span-2": fullWidth })}>
      <p className="text-sm font-medium text-muted">{label}</p>
      {isLink ? (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}
