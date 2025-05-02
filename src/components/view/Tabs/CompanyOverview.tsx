import IconButton from "@/components/atoms/IconButton";
import Text from "@/components/atoms/Text";
import { Clock, Users } from "lucide-react";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const data = {
  id: "COMP-2023-05678",
  status: "active",
  createdAt: "2023-08-15T10:30:00Z",
  updatedAt: "2024-04-20T14:45:00Z",
  basicInfo: {
    legalName: "Acme Technologies Inc.",
    stateOfIncorporation: "California",
    industry: "Software Development",
    totalNumberOfEmployees: 150,
    numberOfFullTimeEmployees: 120,
    numberOfPartTimeEmployees: 30,
    website: "https://acmetech.example.com",
    linkedInCompanyPage: "https://linkedin.com/company/acmetech",
    facebookCompanyPage: "https://facebook.com/acmetech",
    otherInformation:
      "Founded in 2015, focused on AI and cloud solutions with a global customer base across North America, Europe, and Asia. The company has received multiple industry awards for innovation.",
    fax: "+1 (555) 123-4567",
    dialCode: "+1",
    phone: "(555) 987-6543",
    email: "info@acmetech.example.com",
  },
  address: {
    isMailingAddressDifferentFromRegisteredAddress: true,
    registeredAddress: {
      country: "United States",
      state: "California",
      city: "San Francisco",
      street: "123 Innovation Avenue, Suite 500",
      zipCode: "94105",
    },
    mailingAddress: {
      country: "United States",
      state: "California",
      city: "Palo Alto",
      street: "456 Tech Boulevard, Floor 3",
      zipCode: "94301",
    },
  },
  contact: {
    firstName: "Sarah",
    lastName: "Johnson",
    dialCode: "+1",
    phone: "(555) 765-4321",
    email: "sarah.johnson@acmetech.example.com",
  },
};

const summaryItems: { label: string; value: string | number }[] = [
  { label: "Company ID", value: data.id },
  { label: "Legal Name", value: data.basicInfo.legalName },
  { label: "Industry", value: data.basicInfo.industry },
  { label: "State of Incorporation", value: data.basicInfo.stateOfIncorporation },
  { label: "Primary Contact", value: `${data.contact.firstName} ${data.contact.lastName}` },
  { label: "Primary Email", value: data.contact.email },
  { label: "Total Employees", value: data.basicInfo.totalNumberOfEmployees },
  { label: "Headquarters", value: `${data.address.registeredAddress.city}, ${data.address.registeredAddress.state}` },
];

const metrics = [
  {
    label: "Full Time Employees",
    value: data.basicInfo.numberOfFullTimeEmployees,
    icon: <Users className="text-blue-500" />,
    description: "Total Number of Full Time Employees of the company",
  },
  {
    label: "Part Time Employees",
    value: data.basicInfo.numberOfPartTimeEmployees,
    icon: <Users className="text-blue-500" />,
    description: "Total Number of Part Time Employees of the company",
  },
];

export function CompanyOverview() {
  return (
    <div className="space-y-6">
      {/* Company Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {metrics.map((item) => (
          <div key={item.value} className="bg-surface overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <IconButton>{item.icon}</IconButton>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium truncate uppercase">
                      {item.label}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-green-600">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-surface-2 px-5 py-3 border-t border-gray-600/20">
              <div className="text-sm text-muted">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="bg-surface shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-600/20">
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
                      <a
                        href={`mailto:${item.value}`}
                        className="text-blue-600 dark:text-blue-300"
                      >
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
        <div className="bg-gray-50 dark:bg-surface-2 px-6 py-3 flex items-center justify-end border-t border-gray-600/20">
          <div className="flex items-center text-sm text-muted">
            <Clock className="mr-1.5 h-5 w-5" />
            Last updated on {formatDate(new Date().toDateString())}
          </div>
        </div>
      </div>
    </div>
  );
}
