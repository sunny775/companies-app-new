interface FooterProps {
  totalDisplayed: number;
  totalCompanies: number;
}

export function Footer({ totalDisplayed, totalCompanies }: FooterProps) {
  return (
    <footer className="bg-gray-100 dark:bg-gray-600/10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="text-muted">
            <span className="text-foreground">{totalDisplayed}</span> companies displayed (of{" "}
            <span className="text-foreground">{totalCompanies}</span> total)
          </div>
          <div>Last synced: Today at 14:32</div>
        </div>
      </div>
    </footer>
  );
}
