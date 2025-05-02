import { getCompany } from "@/app/actions/companies.actions";import { globe } from "@/assets";
import { FacebookIcon } from "@/assets/BrandIcons";
import CompanyDetails2 from "@/components/view/CompanyDetails";
import { Book } from "lucide-react";
;
import Image from "next/image";
import Link from "next/link";

export default async function CompanyProfile(props: {
  params: Promise<{ companyId: string }>;
}) {
  const params = await props.params;

  const { data: company, loading, error } = await getCompany(params.companyId);


  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading company</p>;

  return <CompanyDetails2 />

}