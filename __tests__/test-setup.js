import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { beforeAll, afterAll, afterEach } from "vitest";

process.env.MONGOMS_DISABLE_POSTINSTALL = "1";
process.env.JWT_SECRET = "testsecret123";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.syncIndexes();
});

afterEach(async () => {

  const collections =
    mongoose.connection.collections;

  for (const key in collections) {

    await collections[key].deleteMany({});

  }

});

afterAll(async () => {

  await mongoose.disconnect();

  await mongoServer.stop();
});