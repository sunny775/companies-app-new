import IconButton from "@/components/atoms/IconButton";
import { formatDate } from "@/lib/formatDate";
import { Company } from "@/lib/graphql/types";
import { Clock, Users } from "lucide-react";

interface Props {
  data: Company;
}

export function CompanyOverview({ data }: Props) {
  const summaryItems: { label: string; value?: string | number }[] = [
    { label: "Company ID", value: data.id },
    { label: "Legal Name", value: data.legalName },
    { label: "Industry", value: data.industry },
    { label: "State of Incorporation", value: data.stateOfIncorporation },
    {
      label: "Primary Contact",
      value: `${data.primaryContactPerson?.firstName} ${data.primaryContactPerson?.lastName}`,
    },
    { label: "Primary Email", value: data.primaryContactPerson?.email },
    { label: "Total Employees", value: data.totalNumberOfEmployees },
    { label: "Headquarters", value: `${data.registeredAddress?.city}, ${data.registeredAddress?.state}` },
  ];

  const metrics = [
    {
      label: "Full Time Employees",
      value: data.numberOfFullTimeEmployees,
      icon: <Users className="text-blue-500" />,
      description: "Total Number of Full Time Employees of the company",
    },
    {
      label: "Part Time Employees",
      value: data.numberOfPartTimeEmployees,
      icon: <Users className="text-blue-500" />,
      description: "Total Number of Part Time Employees of the company",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {metrics.map((item) => (
          <div key={item.value} className="bg-surface overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <IconButton>{item.icon}</IconButton>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium truncate uppercase">{item.label}</dt>
                    <dd>
                      <div className="text-lg font-medium text-green-600">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-surface-2 px-5 py-3 border-t border-border">
              <div className="text-sm text-muted">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h3 className="text-lg leading-6 font-medium">Company Summary</h3>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {summaryItems.map((item) => (
              <div key={item.value} className="sm:col-span-3">
                {item.label.includes("Email") ? (
                  <dl>
                    <dt className="text-sm font-medium text-muted">{item.label}</dt>
                    <dd className="mt-1 text-sm">
                      <a href={`mailto:${item.value}`} className="text-blue-600 dark:text-blue-300">
                        {item.value}
                      </a>
                    </dd>
                  </dl>
                ) : (
                  <dl>
                    <dt className="text-sm font-medium text-muted">{item.label}</dt>
                    <dd className="mt-1 text-sm ">{item.value}</dd>
                  </dl>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-2 px-6 py-3 flex items-center justify-end border-t border-border">
          <div className="flex items-center text-sm text-muted">
            <Clock className="mr-1.5 h-5 w-5" />
            Last updated on {formatDate(new Date().toDateString())}
          </div>
        </div>
      </div>
    </div>
  );
}
