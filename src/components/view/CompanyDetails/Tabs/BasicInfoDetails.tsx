import { Company } from "@/lib/graphql/types";

type Data = Omit<Company, "registeredAddress" | "mailingAddress" | "contactPerson">;

interface Props {
  data: Data;
}

export function BasicInfoDetails({ data }: Props) {
  const summaryItems: (
    | { label: string; value?: string | number; isLink?: undefined }
    | { label: string; value?: string; isLink: boolean }
  )[] = [
    { label: "Legal Name", value: data.legalName },
    { label: "State of Incorporation", value: data.stateOfIncorporation },
    { label: "Industry", value: data.industry },
    { label: "Total Employees", value: data.totalNumberOfEmployees },
    { label: "Full-time Employees", value: data.numberOfFullTimeEmployees },
    { label: "Part-time Employees", value: data.numberOfPartTimeEmployees },
    { label: "Website", value: data.website, isLink: true },
    { label: "LinkedIn", value: data.linkedInCompanyPage, isLink: true },
    { label: "Facebook", value: data.facebookCompanyPage, isLink: true },
    { label: "Phone", value: data.phone },
    { label: "Fax", value: data.fax },
  ];
  return (
    <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-border">
        <h3 className="text-lg leading-6 font-medium">Company Basic Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted">Detailed company information and metadata.</p>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {summaryItems.map((item) =>
            item?.isLink && item.value ? (
              <div key={item.label} className="sm:col-span-1">
                <dt className="text-sm font-medium text-muted">{item.label}</dt>
                <dd className="mt-1 text-sm">
                  <a
                    href={item.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info"
                  >
                    {item.value.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            ) : (
              <div key={item.value} className="sm:col-span-1">
                <dt className="text-sm font-medium text-muted">{item.label}</dt>
                <dd className="mt-1 text-sm">{item.value}</dd>
              </div>
            )
          )}
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-muted">Email</dt>
            <dd className="mt-1 text-sm">
              <a href={`mailto:${data.email}`} className="text-info">
                {data.email}
              </a>
            </dd>
          </div>
          <div className="sm:col-span-3">
            <dt className="text-sm font-medium text-muted">Additional Information</dt>
            <dd className="mt-1 text-sm">{data.otherInformation}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
