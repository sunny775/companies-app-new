const data = {
  firstName: "Sarah",
  lastName: "Johnson",
  dialCode: "+1",
  phone: "(555) 765-4321",
  email: "sarah.johnson@acmetech.example.com",
};

export function ContactDetails() {
  return (
    <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-border">
        <h3 className="text-lg leading-6 font-medium">Primary Contact Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted">Main point of contact for this company.</p>
      </div>
      <div>
        <div className="flex flex-col md:flex-row">
          <div className="py-10 px-6 border-b md:border-b-0 md:border-r border-border md:w-60">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
                {data.firstName.charAt(0)}
                {data.lastName.charAt(0)}
              </div>
              <h4 className="mt-4 text-lg font-medium">
                {data.firstName} {data.lastName}
              </h4>
              <p className="text-sm text-muted">Primary Contact</p>
            </div>
          </div>

          <div className="py-6 px-8 flex-1">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-muted">Full name</dt>
                <dd className="mt-1 text-sm">
                  {data.firstName} {data.lastName}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-muted">Role</dt>
                <dd className="mt-1 text-sm">Primary Contact</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-muted">Email</dt>
                <dd className="mt-1 text-sm">
                  <a href={`mailto:${data.email}`} className="text-blue-600 dark:text-blue-300">
                    {data.email}
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-muted">Phone number</dt>
                <dd className="mt-1 text-sm">
                  {data.dialCode} {data.phone}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
