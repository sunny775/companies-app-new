import fs from "fs/promises";
import path from "path";

// Define types for table schemas
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
  [key: string]: JSONValue;
}

type JSONArray = Array<JSONValue>;

export type TableSchema = Record<string, JSONValue>;

export type DatabaseSchema = {
  users: User[];
} & Record<Exclude<string, "users">, TableSchema[]>;

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === "object" && error !== null && "code" in error;
}

const DB_FILE = path.resolve(__dirname, "mock-db.json");

class MockDB {
  private data: DatabaseSchema = { users: [] };

  constructor() {}

  async load(): Promise<void> {
    try {
      const fileData = await fs.readFile(DB_FILE, "utf8");
      this.data = JSON.parse(fileData) as DatabaseSchema;
    } catch (error: unknown) {
      if (isErrnoException(error) && error.code === "ENOENT") {
        await this.save();
      } else {
        console.error("Error loading database:", error);
      }
    }
  }

  async save(): Promise<void> {
    await fs.writeFile(DB_FILE, JSON.stringify(this.data, null, 2));
  }

  table<T extends TableSchema>(tableName: keyof DatabaseSchema) {
    return new QueryBuilder<T>(this, tableName);
  }

  getTableData<T extends TableSchema>(tableName: keyof DatabaseSchema): T[] {
    return (this.data[tableName] || []) as T[];
  }

  setTableData<T extends TableSchema>(
    tableName: keyof DatabaseSchema,
    newData: T[]
  ): void {
    this.data[tableName] = newData;
  }
}

class QueryBuilder<T extends TableSchema> {
  private db: MockDB;
  private tableName: keyof DatabaseSchema;
  private insertData: T | null = null;

  constructor(db: MockDB, tableName: keyof DatabaseSchema) {
    this.db = db;
    this.tableName = tableName;
  }

  insert(data: Omit<T, "id">): this {
    const tableData = this.db.getTableData<T>(this.tableName);
    const id = tableData.length + 1;

    const newData = { id, ...data } as T & { id: number };

    tableData.push(newData);
    this.db.setTableData<T>(this.tableName, tableData);
    this.insertData = newData;
    return this;
  }

  async returning<K extends keyof T>(
    fields?: Record<K, boolean>
  ): Promise<Partial<T>> {
    await this.db.save();
    return fields
      ? this.pickFields(this.insertData!, fields)
      : this.insertData!;
  }

  private pickFields<K extends keyof T>(
    data: T,
    fields: Record<K, boolean>
  ): Partial<T> {
    return Object.keys(fields).reduce<Partial<T>>((acc, key) => {
      if (data[key as K] !== undefined) {
        acc[key as K] = data[key as K];
      }
      return acc;
    }, {});
  }
}

const mockDb = new MockDB();
await mockDb.load();
export default mockDb;
