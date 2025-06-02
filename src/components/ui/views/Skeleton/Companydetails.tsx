import cn from "@/lib/utils/cn";
import { Activity, FileText, MapPin, MoreVertical, Printer, User } from "lucide-react";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-gray-200 dark:bg-gray-800/50 rounded", className)} />
);

const SkeletonText = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-gray-200 dark:bg-gray-800/50 rounded h-4", className)} />
);

const SkeletonCircle = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-gray-200 dark:bg-gray-800/50 rounded-full", className)} />
);

export function CompanyDetailsSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-surface-2 backdrop-blur-md shadow md:shadow-none">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="rounded-lg md:mr-4 my-4 md:my-0 relative">
                  <SkeletonBox className="w-20 h-20 rounded-lg relative" />
                </div>
                <div>
                  <div className="mt-2 flex flex-col md:flex-row md:flex-wrap md:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm gap-1">
                      <SkeletonCircle className="w-10 h-10" />
                      <SkeletonText className="w-64 h-4" />
                    </div>
                    <div className="mt-2 flex items-center text-s gap-1">
                      <SkeletonCircle className="w-10 h-10" />
                      <SkeletonText className="w-64 h-4" />
                    </div>
                    <div className="mt-2 flex items-center text-sm gap-1">
                      <SkeletonCircle className="w-10 h-10" />
                      <SkeletonText className="w-64 h-4" />
                    </div>
                    <div className="mt-2 flex items-center text-sm gap-1">
                      <SkeletonCircle className="w-10 h-10" />
                      <SkeletonText className="w-64 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center md:mt-0 space-x-3">
              <SkeletonCircle className="w-10 h-10 bg-sky-500" />

              <SkeletonCircle className="w-10 h-10 bg-blue-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="hidden md:block bg-background/90 shadow">
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {[
              { icon: Activity, label: "Overview" },
              { icon: FileText, label: "Basic Info" },
              { icon: MapPin, label: "Addresses" },
              { icon: User, label: "Contact" },
            ].map((tab, index) => (
              <div key={index} className="flex gap-2 items-center justify-center h-16 px-4">
                <tab.icon className="w-5 h-5 text-gray-500" />
                <SkeletonText className="w-16" />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="p-2">
              <Printer className="h-6 w-6 text-gray-500" />
            </div>
            <div className="p-2">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="my-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <div key={item} className="bg-background/20 backdrop-blur-sm shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <SkeletonCircle className="w-10 h-10" />
                    <div className="space-y-2">
                      <SkeletonText className="w-32" />
                      <SkeletonText className="w-16 h-6" />
                    </div>
                  </div>
                </div>
                <SkeletonText className="w-full" />
              </div>
            ))}
          </div>

          <div className="bg-background/20 backdrop-blur-sm shadow rounded-lg">
            <div className="p-6 border-b border-border">
              <SkeletonText className="w-48 h-6" />
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="space-y-2">
                    <SkeletonText className="w-24 h-3" />
                    <SkeletonText className="w-40" />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border">
              <SkeletonText className="w-32 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
