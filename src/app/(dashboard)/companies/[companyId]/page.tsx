import { getCompany } from "@/app/actions/companies.actions";
import { downloadImageFile } from "@/app/actions/files.actions";
import CompanyDetails from "@/components/view/CompanyDetails";
export default async function CompanyProfile(props: { params: Promise<{ companyId: string }> }) {
  const params = await props.params;

  const { data: company, loading, error } = await getCompany(params.companyId);


  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading company</p>;

  const logo = await downloadImageFile(company.logoS3Key!);

  return <CompanyDetails data={company} logo={logo} />;
}
