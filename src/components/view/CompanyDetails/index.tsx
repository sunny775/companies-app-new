"use client";

import { FacebookIcon, LinkedinIcon } from "@/assets/BrandIcons";
import { CompanyLogo } from "@/components/molecules/CompanyLogo/CompanyLogo";
import { Company } from "@/lib/graphql/types";
import { Briefcase, Building2, Globe, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { EditLogoDialog } from "./EditLogoDialog";
import { CompanyDetailsTabs } from "./Tabs/CompanyDetailsTabs";

interface Props {
  data: Company;
}

export default function CompanyDetails({ data }: Props) {
  const [company, setCompany] = useState(data);

  return (
    <div className="bg-background min-h-screen relative">
      <header className="bg-surface-2 backdrop-blur-md shadow md:shadow-none">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="rounded-lg md:mr-4 my-4 md:my-0 relative">
                  <CompanyLogo
                    s3Key={company.logoS3Key}
                    className="size-50 md:size-40 rounded-lg"
                    placeholderIcon={<Building2 className="text-info size-50 md:size-40" />}
                  />
                  <EditLogoDialog setCompany={setCompany} company={company} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold leading-tight">{company.legalName}</h1>
                  <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm">
                      <Briefcase className="mr-1.5 h-5 w-5" />
                      {company.industry}
                    </div>
                    <div className="mt-2 flex items-center text-s">
                      <MapPin className="mr-1.5 h-5 w-5" />
                      {company.registeredAddress?.city}, {company.registeredAddress?.state}
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <Users className="mr-1.5 h-5 w-5" />
                      {company.totalNumberOfEmployees} Employees
                    </div>
                    <div className="mt-2 flex items-center text-sm ">
                      <Globe className="mr-1.5 h-5 w-5" />
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="underline">
                        {company.website?.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center md:mt-0 space-x-3">
              <a
                target="_blank"
                href={company.linkedInCompanyPage}
                className="h-10 w-30 md:size-10 rounded-full flex items-center justify-center bg-sky-500 shadow-md shadow-sky-500/30"
              >
                <LinkedinIcon className="stroke-sky-100" />
              </a>

              <a
                target="_blank"
                href={company.facebookCompanyPage}
                className="h-10 w-30 md:size-10 rounded-full flex items-center justify-center bg-blue-500 shadow-md shadow-blue-500/30"
              >
                <FacebookIcon className="stroke-blue-100" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <CompanyDetailsTabs data={company} />
    </div>
  );
}
