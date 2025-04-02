"use client";

import Link from "next/link";
import { Company } from "@/lib/graphql/types";
import { useEffect, useState } from "react";
import { getCompanies } from "@/app/actions/companies.actions";
import apiError from "@/lib/apiError";

export default function CompaniesListPage() {
  const [companies, setCompanies] = useState<Company[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const companyIds = JSON.parse(localStorage.companyIds) || [];
        const { data, error } = await getCompanies(companyIds);
        if (error) throw error;

        setCompanies(data);
      } catch (error) {
        setError(apiError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="text-center py-6 text-gray-600">Loading companies...</div>
    );
  if (error)
    return (
      <div className="text-center py-6 text-red-500">
        Error loading companies: {error.message}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Company Profiles</h1>
      {companies?.length === 0 ? (
        <p className="text-center text-gray-500">No companies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {companies?.map((company) => (
            <div
              key={company.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col"
            >
              {/* Company Logo */}
              {company.logoS3Key ? (
                <div className="w-full h-32 relative mb-4">
                  {/**
                   * <Image
                    src={company.logoS3Key} // Replace with your logic to get a signed URL if necessary
                    alt={`${company.legalName} Logo`}
                    fill
                    className="object-contain rounded-md border"
                  />
                   */}
                </div>
              ) : (
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center mb-4 rounded">
                  <span className="text-gray-500">No Logo</span>
                </div>
              )}

              {/* Company Basic Information */}
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {company.legalName}
              </h2>
              <p className="text-gray-600 mb-2">{company.industry}</p>

              {/* Addresses */}
              <div className="text-sm text-gray-700 mb-2">
                <p className="font-medium">Registered Address:</p>
                <p>
                  {company.registeredAddress?.street},{" "}
                  {company.registeredAddress?.city},{" "}
                  {company.registeredAddress?.state},{" "}
                  {company.registeredAddress?.country}{" "}
                  {company.registeredAddress?.zipCode}
                </p>
                {company.mailingAddress &&
                  company.registeredAddress
                    ?.isMailingAddressDifferentFromRegisteredAddress && (
                    <div className="mt-2">
                      <p className="font-medium">Mailing Address:</p>
                      <p>
                        {company.mailingAddress.street},{" "}
                        {company.mailingAddress.city},{" "}
                        {company.mailingAddress.state},{" "}
                        {company.mailingAddress.country}{" "}
                        {company.mailingAddress.zipCode}
                      </p>
                    </div>
                  )}
              </div>

              {/* Contact Details */}
              {company.primaryContactPerson && (
                <div className="text-sm text-gray-700 mb-2">
                  <p className="font-medium">Contact:</p>
                  <p>
                    {company.primaryContactPerson.firstName}{" "}
                    {company.primaryContactPerson.lastName}
                  </p>
                  <p>Email: {company.primaryContactPerson.email}</p>
                  <p>Phone: {company.primaryContactPerson.phone}</p>
                </div>
              )}

              {/* Other Information and Socials */}
              <div className="mt-auto">
                {company.website && (
                  <p className="text-sm text-blue-500">
                    <Link href={company.website} target="_blank">
                      Website
                    </Link>
                  </p>
                )}
                {company.linkedInCompanyPage && (
                  <p className="text-sm text-blue-500">
                    <Link href={company.linkedInCompanyPage} target="_blank">
                      LinkedIn
                    </Link>
                  </p>
                )}
                {company.facebookCompanyPage && (
                  <p className="text-sm text-blue-500">
                    <Link href={company.facebookCompanyPage} target="_blank">
                      Facebook
                    </Link>
                  </p>
                )}
                {company.otherInformation && (
                  <p className="text-sm text-gray-500 mt-2">
                    {company.otherInformation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
