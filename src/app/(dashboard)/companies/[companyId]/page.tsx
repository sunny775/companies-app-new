import { getCompany } from "@/app/actions/companies.actions";
import CompanyDetails from "@/components/views/CompanyDetails";
import { Custom404 } from "@/components/views/Custom404/Custom404";
import { Metadata } from "next";

type Props = {
  params: Promise<{ companyId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const companyId = (await params).companyId;

  const { data } = await getCompany(companyId);

  return {
    title: data?.legalName,
    description: data?.otherInformation || data?.legalName,
  };
}

export default async function CompanyProfile(props: { params: Promise<{ companyId: string }> }) {
  const params = await props.params;

  const { data: company, loading, error } = await getCompany(params.companyId);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  if (error) {
    const errorMsg = error.message.toLowerCase();

    if (errorMsg.includes("company not found") || errorMsg.includes("invalid input syntax for type uuid")) {
      return <Custom404 />;
    }

    return <p className="text-center text-red-500">{errorMsg}</p>;
  }

  return <CompanyDetails data={company} />;
}
