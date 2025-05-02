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

export function BasicInfoDetails() {
  return (
    <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-600/20">
        <h3 className="text-lg leading-6 font-medium">Company Basic Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Detailed company information and metadata.</p>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Legal Name</dt>
            <dd className="mt-1 text-sm">{data.basicInfo.legalName}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">State of Incorporation</dt>
            <dd className="mt-1 text-sm">{data.basicInfo.stateOfIncorporation}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Industry</dt>
            <dd className="mt-1 text-sm">{data.basicInfo.industry}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Total Employees</dt>
            <dd className="mt-1 text-sm">{data.basicInfo.totalNumberOfEmployees}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full-time Employees</dt>
            <dd className="mt-1 text-sm">{data.basicInfo.numberOfFullTimeEmployees}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Part-time Employees</dt>
            <dd className="mt-1 text-sm">{data.basicInfo.numberOfPartTimeEmployees}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            <dd className="mt-1 text-sm">
              <a
                href={data.basicInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                {data.basicInfo.website}
              </a>
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
            <dd className="mt-1 text-sm">
              <a
                href={data.basicInfo.linkedInCompanyPage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Company Profile
              </a>
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Facebook</dt>
            <dd className="mt-1 text-sm">
              <a
                href={data.basicInfo.facebookCompanyPage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Company Page
              </a>
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm">
              {data.basicInfo.dialCode} {data.basicInfo.phone}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Fax</dt>
            <dd className="mt-1 text-sm">{data.basicInfo.fax}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm">
              <a href={`mailto:${data.basicInfo.email}`} className="text-indigo-600 hover:text-indigo-500">
                {data.basicInfo.email}
              </a>
            </dd>
          </div>
          <div className="sm:col-span-3">
            <dt className="text-sm font-medium text-gray-500">Additional Information</dt>
            <dd className="mt-1 text-sm">{data.basicInfo.otherInformation}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
