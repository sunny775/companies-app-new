"use client";

import { createCompanySchema } from "@/components/molecules/Forms/schema/createCompany.schema";
import { Building2, MapPin, User } from "lucide-react";
import { z } from "zod";
import Collapse from "../../atoms/Collapse";
import { SummaryItem } from "./SummaryField";

type CompanyData = Partial<z.infer<typeof createCompanySchema>> & { files: FileList | null };

type SummaryField = { label: string; value?: string | number; isLink?: boolean };

interface CompanyPreviewProps {
  data: CompanyData;
}

export default function CompanyPreview({ data }: CompanyPreviewProps) {
  const { basicInfo, contact, address } = data;

  const basicInfoSummary: SummaryField[] = [
    { label: "Legal Name", value: basicInfo?.legalName },
    { label: "State of Incorporation", value: basicInfo?.stateOfIncorporation },
    { label: "Industry", value: basicInfo?.industry },
    { label: "Total Employees", value: basicInfo?.totalNumberOfEmployees },
    { label: "Full-time Employees", value: basicInfo?.numberOfFullTimeEmployees },
    { label: "Part-time Employees", value: basicInfo?.numberOfPartTimeEmployees },
    { label: "Website", value: basicInfo?.website, isLink: true },
    { label: "LinkedIn", value: basicInfo?.linkedInCompanyPage, isLink: true },
    { label: "Facebook", value: basicInfo?.facebookCompanyPage, isLink: true },
    { label: "Phone", value: (basicInfo?.dialCode || "") + basicInfo?.phone || "" },
    { label: "Fax", value: basicInfo?.fax },
    { label: "Email", value: basicInfo?.email },
    { label: "Logo", value: data.files?.[0].name },
  ];

  const registeredAddressSummary: SummaryField[] = [
    { label: "Country", value: address?.registeredAddress.country },
    { label: "State", value: address?.registeredAddress.state },
    { label: "City", value: address?.registeredAddress.city },
    { label: "Street", value: address?.registeredAddress.street },
    { label: "Zip Code", value: address?.registeredAddress.zipCode },
  ];

  const mailingAddressSummary: SummaryField[] = [
    { label: "Country", value: address?.mailingAddress?.country },
    { label: "State", value: address?.mailingAddress?.state },
    { label: "City", value: address?.mailingAddress?.city },
    { label: "Street", value: address?.mailingAddress?.street },
    { label: "Zip Code", value: address?.mailingAddress?.zipCode },
  ];

  const contactSummary: SummaryField[] = [
    { label: "First Name", value: contact?.firstName },
    { label: "Last Name", value: contact?.lastName },
    { label: "Phone", value: (contact?.dialCode || "") + contact?.phone },
    { label: "Email", value: contact?.email },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Company Preview</h1>
        <p className="text-muted">Review your company information before submission</p>
      </header>

      <Collapse.Root defaultExpanded={true} className="mb-8">
        <Collapse.Trigger title="Company Basic Information" icon={<Building2 />} className="bg-blue-600/5" />
        <Collapse.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {basicInfoSummary.map((item) => (
              <SummaryItem key={item.label} {...item} />
            ))}
            {basicInfo?.otherInformation && (
              <div className="md:col-span-2">
                <SummaryItem label="Additional Information" value={basicInfo?.otherInformation} fullWidth />
              </div>
            )}
          </div>
        </Collapse.Content>
      </Collapse.Root>

      <Collapse.Root className="mb-8">
        <Collapse.Trigger title="Company Addresses" icon={<MapPin />} className="bg-green-600/5" />
        <Collapse.Content>
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Registered Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {registeredAddressSummary.map((item) => (
                  <SummaryItem key={item.label} {...item} />
                ))}
              </div>
            </div>

            {address?.isMailingAddressDifferentFromRegisteredAddress && (
              <div>
                <h3 className="text-lg font-medium mb-4">Mailing Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mailingAddressSummary.map((item) => (
                    <SummaryItem key={item.label} {...item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Collapse.Content>
      </Collapse.Root>

      <Collapse.Root className="mb-8">
        <Collapse.Trigger title="Primary Contact" icon={<User />} className="bg-purple-500/5" />
        <Collapse.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactSummary.map((item) => (
              <SummaryItem key={item.label} {...item} />
            ))}
          </div>
        </Collapse.Content>
      </Collapse.Root>
    </div>
  );
}
