"use client";

import { FacebookIcon, LinkedinIcon } from "@/assets/BrandIcons";
import { UpdateCompanyInput } from "@/lib/graphql/types";
import { Briefcase, Building2, Edit, Globe, MapPin, Users } from "lucide-react";
import IconButton from "../../atoms/IconButton";
import { CompanyDetailsTabs } from "./Tabs/CompanyDetailsTabs";

const companyData: UpdateCompanyInput & { id: string } = {
  id: "COMP-2023-05678",
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
  phone: "(555) 987-6543",
  email: "info@acmetech.example.com",
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
  primaryContactPerson: {
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "(555) 765-4321",
    email: "sarah.johnson@acmetech.example.com",
  },
};

export default function CompanyDetails() {
  const data = companyData;

  return (
    <div className="bg-gray-50 dark:bg-background min-h-screen relative">
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
                  <h1 className="text-3xl font-bold leading-tight">{data.legalName}</h1>
                  <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm">
                      <Briefcase className="mr-1.5 h-5 w-5" />
                      {data.industry}
                    </div>
                    <div className="mt-2 flex items-center text-s">
                      <MapPin className="mr-1.5 h-5 w-5" />
                      {data.registeredAddress?.city}, {data.registeredAddress?.state}
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <Users className="mr-1.5 h-5 w-5" />
                      {data.totalNumberOfEmployees} Employees
                    </div>
                    <div className="mt-2 flex items-center text-sm ">
                      <Globe className="mr-1.5 h-5 w-5" />
                      <a href={data.website} target="_blank" rel="noopener noreferrer" className="underline">
                        {data.website?.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center md:mt-0 space-x-3">
              <a
                target="_blank"
                href={data.linkedInCompanyPage}
                className="h-10 w-30 md:size-10 rounded-full flex items-center justify-center bg-sky-500 shadow-md shadow-sky-500/30"
              >
                <LinkedinIcon className="stroke-sky-100" />
              </a>

              <a
                target="_blank"
                href={data.facebookCompanyPage}
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
