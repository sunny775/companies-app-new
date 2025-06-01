import { Companies } from "@/components/ui/views/Companies";
import { CompaniesListSkeleton } from "@/components/ui/views/Skeleton/CompaniesList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Companies App | Companies List",
  description: "List of all companies created on this app",
};

export default async function Page() {
  return (
    <Suspense fallback={<CompaniesListSkeleton />}>
      <Companies />
    </Suspense>
  );
}
