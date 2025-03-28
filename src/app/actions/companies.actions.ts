"use server";

import apiError from "@/lib/apiError";
import { getClient } from "@/lib/apolloClient";
import { companyIdsVar } from "@/lib/apolloClient";
import { CREATE_COMPANY, UPDATE_COMPANY } from "@/lib/graphql/mutations";
import { GET_COMPANIES, GET_COMPANY } from "@/lib/graphql/queries";
import { UpdateCompanyInput } from "@/lib/graphql/types";

export async function getCompany(id: string) {
  try {
    const { data, loading } = await getClient().query({
      query: GET_COMPANY,
      variables: { id },
    });
    return { data: data.company, loading };
  } catch (error) {
    return { error: apiError(error) };
  }
}

export async function getCompanies(companyIds: string[] = companyIdsVar()) {
  if (!companyIds.length) {
    return { data: [], loading: false };
  }
  try {
    const { data, loading } = await getClient().query({
      query: GET_COMPANIES(companyIds),
    });
    return { data: Object.values(data), loading };
  } catch (error) {
    console.log(error);

    return { error: apiError(error) };
  }
}

export async function createCompany(input: UpdateCompanyInput) {
  try {
    const { data } = await getClient().mutate({
      mutation: CREATE_COMPANY,
      variables: { input },
    });

    console.log(data);
    console.log("companiesVar:", companyIdsVar())

    const company = data?.createCompany.company;
    if (company?.id) companyIdsVar([...companyIdsVar(), company?.id]);
    return { company };
  } catch (error) {
    console.log(error);

    return { error: apiError(error) };
  }
}

export async function updateCompany(input: UpdateCompanyInput) {
  try {
    const { data } = await getClient().mutate({
      mutation: UPDATE_COMPANY,
      variables: { input },
    });
    return { company: data?.updateCompany.company };
  } catch (error) {
    console.log(error);

    return { error: apiError(error) };
  }
}
