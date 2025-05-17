import { BasicAddress } from "@/lib/graphql/types";
import { MapPin } from "lucide-react";

interface Data {
  registeredAddress?: BasicAddress;
  mailingAddress?: BasicAddress;
}

interface Props {
  data: Data;
}

export function AddressesDetails({ data }: Props) {
  const getMapLink = (address: BasicAddress) => {
    const { street, city, zipCode, state, country } = address;

    return `https://www.google.com/maps/place/${street?.trim()}, ${city?.trim()} ${zipCode?.trim()}, ${state?.trim()}, ${country?.trim()}`.replace(
      / /g,
      "+"
    );
  };
  return (
    <div className="space-y-6 w-full">
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
              <p className="text-base">{data.registeredAddress?.street}</p>
              <p className="text-base">
                {data.registeredAddress?.city}, {data.registeredAddress?.state} {data.registeredAddress?.zipCode}
              </p>
              <p className="text-base">{data.registeredAddress?.country}</p>
            </address>
          </div>
        </div>
        <div className="bg-surface-2 border-t border-border px-4 py-4 sm:px-6">
          <a
            className="flex items-center"
            target="_blank"
            href={data.registeredAddress && getMapLink(data.registeredAddress)}
          >
            <MapPin className="mr-1.5 h-4 w-4 text-muted" />
            View on Map
          </a>
        </div>
      </div>

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
              <p className="text-base">{data.mailingAddress?.street}</p>
              <p className="text-base">
                {data.mailingAddress?.city}, {data.mailingAddress?.state} {data.mailingAddress?.zipCode}
              </p>
              <p className="text-base">{data.mailingAddress?.country}</p>
            </address>
          </div>
        </div>
        <div className="bg-surface-2 border-t border-border px-4 py-4 sm:px-6">
          <a
            className="flex items-center"
            target="_blank"
            href={data.mailingAddress && getMapLink(data.mailingAddress)}
          >
            <MapPin className="mr-1.5 h-4 w-4 text-muted" />
            View on Map
          </a>
        </div>
      </div>
    </div>
  );
}
