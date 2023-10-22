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

describe("GET /:username", () => {
  test("200: should respond with the specified user object", () => {
    return request(app)
      .get("/api/users/user1")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toHaveProperty("_id", expect.any(String));
        expect(user.username).toBe("user1");
        expect(user.goal).toBe("lose fat");
        expect(user.weight).toBe(92);
        expect(user.height).toBe(181);
        expect(user.age).toBe(27);
        expect(user.sex).toBe("M");
        expect(user.calories).toBe(0);
        expect(user).toHaveProperty("workouts", expect.any(Array));
        expect(user.admin).toBe(true);
      });
  });
  test("400: should respond with a Bad Request if given invalid username", () => {
    return request(app)
      .get("/api/users/x")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad Request");
      });
  });
  test("404: should respond Not Found if user does not exist", () => {
    return request(app)
      .get("/api/users/user9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not Found");
      });
  });
});

describe("POST /users", () => {
  test("201: should post a new user to the database", () => {
    const user11 = {
      username: "user11",
      goal: "maintain weight",
      weight: 70,
      height: 175,
      age: 30,
      sex: "M",
      calories: 0,
      admin: false,
      workouts: [],
    };
    return request(app)
      .post("/api/users")
      .send(user11)
      .expect(201)
      .then(({ body }) => {
        const { newUser } = body;
        expect(newUser).toMatchObject({
          ...user11,
          _id: expect.any(String),
          __v: expect.any(Number),
        });
      });
  });
  test("400: should respond with Bad Request and error details if posting a user with invalid data ", () => {
    const invalidUser = {
      username: "x",
      goal: "",
      weight: "hello",
      height: "world",
      age: 30,
      sex: "M",
      calories: 0,
      admin: false,
      workouts: [],
    };
    return request(app)
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad Request");
        expect(body).toHaveProperty("details", expect.any(String));
      });
  });
});
