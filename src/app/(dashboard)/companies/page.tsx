import { Companies } from "@/components/ui/views/Companies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies App | Companies List",
  description: "List of all companies created on this app",
};

export default async function Page() {
  return <Companies />;
}
