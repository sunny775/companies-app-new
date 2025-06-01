import IconButton from "@/components/ui/atoms/IconButton";
import Menu from "@/components/ui/atoms/Menu";
import Tabs from "@/components/ui/atoms/Tabs";
import { Company } from "@/lib/graphql/types";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import cn from "@/lib/utils/cn";
import { Activity, Bookmark, Download, FileText, MapPin, MoreVertical, Printer, User } from "lucide-react";
import { useParams } from "next/navigation";
import { AddressesDetails } from "./AddressesDetails";
import { BasicInfoDetails } from "./BasicInfoDetails";
import { CompanyOverview } from "./CompanyOverview";
import { ContactDetails } from "./ContactDetails";

interface Props {
  data: Company;
}

export const CompanyDetailsTabs = ({ data }: Props) => {
  const params = useParams<{ companyId: string }>();

  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarkedCompanies", []);

  const handlePrint = () => {
    window.print();
  };

  const deleteBookmark = (companyId: string) => {
    setBookmarks((items) => items.filter((item) => item !== companyId));
  };

  const addToBookmarks = (companyId: string) => {
    if (bookmarks.includes(companyId)) {
      return deleteBookmark(companyId);
    }
    setBookmarks((items) => [...items, companyId]);
  };

  const isBookmarked = () => bookmarks.includes(params.companyId);

  const { primaryContactPerson, registeredAddress, mailingAddress, ...basicInfo } = data;

  return (
    <>
      <Tabs defaultValue="Overview" className="hidden md:block">
        <div className=" bg-surface shadow">
          <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs.Header
              className="bg-transparent dark:bg-transparent p-0"
              indicatorClassName="border-b rounded-none border-b-green-600"
            >
              <Tabs.Tab value="Overview" className="flex gap-2 items-center justify-center h-16">
                <Activity />
                <span className="shrink-0">Overview</span>
              </Tabs.Tab>
              <Tabs.Tab value="Basic Info" className="flex gap-2 items-center justify-center h-16">
                <FileText /> <span className="shrink-0">Basic Info</span>
              </Tabs.Tab>
              <Tabs.Tab value="Addresses" className="flex gap-2 items-center justify-center h-16">
                <MapPin /> <span className="shrink-0">Addresses</span>
              </Tabs.Tab>
              <Tabs.Tab value="Contact" className="flex gap-2 items-center justify-center h-16">
                <User /> <span className="shrink-0">Contact</span>
              </Tabs.Tab>
            </Tabs.Header>
            <div className="flex justify-center items-center gap-4 text-gray-500 dark:text-gray-400">
              <IconButton className="hover:shadow" onClick={handlePrint}>
                <Printer className="h-6 w-6" />
              </IconButton>
              <Menu>
                <Menu.Trigger asChild>
                  <IconButton>
                    <MoreVertical className="h-5 w-5" />
                  </IconButton>
                </Menu.Trigger>
                <Menu.Dropdown width="sm" placement="bottom-end">
                  <Menu.Item
                    icon={<Bookmark className={cn("size-4", { "fill-info stroke-0": isBookmarked() })} />}
                    onClick={() => addToBookmarks(params.companyId)}
                  >
                    {isBookmarked() ? "Bookmarked" : "Bookmark"}
                  </Menu.Item>
                  <Menu.Item icon={<Download className="size-4" />} onClick={handlePrint}>
                    Export
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
        <Tabs.Body className="my-6 max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          <Tabs.Panel value="Overview">
            <CompanyOverview data={data} />
          </Tabs.Panel>
          <Tabs.Panel value="Basic Info">
            <BasicInfoDetails data={basicInfo} />
          </Tabs.Panel>
          <Tabs.Panel value="Addresses">
            <AddressesDetails data={{ mailingAddress, registeredAddress }} />
          </Tabs.Panel>
          <Tabs.Panel value="Contact">
            <ContactDetails data={primaryContactPerson} />
          </Tabs.Panel>
        </Tabs.Body>
      </Tabs>
      <div className="grid grid-cols-1 gap-y-6 md:hidden px-4 my-6">
        <CompanyOverview data={data} />
        <BasicInfoDetails data={basicInfo} />
        <AddressesDetails data={{ mailingAddress, registeredAddress }} />
        <ContactDetails data={primaryContactPerson} />
      </div>
    </>
  );
};
