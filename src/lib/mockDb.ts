import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";

const mockDb = createStorage({
  driver: memoryDriver(),
});

export default mockDb;
