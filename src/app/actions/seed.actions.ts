"use server";

import fs from "fs";
import { lookup } from "mime-types";
import path, { basename, extname } from "path";
import { createCompany } from "./companies.actions";
import companyDatasets from "./companyDataset";
import { db } from "@/lib/db/companyIdDb";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


class LocalFileData {
  arrayBuffer: ArrayBuffer[];
  name: string;
  type: string | undefined;

  constructor(path: string) {
    const buffer = fs.readFileSync(path);
    this.arrayBuffer = [buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)] as ArrayBuffer[];
    this.name = basename(path);
    this.type = lookup(extname(path)) || undefined;
  }
}

function constructFileFromLocalFileData(localFileData: LocalFileData) {
  return new File(localFileData.arrayBuffer, localFileData.name, {
    type: localFileData.type,
  });
}

export const generateCompany = async ({ index, ...rest }: (typeof companyDatasets)[0] & { index: number }) => {
  try {
    const filePath = path.join(__dirname, "img", `${index + 1}.jpg`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const fileData = new LocalFileData(filePath);
    const file = constructFileFromLocalFileData(fileData);

    const data = await createCompany(rest, file);

    return data.company?.id;
  } catch (error) {
    console.log(error);
  }
};

export const generateCompanies = async () => {
  try {
    const companyIds = await Promise.all(
      companyDatasets.map((company, index) => generateCompany({ index, ...company }))
    );

    console.log(companyIds);

    return db.addCompanyIds(companyIds.filter(Boolean) as string[]);
  } catch (error) {
    console.log(error);
  }
};
