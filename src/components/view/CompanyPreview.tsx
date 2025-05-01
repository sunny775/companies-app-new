import { useState } from "react";
import { 
  Building2, MapPin, User, Phone, Mail, Globe, Briefcase, 
  Users, Calendar, FileText, ChevronDown, ChevronUp
} from "lucide-react";

// Sample data - in a real app this would come from your form
const sampleData = {
  basicInfo: {
    legalName: "Acme Technologies Inc.",
    stateOfIncorporation: "California",
    industry: "Software Development",
    totalNumberOfEmployees: 150,
    numberOfFullTimeEmployees: 120,
    numberOfPartTimeEmployees: 30,
    website: "https://acmetech.example.com",
    linkedInCompanyPage: "https://linkedin.com/company/acmetech",
    facebookCompanyPage: "https://facebook.com/acmetech", 
    otherInformation: "Founded in 2015, focused on AI and cloud solutions.",
    fax: "+1 (555) 123-4567",
    dialCode: "+1",
    phone: "(555) 987-6543",
    email: "info@acmetech.example.com"
  },
  address: {
    isMailingAddressDifferentFromRegisteredAddress: true,
    registeredAddress: {
      country: "United States",
      state: "California",
      city: "San Francisco",
      street: "123 Innovation Avenue, Suite 500",
      zipCode: "94105"
    },
    mailingAddress: {
      country: "United States",
      state: "California",
      city: "Palo Alto",
      street: "456 Tech Boulevard, Floor 3",
      zipCode: "94301"
    }
  },
  contact: {
    firstName: "Sarah",
    lastName: "Johnson",
    dialCode: "+1",
    phone: "(555) 765-4321",
    email: "sarah.johnson@acmetech.example.com"
  }
};

