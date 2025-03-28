export interface BasicAddressInput {
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
}

export interface BasicAddress extends Partial<BasicAddressInput> {
  isMailingAddressDifferentFromRegisteredAddress?: boolean;
}

export interface Contact {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface CompanyBasicInfo {
  legalName?: string;
  stateOfIncorporation?: string;
  industry?: string;
  totalNumberOfEmployees?: number;
  numberOfFullTimeEmployees?: number;
  numberOfPartTimeEmployees?: number;
  website?: string;
  linkedInCompanyPage?: string;
  facebookCompanyPage?: string;
  otherInformation?: string;
  logoS3Key?: string;
  phone?: string;
  fax?: string;
  email?: string;
}

export interface Company extends CompanyBasicInfo {
  id: string;
  registeredAddress?: BasicAddress;
  mailingAddress?: BasicAddress;
  primaryContactPerson?: Contact;
}

export interface UpdateCompanyInput extends Omit<Company, "id"> {
  isMailingAddressDifferentFromRegisteredAddress?: boolean;
}

export interface SignedLinkData {
  url: string;
  key: string;
}

export interface SignedFileUploadInput {
  fileName: string;
  contentType: string;
}

/** GraphQL Queries */
export interface GetCompanyQuery {
  company: Company;
}

export type GetCompaniesQuery = Record<string, Company>;

export interface GetSignedUploadUrlQuery {
  signedUploadUrl: SignedLinkData;
}

export interface GetSignedDownloadUrlQuery {
  signedDownloadUrl: SignedLinkData;
}

/** GraphQL Mutations */
export interface UpdateCompanyMutation {
  updateCompany: {
    company: { id: string };
  };
}

export interface CreateCompanyMutation {
  createCompany: {
    company: { id: string };
  };
}
