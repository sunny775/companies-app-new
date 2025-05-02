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

export function ContactDetails() {
  return (
    <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-600/20">
        <h3 className="text-lg leading-6 font-medium">Primary Contact Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Main point of contact for this company.</p>
      </div>
      <div>
        <div className="flex flex-col md:flex-row">
          <div className="py-10 px-6 border-b md:border-b-0 md:border-r border-gray-600/20 md:w-60">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
                {data.contact.firstName.charAt(0)}
                {data.contact.lastName.charAt(0)}
              </div>
              <h4 className="mt-4 text-lg font-medium">
                {data.contact.firstName} {data.contact.lastName}
              </h4>
              <p className="text-sm text-gray-500">Primary Contact</p>
            </div>
          </div>

          <div className="py-6 px-8 flex-1">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm">
                  {data.contact.firstName} {data.contact.lastName}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm">Primary Contact</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm">
                  <a href={`mailto:${data.contact.email}`} className="text-indigo-600 hover:text-indigo-500">
                    {data.contact.email}
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                <dd className="mt-1 text-sm">
                  {data.contact.dialCode} {data.contact.phone}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
