import { gql, TypedDocumentNode } from "@apollo/client";
import { GetCompanyQuery, GetSignedDownloadUrlQuery, GetSignedUploadUrlQuery, SignedFileUploadInput } from "./types";

export const COMPANY_INFO_FRAGMENT = gql`
  fragment CompanyFeilds on Company {
    id
    legalName
    stateOfIncorporation
    industry
    totalNumberOfEmployees
    numberOfFullTimeEmployees
    numberOfPartTimeEmployees
    website
    linkedInCompanyPage
    facebookCompanyPage
    otherInformation
    primaryContactPerson {
      firstName
      lastName
      email
      phone
    }
    logoS3Key
    phone
    fax
    email
    registeredAddress {
      country
      state
      city
      street
      zipCode
    }
    mailingAddress {
      country
      state
      city
      street
      zipCode
    }
  }
`;

export const GET_COMPANY: TypedDocumentNode<GetCompanyQuery, { id: string }> = gql`
  query GetCompany($id: String!) {
    company: getCompany(id: $id) {
      ...CompanyFeilds
    }
  }
  ${COMPANY_INFO_FRAGMENT}
`;

/* export const GET_COMPANIES = (companyIds: string[]): TypedDocumentNode<GetCompaniesQuery> => gql`
  query GetCompanies {
    ${companyIds
      .map(
        (id, index) => `
        company${index}: getCompany(id: "${id}") {
          ...CompanyFeilds
        }
      `
      )
      .join("\n")}
  }
  ${COMPANY_INFO_FRAGMENT}
`; */

export const GET_COMPANY_IDS: TypedDocumentNode<{ companyIds: string[] }> = gql`
  query GetCompanyIds {
    companyIds @client
  }
`;

export const GET_SIGNED_UPLOAD_URL: TypedDocumentNode<GetSignedUploadUrlQuery, { input: SignedFileUploadInput }> = gql`
  query GetSignedUploadUrl($input: SignedFileUploadInput!) {
    signedUploadUrl: getSignedUploadUrl(input: $input) {
      url
      key
    }
  }
`;

export const GET_SIGNED_DOWNLOAD_URL: TypedDocumentNode<GetSignedDownloadUrlQuery, { s3Key: string }> = gql`
  query GetSignedDownloadUrl($s3Key: String!) {
    signedDownloadUrl: getSignedDownloadUrl(s3Key: $s3Key) {
      url
      key
    }
  }
`;