export default function CompanyPreview() {
  const [expanded, setExpanded] = useState({
    basicInfo: true,
    address: true,
    contact: true
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const data = sampleData; // In real app, this would be props or context
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Company Preview</h1>
        <p className="text-gray-600">Review your company information before submission</p>
      </header>
      
      {/* Basic Info Section */}
      <section className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-blue-50 cursor-pointer"
          onClick={() => toggleSection('basicInfo')}
        >
          <div className="flex items-center">
            <Building2 className="text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Company Basic Information</h2>
          </div>
          {expanded.basicInfo ? 
            <ChevronUp className="text-blue-500" /> : 
            <ChevronDown className="text-blue-500" />
          }
        </div>
        
        {expanded.basicInfo && (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InfoField 
                icon={<FileText className="text-blue-500" />}
                label="Legal Name"
                value={data.basicInfo.legalName}
              />
              <InfoField 
                icon={<MapPin className="text-blue-500" />}
                label="State of Incorporation"
                value={data.basicInfo.stateOfIncorporation}
              />
              <InfoField 
                icon={<Briefcase className="text-blue-500" />}
                label="Industry"
                value={data.basicInfo.industry}
              />
              <InfoField 
                icon={<Users className="text-blue-500" />}
                label="Total Employees"
                value={data.basicInfo.totalNumberOfEmployees}
              />
              <InfoField 
                icon={<Users className="text-blue-500" />}
                label="Full-time Employees"
                value={data.basicInfo.numberOfFullTimeEmployees}
              />
              <InfoField 
                icon={<Users className="text-blue-500" />}
                label="Part-time Employees"
                value={data.basicInfo.numberOfPartTimeEmployees}
              />
            </div>
            <div>
              <InfoField 
                icon={<Globe className="text-blue-500" />}
                label="Website"
                value={data.basicInfo.website}
                isLink
              />
              <InfoField 
                icon={<Globe className="text-blue-500" />}
                label="LinkedIn"
                value={data.basicInfo.linkedInCompanyPage}
                isLink
              />
              <InfoField 
                icon={<Globe className="text-blue-500" />}
                label="Facebook"
                value={data.basicInfo.facebookCompanyPage}
                isLink
              />
              <InfoField 
                icon={<Phone className="text-blue-500" />}
                label="Phone"
                value={`${data.basicInfo.dialCode} ${data.basicInfo.phone}`}
              />
              <InfoField 
                icon={<Phone className="text-blue-500" />}
                label="Fax"
                value={data.basicInfo.fax}
              />
              <InfoField 
                icon={<Mail className="text-blue-500" />}
                label="Email"
                value={data.basicInfo.email}
              />
            </div>
            {data.basicInfo.otherInformation && (
              <div className="md:col-span-2">
                <InfoField 
                  icon={<FileText className="text-blue-500" />}
                  label="Additional Information"
                  value={data.basicInfo.otherInformation}
                  fullWidth
                />
              </div>
            )}
          </div>
        )}
      </section>
      
      {/* Address Section */}
      <section className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-green-50 cursor-pointer"
          onClick={() => toggleSection('address')}
        >
          <div className="flex items-center">
            <MapPin className="text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Company Addresses</h2>
          </div>
          {expanded.address ? 
            <ChevronUp className="text-green-500" /> : 
            <ChevronDown className="text-green-500" />
          }
        </div>
        
        {expanded.address && (
          <div className="p-5">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Registered Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AddressField 
                  label="Street"
                  value={data.address.registeredAddress.street}
                />
                <AddressField 
                  label="City"
                  value={data.address.registeredAddress.city}
                />
                <AddressField 
                  label="State"
                  value={data.address.registeredAddress.state}
                />
                <AddressField 
                  label="Zip Code"
                  value={data.address.registeredAddress.zipCode}
                />
                <AddressField 
                  label="Country"
                  value={data.address.registeredAddress.country}
                />
              </div>
            </div>
            
            {data.address.isMailingAddressDifferentFromRegisteredAddress && data.address.mailingAddress && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Mailing Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AddressField 
                    label="Street"
                    value={data.address.mailingAddress.street}
                  />
                  <AddressField 
                    label="City"
                    value={data.address.mailingAddress.city}
                  />
                  <AddressField 
                    label="State"
                    value={data.address.mailingAddress.state}
                  />
                  <AddressField 
                    label="Zip Code"
                    value={data.address.mailingAddress.zipCode}
                  />
                  <AddressField 
                    label="Country"
                    value={data.address.mailingAddress.country}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </section>
      
      {/* Contact Section */}
      <section className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-purple-50 cursor-pointer"
          onClick={() => toggleSection('contact')}
        >
          <div className="flex items-center">
            <User className="text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Primary Contact</h2>
          </div>
          {expanded.contact ? 
            <ChevronUp className="text-purple-500" /> : 
            <ChevronDown className="text-purple-500" />
          }
        </div>
        
        {expanded.contact && (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InfoField 
                icon={<User className="text-purple-500" />}
                label="Name"
                value={`${data.contact.firstName} ${data.contact.lastName}`}
              />
            </div>
            <div>
              <InfoField 
                icon={<Phone className="text-purple-500" />}
                label="Phone"
                value={`${data.contact.dialCode} ${data.contact.phone}`}
              />
              <InfoField 
                icon={<Mail className="text-purple-500" />}
                label="Email"
                value={data.contact.email}
              />
            </div>
          </div>
        )}
      </section>
      
      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
          Edit Information
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Submit Company
        </button>
      </div>
    </div>
  );
}

// Reusable Components
function InfoField({ icon, label, value, isLink = false, fullWidth = false }) {
  return (
    <div className={`mb-4 ${fullWidth ? 'col-span-2' : ''}`}>
      <div className="flex items-center mb-1">
        {icon}
        <p className="text-sm font-medium text-gray-500 ml-2">{label}</p>
      </div>
      {isLink ? (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-800">{value}</p>
      )}
    </div>
  );
}

function AddressField({ label, value }) {
  return (
    <div className="mb-3">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );
}