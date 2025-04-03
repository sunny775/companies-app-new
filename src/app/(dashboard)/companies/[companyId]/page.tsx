import { getCompany } from "@/app/actions/companies.actions";import { globe } from "@/assets";
import { FacebookIcon } from "@/assets/BrandIcons";
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

  return (
    <div className="max-w-4xl p-6 mx-auto mt-16 space-y-6 text-gray-600 capitalize rounded shadow bg-surface dark:text-gray-400">
    {/* ✅ Logo & Basic Info */}
    <div className="flex items-center space-x-6">
      {company?.logoS3Key && (
        <Image
          src={globe} // Replace with actual image URL logic
          alt="Company Logo"
          width={100}
          height={100}
          className="border rounded-lg shadow-sm"
        />
      )}
      <div>
        <h1 className="text-2xl font-bold text-green-600 uppercase">{company?.legalName}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-200">{company?.industry}</p>
        <p className="text-xs text-gray-500">{company?.stateOfIncorporation}</p>
      </div>
    </div>

    {/* ✅ Address Section */}
    <div className="p-4 transition-all border border-green-100 rounded-md shadow-sm hover:shadow-md bg-surface dark:bg-green-600/2 dark:border-green-600/5">
      <h2 className="text-lg font-semibold text-green-600">📍 Address</h2>
      <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
        <div>
          <p className="font-semibold text-gray-800 dark:text-gray-200">Registered Address</p>
          <p>
            {company?.registeredAddress?.street}, {company?.registeredAddress?.city},{" "}
            {company?.registeredAddress?.state}, {company?.registeredAddress?.country},{" "}
            {company?.registeredAddress?.zipCode}
          </p>
        </div>
        {company?.mailingAddress && (
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Mailing Address</p>
            <p>
              {company?.mailingAddress?.street}, {company?.mailingAddress?.city},{" "}
              {company?.mailingAddress?.state}, {company?.mailingAddress?.country},{" "}
              {company?.mailingAddress?.zipCode}
            </p>
          </div>
        )}
      </div>
    </div>

    {/* ✅ Contact Details */}
    <div className="p-4 transition-all border border-green-100 rounded-md shadow-sm hover:shadow-md bg-surface dark:bg-green-600/2 dark:border-green-600/5">
      <h2 className="text-lg font-semibold text-green-600">📞 Contact</h2>
      <div className="mt-2 space-y-1 text-sm">
        <p>
          <span className="font-medium">Name:</span>{" "}
          {company?.primaryContactPerson?.firstName}{" "}
          {company?.primaryContactPerson?.lastName}
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a
            href={`mailto:${company?.primaryContactPerson?.email}`}
            className="text-blue-500 hover:underline"
          >
            {company?.primaryContactPerson?.email}
          </a>
        </p>
        <p>
          <span className="font-medium">Phone:</span>{" "}
          {company?.primaryContactPerson?.phone}
        </p>
      </div>
    </div>

    {/* ✅ Social Links */}
    <div className="p-4 transition-all border border-green-100 rounded-md shadow-sm hover:shadow-md bg-surface dark:bg-green-600/2 dark:border-green-600/5">
      <h2 className="text-lg font-semibold text-green-600">🔗 Social & Website</h2>
      <div className="flex mt-2 space-x-4">
        {company?.website && (
          <Link href={company.website} target="_blank" className="text-blue-500 hover:underline">
            🌍 Website
          </Link>
        )}
        {company?.linkedInCompanyPage && (
          <Link
            href={company.linkedInCompanyPage}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            🔗 LinkedIn
          </Link>
        )}
        {company?.facebookCompanyPage && (
          <Link
            href={company.facebookCompanyPage}
            target="_blank"
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <FacebookIcon className="size-4 fill-blue-600" /> Facebook
          </Link>
        )}
      </div>
    </div>

    {/* ✅ Additional Info */}
    {company?.otherInformation && (
      <div className="p-4 transition-all border border-green-100 rounded-md shadow-sm hover:shadow-md bg-surface dark:bg-green-600/2 dark:border-green-600/5">
        <h2 className="flex items-center gap-1 text-lg font-semibold text-green-600"><Book className="size-4 fill-green-50 dark:fill-green-400"/> Other Information</h2>
        <p className="mt-2 text-sm">{company.otherInformation}</p>
      </div>
    )}

    {/* ✅ Employees */}
    <div className="p-4 transition-all border border-green-100 rounded-md shadow-sm hover:shadow-md bg-surface dark:bg-green-600/2 dark:border-green-600/5">
      <h2 className="text-lg font-semibold text-green-600">👥 Employees</h2>
      <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
        <p>
          <span className="font-medium">Total Employees:</span>{" "}
          {company?.totalNumberOfEmployees ?? "N/A"}
        </p>
        <p>
          <span className="font-medium">Full-Time:</span>{" "}
          {company?.numberOfFullTimeEmployees ?? "N/A"}
        </p>
        <p>
          <span className="font-medium">Part-Time:</span>{" "}
          {company?.numberOfPartTimeEmployees ?? "N/A"}
        </p>
      </div>
    </div>
  </div>
  );
};
