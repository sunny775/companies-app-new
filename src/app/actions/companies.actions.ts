"use server";

import { getDb } from "@/lib/db/companyIdDb";
import { CREATE_COMPANY, UPDATE_COMPANY } from "@/lib/graphql/mutations";
import { GET_COMPANY } from "@/lib/graphql/queries";
import { Company, UpdateCompanyInput } from "@/lib/graphql/types";
import apiError from "@/lib/utils/apiError";
import { getClient } from "@/lib/utils/apolloClient";
import { uploadFile } from "./upload.actions";

export async function getCompany(id: string) {
  try {
    const { data, loading } = await getClient().query({
      query: GET_COMPANY,
      variables: { id },
    });
    console.log(data);
    return { data: data.company, loading };
  } catch (error) {
    return { error: apiError(error) };
  }
}

export async function getCompanies() {
  const db = await getDb();
  const companyIds = await db.getCompanyIds();

  if (!companyIds.length) {
    return { data: [], loading: false };
  }

  try {
    const results = await Promise.all(
      companyIds.map(async (id) => {
        const { data } = await getClient().query({
          query: GET_COMPANY,
          variables: { id },
        });
        return data.company;
      })
    );

    return { data: results, loading: false };
  } catch (error) {
    return { error: apiError(error) };
  }
}

export async function createCompany(args: UpdateCompanyInput, file: File) {
  try {
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

    const company = data?.createCompany.company;

    //delete
    console.log(data);

    const db = await getDb();

    if (company) await db.addCompanyId(company?.id);

    return { company };
  } catch (error) {
    console.log(error);

    return { error: apiError(error) };
  }
}

export async function updateCompany(company: Company, file: File) {
  try {
    const { data: uploadResponse, error: uploadError } = await uploadFile(file);

    if (uploadError) throw uploadError;

    const { id: companyId, ...updateCompanyInput } = company;

    const input: UpdateCompanyInput = {
      ...updateCompanyInput,
      logoS3Key: uploadResponse.s3Key,
    };

    const client = getClient();

    const { data } = await client.mutate({
      mutation: UPDATE_COMPANY,
      variables: { input, companyId },
    });

    if (data) {
      console.log("Cache before eviction:", client.cache.extract());
      console.log("Cache update failed, evicting all company queries");
      client.cache.evict({
        /* fieldName: "getCompany",*/
        id: client.cache.identify({
          __typename: "Company",
          id: data.updateCompany.company.id,
        }),
      });
      client.cache.gc();
      console.log("After before eviction:", client.cache.extract());
    }

    return { company: data?.updateCompany.company };
  } catch (error) {
    console.log(error);

    return { error: apiError(error) };
  }
}
