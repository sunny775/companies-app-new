import { gql, TypedDocumentNode } from "@apollo/client";
import { CreateCompanyMutation, UpdateCompanyInput, UpdateCompanyMutation } from "./types";

export const CREATE_COMPANY: TypedDocumentNode<CreateCompanyMutation, { input: UpdateCompanyInput }> = gql`
  mutation CreateCompany($input: UpdateCompanyInput!) {
    createCompany(input: $input) {
      company {
        id
      }
    }
  }
`;

export const UPDATE_COMPANY: TypedDocumentNode<
  UpdateCompanyMutation,
  { companyId: string; input: UpdateCompanyInput }
> = gql`
  mutation UpdateCompany($companyId: ID!, $input: UpdateCompanyInput!) {
    updateCompany(companyId: $companyId, input: $input) {
      company {
        id
        logoS3Key
      }
    }
  }
`;
