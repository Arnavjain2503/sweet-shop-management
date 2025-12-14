const request = require("supertest");
const app = require("../src/app");

let adminToken;
let userToken;
let sweetId;

beforeEach(async () => {
  adminToken = (
    await request(app).post("/api/auth/register").send({
      email: "admin@test.com",
      password: "123456",
      role: "ADMIN"
    })
  ).body.token;

  userToken = (
    await request(app).post("/api/auth/register").send({
      email: "user@test.com",
      password: "123456"
    })
  ).body.token;

  sweetId = (
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Jalebi",
        category: "Indian",
        price: 30,
        quantity: 1
      })
  ).body._id;
});

describe("Inventory API", () => {
  test("user can purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(0);
  });

  test("cannot purchase when out of stock", async () => {
    await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(400);
  });

  test("admin can restock sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(6);
  });

  test("user cannot restock sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(403);
  });

  test("should reject restock with invalid amount", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: -10 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Restock amount must be a positive number");
  });

});
