const mongoose = require("mongoose");

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecret";
  await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop_test");
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
