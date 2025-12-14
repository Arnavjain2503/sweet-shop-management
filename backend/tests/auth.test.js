const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {
  test("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "user1@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("should login an existing user", async () => {
    await request(app).post("/api/auth/register").send({
      email: "user2@test.com",
      password: "123456"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user2@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("should reject login with wrong password", async () => {
    await request(app).post("/api/auth/register").send({
      email: "user3@test.com",
      password: "123456"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user3@test.com",
        password: "wrongpass"
      });

    expect(res.statusCode).toBe(401);
  });
});
