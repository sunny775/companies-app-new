"use server";

import apiError from "@/lib/apiError";
import { getClient } from "@/lib/apolloClient";
import { db } from "@/lib/db/companyIdDb";
import { CREATE_COMPANY, UPDATE_COMPANY } from "@/lib/graphql/mutations";
import { GET_COMPANIES, GET_COMPANY } from "@/lib/graphql/queries";
import { UpdateCompanyInput } from "@/lib/graphql/types";
import { uploadFile } from "./files.actions";

export async function getCompany(id: string) {
  try {
    const { data } = await getClient().query({
      query: GET_COMPANY,
      variables: { id },
    });
    return { data: data.company };
  } catch (error) {
    return { error: apiError(error) };
  }
}

export async function getCompanies(companyIds: string[]) {
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

export async function createCompany(args: UpdateCompanyInput, file: File) {
  await db.addCompanyId("test id");

  return {company: {id: ""}, error: null}
  /* try {
    const { data: uploadResponse, error: uploadError } = await uploadFile(file);

    if (uploadError) throw uploadError;

    const input: UpdateCompanyInput = {
      ...args,
      logoS3Key: uploadResponse.s3Key,
    };

    const { data } = await getClient().mutate({
      mutation: CREATE_COMPANY,
      variables: { input },
    });

    console.log(data);

    const company = data?.createCompany.company;

    if (company) await db.addCompanyId(company?.id);

    return { company };
  } catch (error) {
    console.log(error);

    return { error: apiError(error) };
  } */
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
