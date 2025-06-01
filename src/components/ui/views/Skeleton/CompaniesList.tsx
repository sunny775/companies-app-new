export const CompaniesListSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-gray-100 dark:bg-gray-600/10 shadow">
        <div className="max-w-[90vw] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center sm:justify-between items-center animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800/50 rounded-lg w-32 hidden sm:block"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800/50 rounded-lg w-full sm:w-40"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[90vw] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-gray-100 dark:bg-gray-600/10 rounded-lg shadow mb-6">
          <div className="animate-pulse">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
              <div className="md:max-w-xl w-full">
                <div className="h-10 bg-gray-200 dark:bg-gray-800/50 rounded-lg"></div>
              </div>

              <div className="flex gap-2 flex-col md:flex-row md:items-center">
                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800/50 rounded-lg"></div>
                <div className="h-10 w-20 bg-gray-200 dark:bg-gray-800/50 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-surface shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-gray-100 dark:bg-gray-600/10">
                <tr className="animate-pulse">
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-20"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-16"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-20"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-16"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-14"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-12"></div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-surface divide-y divide-border">
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800/50 rounded-lg"></div>
                        <div className="ml-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-32 mb-1"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-800/50 rounded w-24"></div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-800/50 rounded w-16"></div>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-12 mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-800/50 rounded w-16"></div>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-800/50 rounded w-16"></div>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="max-w-24">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-20 mb-1"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-800/50 rounded w-16"></div>
                      </div>
                    </td>

                    <td className="p-4 whitespace-nowrap text-right">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-8 ml-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav className="bg-gray-100 dark:bg-gray-600/10 px-4 py-3 flex items-center justify-between border-t border-border sm:px-6">
            <div className="hidden sm:block animate-pulse">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-12"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-12"></div>
              </div>
            </div>
            <div className="flex-1 flex gap-2 justify-between sm:justify-end animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-800/50 rounded-lg w-20"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-800/50 rounded-lg w-16"></div>
            </div>
          </nav>
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-600/10 border-t border-border animate-pulse">
        <div className="max-w-[90vw] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded w-24"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};
