"use client";

import {
  Activity,
  Bookmark,
  Briefcase,
  Building2,
  Download,
  FileText,
  Globe,
  MapPin,
  Printer,
  Share2,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import Button from "../atoms/Button";
import IconButton from "../atoms/IconButton";
import { CompanyDetailsTabs } from "./Tabs/CompanyDetailsTabs";

// Define TypeScript interfaces based on the Zod schema
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

interface TabProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

// Tab component for navigation
const Tab = ({ label, icon, active, onClick }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 border-b-2 ${
        active
          ? "border-indigo-500 text-indigo-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      } h-full`}
    >
      <div className="flex items-center">
        <span className={`mr-2 ${active ? "text-indigo-500" : "text-gray-400"}`}>{icon}</span>
        <span className="font-medium text-sm">{label}</span>
      </div>
    </button>
  );
};

// Extended sample data for the details view
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

export default function CompanyDetails2(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const data = companyData;

  // Format date strings

  return (
    <div className="bg-gray-50 dark:bg-background min-h-screen relative">
      {/* Header with company info and actions */}
      <header className="bg-green-800/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <div className="bg-surface-2/50 backdrop-blur-md p-3 rounded-lg shadow-md mr-4">
                  <Building2 size={40} className="text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold leading-tight text-gray-700 dark:text-gray-300">
                    {data.basicInfo.legalName}
                  </h1>
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

            <div className="mt-6 flex md:mt-0 md:ml-4 space-x-3">
              <Button variant="ghost" color="success" className="rounded-full shadow-none px-2 py-px">
                Active
              </Button>
              <Button variant="filled" color="success" className="flex gap-2">
                <Share2 className="size-4" />
                Share
              </Button>
              <Button variant="filled" color="info" className="flex gap-2">
                <Download className="size-4" />
                Export
              </Button>
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
