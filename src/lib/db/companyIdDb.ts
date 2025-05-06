import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/**
 * Minimal file-based Database for storing Company IDs 
 */
export class CompanyIdDb {
  private dbPath: string;
  private dbFile: string;
  private companyIds: string[] = [];

  private constructor(dbPath: string) {
    this.dbPath = dbPath;
    this.dbFile = path.join(dbPath, "company-ids.json");
  }

  /**
   * Create a new company ID database instance
   * @param dbPath - Directory where the database file will be stored
   */
  static async createInstance(dbPath: string): Promise<CompanyIdDb> {
    const instance = new CompanyIdDb(dbPath);
    await instance.initialize();
    return instance;
  }

  /**
   * Initialize the database, creating directory if needed
   */
  private async initialize(): Promise<void> {
    try {
      await fs.mkdir(this.dbPath, { recursive: true });

      try {
        const data = await fs.readFile(this.dbFile, "utf8");
        this.companyIds = JSON.parse(data);
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
          throw err;
        }

        this.companyIds = [];
      }
    } catch (err) {
      throw new Error(`Failed to initialize database: ${(err as Error).message}`);
    }
  }

  /**
   * Save current state to disk
   */
  private async save(): Promise<void> {
    try {
      await fs.writeFile(this.dbFile, JSON.stringify(this.companyIds, null, 2), "utf8");
    } catch (err) {
      throw new Error(`Failed to save database: ${(err as Error).message}`);
    }
  }

  /**
   * Get all company IDs
   */
  async getCompanyIds(): Promise<string[]> {
    return [...this.companyIds];
  }

  /**
   * Add a new company ID
   */
  async addCompanyId(id: string): Promise<boolean> {
    if (this.companyIds.includes(id)) {
      return false;
    }

    this.companyIds.push(id);
    await this.save();
    return true;
  }

  /**
   * Add multiple company IDs at once
   */
  async addCompanyIds(ids: string[]): Promise<string[]> {
    const newIds = ids.filter((id) => !this.companyIds.includes(id));

    if (newIds.length > 0) {
      this.companyIds.push(...newIds);
      await this.save();
    }

    return newIds;
  }

  /**
   * Remove a company ID
   */
  async removeCompanyId(id: string): Promise<boolean> {
    const initialLength = this.companyIds.length;
    this.companyIds = this.companyIds.filter((companyId) => companyId !== id);

    if (this.companyIds.length !== initialLength) {
      await this.save();
      return true;
    }

    return false;
  }
}

export const db = await CompanyIdDb.createInstance(path.join(__dirname, "data"));
