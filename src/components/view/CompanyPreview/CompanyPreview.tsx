"use client";

import { Building2, MapPin, User } from "lucide-react";
import Collapse from "../Collapse";
import { SummaryItem } from "./SummaryField";

type CompanyData = typeof data;

const data = {
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
    otherInformation: "Founded in 2015, focused on AI and cloud solutions.",
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

type SummaryField =
  | { label: string; value: string | number; isLink?: undefined }
  | { label: string; value: string; isLink: boolean };

interface CompanyPreviewProps {
  data?: CompanyData;
}

const { basicInfo, contact, address } = data;

const { registeredAddress, mailingAddress, isMailingAddressDifferentFromRegisteredAddress } = address;

const sampleData = data;

const basicInfoSummary: SummaryField[] = [
  { label: "Legal Name", value: basicInfo.legalName },
  { label: "State of Incorporation", value: basicInfo.stateOfIncorporation },
  { label: "Industry", value: basicInfo.industry },
  { label: "Total Employees", value: basicInfo.totalNumberOfEmployees },
  { label: "Full-time Employees", value: basicInfo.numberOfFullTimeEmployees },
  { label: "Part-time Employees", value: basicInfo.numberOfPartTimeEmployees },
  { label: "Website", value: basicInfo.website, isLink: true },
  { label: "LinkedIn", value: basicInfo.linkedInCompanyPage, isLink: true },
  { label: "Facebook", value: basicInfo.facebookCompanyPage, isLink: true },
  { label: "Phone", value: basicInfo.dialCode + basicInfo.phone },
  { label: "Fax", value: basicInfo.fax },
  { label: "Email", value: basicInfo.email },
];

const registeredAddressSummary: SummaryField[] = [
  { label: "Country", value: registeredAddress.country },
  { label: "State", value: registeredAddress.state },
  { label: "City", value: registeredAddress.city },
  { label: "Street", value: registeredAddress.street },
  { label: "Zip Code", value: registeredAddress.zipCode },
];

const mailingAddressSummary: SummaryField[] = [
  { label: "Country", value: mailingAddress.country },
  { label: "State", value: mailingAddress.state },
  { label: "City", value: mailingAddress.city },
  { label: "Street", value: mailingAddress.street },
  { label: "Zip Code", value: mailingAddress.zipCode },
];

const contactSummary: SummaryField[] = [
  { label: "First Name", value: contact.firstName },
  { label: "Last Name", value: contact.lastName },
  { label: "Phone", value: contact.dialCode + contact.phone },
  { label: "Email", value: contact.email },
];

export default function CompanyPreview({ data = sampleData }: CompanyPreviewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 my-6 rounded-lg shadow-lg border border-border">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Company Preview</h1>
        <p className="text-muted">Review your company information before submission</p>
      </header>

      <Collapse defaultExpanded={true} className="mb-8">
        <Collapse.Trigger title="Company Basic Information" icon={<Building2 />} className="bg-blue-600/5" />
        <Collapse.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {basicInfoSummary.map((item) => (
              <SummaryItem key={item.value} {...item} />
            ))}
            {data.basicInfo.otherInformation && (
              <div className="md:col-span-2">
                <SummaryItem label="Additional Information" value={data.basicInfo.otherInformation} fullWidth />
              </div>
            )}
          </div>
        </Collapse.Content>
      </Collapse>

      <Collapse className="mb-8">
        <Collapse.Trigger title="Company Addresses" icon={<MapPin />} className="bg-green-600/5" />
        <Collapse.Content>
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Registered Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {registeredAddressSummary.map((item) => (
                  <SummaryItem key={item.value} {...item} />
                ))}
              </div>
            </div>

            {isMailingAddressDifferentFromRegisteredAddress && (
              <div>
                <h3 className="text-lg font-medium mb-4">Mailing Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mailingAddressSummary.map((item) => (
                    <SummaryItem key={item.value} {...item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Collapse.Content>
      </Collapse>

      <Collapse className="mb-8">
        <Collapse.Trigger title="Primary Contact" icon={<User />} className="bg-purple-500/5" />
        <Collapse.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactSummary.map((item) => (
              <SummaryItem key={item.value} {...item} />
            ))}
          </div>
        </Collapse.Content>
      </Collapse>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
          Edit Information
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Submit Company
        </button>
      </div>
    </div>
  );
}
