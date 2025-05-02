import IconButton from "@/components/atoms/IconButton";
import Tabs from "@/components/atoms/Tabs";
import { Activity, Bookmark, FileText, MapPin, Printer, User } from "lucide-react";
import { AddressesDetails } from "./AddressesDetails";
import { BasicInfoDetails } from "./BasicInfoDetails";
import { CompanyOverview } from "./CompanyOverview";
import { ContactDetails } from "./ContactDetails";

export const CompanyDetailsTabs = () => {
  return (
    <Tabs defaultValue="Overview">
      <div className=" bg-surface">
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs.Header
            className="bg-transparent dark:bg-transparent p-0"
            indicatorClassName="border-b rounded-none border-b-green-600"
          >
            <Tabs.Tab value="Overview" className="flex gap-2 items-center justify-center h-16">
              <Activity />
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="Basic Info" className="flex gap-2 items-center justify-center h-16">
              <FileText /> Basic Info
            </Tabs.Tab>
            <Tabs.Tab value="Addresses" className="flex gap-2 items-center justify-center h-16">
              <MapPin /> Addresses
            </Tabs.Tab>
            <Tabs.Tab value="Contact" className="flex gap-2 items-center justify-center h-16">
              <User /> Contact
            </Tabs.Tab>
          </Tabs.Header>
          <div className="flex justify-center items-center text-gray-500 dark:text-gray-400">
            <IconButton className="hover:shadow">
              <Bookmark className="h-6 w-6" />
            </IconButton>
            <IconButton className="ml-4 hover:shadow">
              <Printer className="h-6 w-6" />
            </IconButton>
          </div>
        </div>
      </div>
      <Tabs.Body className="mt-8 max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        <Tabs.Panel value="Overview">
          <CompanyOverview />
        </Tabs.Panel>
        <Tabs.Panel value="Basic Info">
          <BasicInfoDetails />
        </Tabs.Panel>
        <Tabs.Panel value="Addresses">
          <AddressesDetails />
        </Tabs.Panel>
        <Tabs.Panel value="Contact">
          <ContactDetails />
        </Tabs.Panel>
      </Tabs.Body>
    </Tabs>
  );
};
