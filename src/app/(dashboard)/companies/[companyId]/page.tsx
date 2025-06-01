import CompanyDetails from "@/components/ui/views/CompanyDetails";
import { CompanyDetailsSkeleton } from "@/components/ui/views/Skeleton/Companydetails";
import { GET_COMPANY } from "@/lib/graphql/queries";
import { Company } from "@/lib/graphql/types";
import { getClient, PreloadQuery } from "@/lib/utils/apolloClient";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: Promise<{ companyId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const companyId = (await params).companyId;

  let company: Company | null = null;

  try {
    const { data } = await getClient().query({
      query: GET_COMPANY,
      variables: { id: companyId },
    });
    company = data.company;
  } catch (error) {
    console.error(error);
  }

  return {
    title: company?.legalName,
    description: company?.otherInformation || company?.legalName,
  };
}

export default async function CompanyProfile(props: { params: Promise<{ companyId: string }> }) {
  const params = await props.params;

  return (
    <PreloadQuery
      query={GET_COMPANY}
      variables={{
        id: params.companyId,
      }}
    >
      <Suspense fallback={<CompanyDetailsSkeleton />}>
        <CompanyDetails />
      </Suspense>
    </PreloadQuery>
  );
}
