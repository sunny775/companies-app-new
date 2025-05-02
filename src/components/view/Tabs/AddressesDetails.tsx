import Button from "@/components/atoms/Button";
import { Download, MapPin } from "lucide-react";

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

export function AddressesDetails() {
  return (
    <div className="space-y-6 w-full">
      {/* Registered Address */}
      <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-600/20">
          <h3 className="text-lg leading-6 font-medium">
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-indigo-500" />
              Registered Address
            </div>
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Official company registration address.</p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <div>
            <address className="not-italic">
              <p className="text-base">{data.address.registeredAddress.street}</p>
              <p className="text-base">
                {data.address.registeredAddress.city}, {data.address.registeredAddress.state}{" "}
                {data.address.registeredAddress.zipCode}
              </p>
              <p className="text-base">{data.address.registeredAddress.country}</p>
            </address>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-surface-2 px-4 py-4 sm:px-6">
          <div className="flex items-center space-x-2">
          <Button className="flex items-center">
              <MapPin className="mr-1.5 h-4 w-4 text-gray-500" />
              View on Map
            </Button>
            <Button className="flex items-center">
              <Download className="mr-1.5 h-4 w-4 text-gray-500" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Mailing Address */}
      {data.address.isMailingAddressDifferentFromRegisteredAddress && data.address.mailingAddress && (
        <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-600/20">
            <h3 className="text-lg leading-6 font-medium">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-indigo-500" />
                Mailing Address
              </div>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Address for correspondence and deliveries.</p>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <div className="prose max-w-none">
              <address className="not-italic">
                <p className="text-base">{data.address.mailingAddress.street}</p>
                <p className="text-base">
                  {data.address.mailingAddress.city}, {data.address.mailingAddress.state}{" "}
                  {data.address.mailingAddress.zipCode}
                </p>
                <p className="text-base">{data.address.mailingAddress.country}</p>
              </address>
            </div>
          </div>
          <div className="bg-surface-2 px-4 py-4 sm:px-6">
            <div className="flex items-center space-x-2">
              <Button className="flex items-center">
                <MapPin className="mr-1.5 h-4 w-4 text-gray-500" />
                View on Map
              </Button>
              <Button className="flex items-center">
                <Download className="mr-1.5 h-4 w-4 text-gray-500" />
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
