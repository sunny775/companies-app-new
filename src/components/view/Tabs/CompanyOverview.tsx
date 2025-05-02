import IconButton from "@/components/atoms/IconButton";
import { Calendar, Clock, Users } from "lucide-react";

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

export function CompanyOverview() {
  return (
    <div className="space-y-6">
      {/* Company Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-surface overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <IconButton>
                <Users className="text-blue-500" />
              </IconButton>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate text-gray-700 dark:text-gray-300 uppercase">
                    Full Time Employees
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-green-600">{data.basicInfo.numberOfFullTimeEmployees}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-surface-2 px-5 py-3 border-t border-gray-600/20">
            <div className="text-sm text-gray-500">Total Number of Full Time Employees of the company</div>
          </div>
        </div>
        <div className="bg-surface overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <IconButton>
                <Users className="text-blue-500" />
              </IconButton>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate text-gray-700 dark:text-gray-300 uppercase">
                    Part Time Employees
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-green-600">{data.basicInfo.numberOfPartTimeEmployees}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-surface-2 px-5 py-3 border-t border-gray-600/20">
            <div className="text-sm text-gray-500">Total Number of Part Time Employees of the company</div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-surface shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-600/20">
          <h3 className="text-lg leading-6 font-medium">Company Summary</h3>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Company ID</dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">{data.id}</dd>
              </dl>
            </div>

            <div className="sm:col-span-3">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Legal Name</dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">{data.basicInfo.legalName}</dd>
              </dl>
            </div>

            <div className="sm:col-span-3">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Industry</dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">{data.basicInfo.industry}</dd>
              </dl>
            </div>

            <div className="sm:col-span-3">
              <dl>
                <dt className="text-sm font-medium text-gray-500">State of Incorporation</dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">{data.basicInfo.stateOfIncorporation}</dd>
              </dl>
            </div>

            <div className="sm:col-span-3">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Primary Contact</dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {data.contact.firstName} {data.contact.lastName}
                </dd>
              </dl>
            </div>

            <div className="sm:col-span-3">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Primary Email</dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <a href={`mailto:${data.contact.email}`} className="text-indigo-600 hover:text-indigo-500">
                    {data.contact.email}
                  </a>
                </dd>
              </dl>
            </div>

            <div className="sm:col-span-3">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Total Employees</dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {data.basicInfo.totalNumberOfEmployees}
                </dd>
              </dl>
            </div>

            <div className="sm:col-span-3">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Headquarters</dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {data.address.registeredAddress.city}, {data.address.registeredAddress.state}
                </dd>
              </dl>
            </div>

            <div className="sm:col-span-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">{data.basicInfo.otherInformation}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-surface-2 px-6 py-3 flex items-center justify-end border-t border-gray-600/20">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-1.5 h-5 w-5" />
            Last updated on {formatDate(new Date().toDateString())}
          </div>
        </div>
      </div>
    </div>
  );
}
