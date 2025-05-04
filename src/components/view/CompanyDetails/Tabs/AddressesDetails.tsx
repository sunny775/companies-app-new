import Button from "@/components/atoms/Button";
import { Download, MapPin } from "lucide-react";

const data = {
  isMailingAddressDifferentFromRegisteredAddress: true,
  registeredAddress: {
    country: "United States",
    state: "California",
    city: "San Francisco",
    street: "123 Innovation Avenue, Suite 500",
    zipCode: "94105",
  },
  mailingAddress: {
    country: "United States",
    state: "California",
    city: "Palo Alto",
    street: "456 Tech Boulevard, Floor 3",
    zipCode: "94301",
  },
}

export function AddressesDetails() {
  return (
    <div className="space-y-6 w-full">
      {/* Registered Address */}
      <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-border">
          <h3 className="text-lg leading-6 font-medium">
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-blue-600" />
              Registered Address
            </div>
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">Official company registration address.</p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <div>
            <address className="not-italic">
              <p className="text-base">{data.registeredAddress.street}</p>
              <p className="text-base">
                {data.registeredAddress.city}, {data.registeredAddress.state}{" "}
                {data.registeredAddress.zipCode}
              </p>
              <p className="text-base">{data.registeredAddress.country}</p>
            </address>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-surface-2 px-4 py-4 sm:px-6">
          <div className="flex items-center space-x-2">
          <Button className="flex items-center">
              <MapPin className="mr-1.5 h-4 w-4 text-muted" />
              View on Map
            </Button>
            <Button className="flex items-center">
              <Download className="mr-1.5 h-4 w-4 text-muted" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Mailing Address */}
      {data.isMailingAddressDifferentFromRegisteredAddress && data.mailingAddress && (
        <div className="bg-surface shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-border">
            <h3 className="text-lg leading-6 font-medium">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                Mailing Address
              </div>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-muted">Address for correspondence and deliveries.</p>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <div className="prose max-w-none">
              <address className="not-italic">
                <p className="text-base">{data.mailingAddress.street}</p>
                <p className="text-base">
                  {data.mailingAddress.city}, {data.mailingAddress.state}{" "}
                  {data.mailingAddress.zipCode}
                </p>
                <p className="text-base">{data.mailingAddress.country}</p>
              </address>
            </div>
          </div>
          <div className="bg-surface-2 px-4 py-4 sm:px-6">
            <div className="flex items-center space-x-2">
              <Button className="flex items-center">
                <MapPin className="mr-1.5 h-4 w-4 text-muted" />
                View on Map
              </Button>
              <Button className="flex items-center">
                <Download className="mr-1.5 h-4 w-4 text-muted" />
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
