"use client";

import { FacebookIcon, LinkedinIcon } from "@/assets/BrandIcons";
import { Company } from "@/lib/graphql/types";
import { Briefcase, Building2, Edit, Globe, MapPin, Users } from "lucide-react";
import IconButton from "../../atoms/IconButton";
import { CompanyDetailsTabs } from "./Tabs/CompanyDetailsTabs";
import Image from "next/image";
import { ImageResponse } from "@/lib/shared-types";

interface Props {
  data: Company;
  logo?: ImageResponse;
}

export default function CompanyDetails({ data, logo }: Props) {
  return (
    <div className="bg-background min-h-screen relative">
      <header className="bg-surface-2 backdrop-blur-md shadow md:shadow-none">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="bg-surface-2/50 backdrop-blur-md p-3 rounded-lg shadow-md md:mr-4 my-4 md:my-0">
                  {logo && logo?.dataUrl ? (
                    <Image src={logo.dataUrl} alt="company logo" width={400} height={400} className="size-50 md:size-40" />
                  ) : (
                    <Building2 className="text-blue-600 size-50 md:size-40 md:my-0" />
                  )}
                  <IconButton className="absolute -top-2 -right-2 bg-surface-2 border border-border">
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
      <CompanyDetailsTabs data={data} />
    </div>
  );
}
