"use client";

import {
  Activity,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Clock,
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
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

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

      {/* Navigation Tabs */}
      <nav className="bg-surface shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Tab
                label="Overview"
                icon={<Activity />}
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
              />
              <Tab
                label="Basic Info"
                icon={<FileText />}
                active={activeTab === "basicInfo"}
                onClick={() => setActiveTab("basicInfo")}
              />
              <Tab
                label="Addresses"
                icon={<MapPin />}
                active={activeTab === "addresses"}
                onClick={() => setActiveTab("addresses")}
              />
              <Tab
                label="Contact"
                icon={<User />}
                active={activeTab === "contact"}
                onClick={() => setActiveTab("contact")}
              />
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <IconButton className="p-2 hover:shadow">
                <Bookmark className="h-6 w-6" />
              </IconButton>
              <IconButton className="ml-4 p-2 hover:shadow">
                <Printer className="h-6 w-6" />
              </IconButton>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
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
                          <div className="text-lg font-medium text-green-600">
                            {data.basicInfo.numberOfFullTimeEmployees}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-surface-2 px-5 py-3">
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
                          <div className="text-lg font-medium text-green-600">
                            {data.basicInfo.numberOfPartTimeEmployees}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-surface-2 px-5 py-3">
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
                      <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {data.basicInfo.stateOfIncorporation}
                      </dd>
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
                      <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {data.basicInfo.otherInformation}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-surface-2 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1.5 h-5 w-5" />
                  Created on {formatDate(new Date().toDateString())}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1.5 h-5 w-5" />
                  Last updated on {formatDate(new Date().toDateString())}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Basic Info Tab */}
        {activeTab === "basicInfo" && (
          <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Company Basic Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Detailed company information and metadata.</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Legal Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.legalName}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">State of Incorporation</dt>
                  <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.stateOfIncorporation}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Industry</dt>
                  <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.industry}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Total Employees</dt>
                  <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.totalNumberOfEmployees}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Full-time Employees</dt>
                  <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.numberOfFullTimeEmployees}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Part-time Employees</dt>
                  <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.numberOfPartTimeEmployees}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 text-sm text-gray-900">
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
                  <dd className="mt-1 text-sm text-gray-900">
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
                  <dd className="mt-1 text-sm text-gray-900">
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
                  <dd className="mt-1 text-sm text-gray-900">
                    {data.basicInfo.dialCode} {data.basicInfo.phone}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Fax</dt>
                  <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.fax}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a href={`mailto:${data.basicInfo.email}`} className="text-indigo-600 hover:text-indigo-500">
                      {data.basicInfo.email}
                    </a>
                  </dd>
                </div>
                <div className="sm:col-span-3">
                  <dt className="text-sm font-medium text-gray-500">Additional Information</dt>
                  <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.otherInformation}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            {/* Registered Address */}
            <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-indigo-500" />
                    Registered Address
                  </div>
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Official company registration address.</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="prose max-w-none text-gray-900">
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
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                    <MapPin className="mr-1.5 h-4 w-4 text-gray-500" />
                    View on Map
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                    <Download className="mr-1.5 h-4 w-4 text-gray-500" />
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Mailing Address */}
            {data.address.isMailingAddressDifferentFromRegisteredAddress && data.address.mailingAddress && (
              <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-indigo-500" />
                      Mailing Address
                    </div>
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Address for correspondence and deliveries.</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="prose max-w-none text-gray-900">
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
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                      <MapPin className="mr-1.5 h-4 w-4 text-gray-500" />
                      View on Map
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                      <Download className="mr-1.5 h-4 w-4 text-gray-500" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Primary Contact Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Main point of contact for this company.</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="py-10 px-6 border-b md:border-b-0 md:border-r border-gray-200 md:w-60">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
                      {data.contact.firstName.charAt(0)}
                      {data.contact.lastName.charAt(0)}
                    </div>
                    <h4 className="mt-4 text-lg font-medium text-gray-900">
                      {data.contact.firstName} {data.contact.lastName}
                    </h4>
                    <p className="text-sm text-gray-500">Primary Contact</p>
                  </div>
                </div>

                <div className="py-6 px-8 flex-1">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {data.contact.firstName} {data.contact.lastName}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Role</dt>
                      <dd className="mt-1 text-sm text-gray-900">Primary Contact</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a href={`mailto:${data.contact.email}`} className="text-indigo-600 hover:text-indigo-500">
                          {data.contact.email}
                        </a>
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {data.contact.dialCode} {data.contact.phone}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// rounded-none border-b bg-transparent
