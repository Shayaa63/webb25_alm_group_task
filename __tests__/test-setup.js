const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { beforeAll, afterAll, afterEach } = require("vitest");

let mongoServer;
process.env.JWT_SECRET = "testsecret123";

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
