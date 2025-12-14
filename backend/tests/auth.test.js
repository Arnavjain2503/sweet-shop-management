const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {
  test(
    "register user",
    async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          email: "a@test.com",
          password: "123456"
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.token).toBeDefined();
    },
    10000
  );
});
