"use client";

import { FacebookIcon, LinkedinIcon } from "@/assets/BrandIcons";
import { Briefcase, Building2, Edit, Globe, MapPin, Users } from "lucide-react";
import IconButton from "../atoms/IconButton";
import { CompanyDetailsTabs } from "./Tabs/CompanyDetailsTabs";

interface BasicAddress {
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
}

interface Address {
  isMailingAddressDifferentFromRegisteredAddress?: boolean;
  registeredAddress: BasicAddress;
  mailingAddress?: BasicAddress;
}

interface Contact {
  firstName: string;
  lastName: string;
  dialCode: string;
  phone: string;
  email: string;
}

interface CompanyBasicInfo {
  legalName: string;
  stateOfIncorporation: string;
  industry: string;
  totalNumberOfEmployees: number;
  numberOfFullTimeEmployees: number;
  numberOfPartTimeEmployees: number;
  website: string;
  linkedInCompanyPage: string;
  facebookCompanyPage: string;
  otherInformation?: string;
  fax: string;
  dialCode: string;
  phone: string;
  email: string;
}

interface CompanyData {
  id: string;
  status: "active" | "pending" | "inactive";
  createdAt: string;
  updatedAt: string;
  basicInfo: CompanyBasicInfo;
  address: Address;
  contact: Contact;
}

const companyData: CompanyData = {
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

export default function CompanyDetails2() {
  const data = companyData;

  // Format date strings

  return (
    <div className="bg-gray-50 dark:bg-background min-h-screen relative">
      {/* Header with company info and actions */}
      <header className="bg-green-800/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="bg-surface-2/50 backdrop-blur-md p-3 rounded-lg shadow-md md:mr-4 my-4 md:my-0">
                  <Building2 className="text-blue-600 size-50 md:size-40 md:my-0" />
                  <IconButton className="absolute -top-2 -right-2 bg-transparent dark:bg-transparent">
                    <Edit size={15} />
                  </IconButton>
                </div>
                <div>
                  <h1 className="text-3xl font-bold leading-tight">{data.basicInfo.legalName}</h1>
                  <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm">
                      <Briefcase className="mr-1.5 h-5 w-5" />
                      {data.basicInfo.industry}
                    </div>
                    <div className="mt-2 flex items-center text-s">
                      <MapPin className="mr-1.5 h-5 w-5" />
                      {data.address.registeredAddress.city}, {data.address.registeredAddress.state}
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <Users className="mr-1.5 h-5 w-5" />
                      {data.basicInfo.totalNumberOfEmployees} Employees
                    </div>
                    <div className="mt-2 flex items-center text-sm ">
                      <Globe className="mr-1.5 h-5 w-5" />
                      <a href={data.basicInfo.website} target="_blank" rel="noopener noreferrer" className="underline">
                        {data.basicInfo.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center md:mt-0 space-x-3">
              <a
                target="_blank"
                href={data.basicInfo.linkedInCompanyPage}
                className="h-10 w-30 md:size-10 rounded-full flex items-center justify-center bg-sky-500 shadow-md shadow-sky-500/30"
              >
                <LinkedinIcon className="stroke-sky-100" />
              </a>
              <a
                target="_blank"
                href={data.basicInfo.facebookCompanyPage}
                className="h-10 w-30 md:size-10 rounded-full flex items-center justify-center bg-blue-500 shadow-md shadow-blue-500/30"
              >
                <FacebookIcon className="stroke-blue-100" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <CompanyDetailsTabs />
      </main>
    </div>
  );
}
