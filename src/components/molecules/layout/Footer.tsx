import BrandLogo from "../../BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-600">
      <div className="w-full p-8">
        <BrandLogo className="text-lg" />

        <div className="mt-4 lg:flex lg:items-end lg:justify-between">
          <p className="max-w-md text-pretty leading-relaxed">View and manage ompany profiles</p>

          <p className="text-sm lg:mt-0">&copy; Companies App {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
