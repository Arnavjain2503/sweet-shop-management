const request = require("supertest");
const app = require("../src/app");

let adminToken;
let userToken;
let sweetId;

beforeEach(async () => {
  const adminRes = await request(app)
    .post("/api/auth/register")
    .send({
      email: "admin@test.com",
      password: "123456",
      role: "ADMIN"
    });

  adminToken = adminRes.body.token;

  const userRes = await request(app)
    .post("/api/auth/register")
    .send({
      email: "user@test.com",
      password: "123456"
    });

  userToken = userRes.body.token;
});

describe("Sweets API", () => {
  test("admin can create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 50,
        quantity: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Ladoo");

    sweetId = res.body._id;
  });

  test("user cannot create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 40,
        quantity: 5
      });

    expect(res.statusCode).toBe(403);
  });

  test("user can view sweets list", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
