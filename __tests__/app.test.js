const app = require("../app");
const testUsers = require("../data/testData/testUsers");
const mongoose = require("mongoose");
const { seed } = require("../data/seed");
const request = require("supertest");

beforeAll(async () => {
  return seed(testUsers);
});

afterAll(() => {
  mongoose.connection.close();
});

describe("GET /users", () => {
  test("200: should return an array of all users in the database", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        users.forEach((user) => {
          expect(user).toHaveProperty("_id", expect.any(String));
          expect(user).toHaveProperty("username", expect.any(String));
          expect(user).toHaveProperty("goal", expect.any(String));
          expect(user).toHaveProperty("weight", expect.any(Number));
          expect(user).toHaveProperty("height", expect.any(Number));
          expect(user).toHaveProperty("age", expect.any(Number));
          expect(user).toHaveProperty("sex", expect.any(String));
          expect(user).toHaveProperty("calories", expect.any(Number));
          expect(user).toHaveProperty("workouts", expect.any(Array));
          expect(user).toHaveProperty("admin", expect.any(Boolean));
        });
      });
  });
});
