const app = require("../app");
const testUsers = require("../data/testData/testUsers");
const testFeaturedWorkouts = require("../data/testData/testFeaturedWorkouts");
const mongoose = require("mongoose");
const { seed } = require("../data/seed");
const request = require("supertest");

beforeAll(async () => {
  return seed(testUsers, testFeaturedWorkouts);
});

afterAll(() => {
  mongoose.connection.close();
});

let user1Id = "";
let user2Id = "";
let user3Id = "";
let user4Id = "";

describe("USERS", () => {
  describe("GET /users", () => {
    test("200: should return an array of all users in the database", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;

          user1Id = users[0]._id;
          user2Id = users[1]._id;
          user3Id = users[2]._id;
          user4Id = users[3]._id;

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

  describe("GET /users/:_id", () => {
    test("200: should respond with the specified user object", () => {
      return request(app)
        .get(`/api/users/${user1Id}`)
        .expect(200)
        .then(({ body }) => {
          const { user } = body;
          expect(user._id).toBe(user1Id);
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
        .get("/api/users/abc123")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
    test("404: should respond Not Found if user does not exist", () => {
      return request(app)
        .get("/api/users/abc456789012345678901234")
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

  describe("PATCH/user/:_id", () => {
    test("200: should update the user object", () => {
      const propertyToUpdate = { calories: 2000 };
      return request(app)
        .patch(`/api/users/${user2Id}`)
        .send(propertyToUpdate)
        .expect(200)
        .then(({ body }) => {
          const { updatedUser } = body;
          expect(updatedUser._id).toBe(user2Id);
          expect(updatedUser.calories).toBe(2000);
        });
    });
    test("400: should respond with Bad Request if provided invalid data", () => {
      const invalidPropertyToUpdate = { calories: "abcd" };
      return request(app)
        .patch(`/api/users/${user3Id}`)
        .send(invalidPropertyToUpdate)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
          expect(body).toHaveProperty("details", expect.any(String));
        });
    });
    test("404: should respond Not Found if the user does not exist", () => {
      const propertyToUpdate = { calories: 1500 };
      return request(app)
        .patch(`/api/users/abc123456789012345678765`)
        .send(propertyToUpdate)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not Found");
        });
    });
  });

  describe("DELETE/users/:_id", () => {
    test("200: should delete the user from the database ", () => {
      return request(app)
        .delete(`/api/users/${user4Id}`)
        .expect(200)
        .then(({ body }) => {
          const { deletedUser } = body;
          expect(deletedUser._id).toBe(user4Id);
        });
    });
    test("400: should respond with bad request if given an invalid user id", () => {
      return request(app)
        .delete("/api/users/abc123")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
    test("404: should respond Not Found if the user does not exist", () => {
      return request(app)
        .delete("/api/users/abcd12345678901234567890")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not Found");
        });
    });
  });
});

let featuredWorkout1Id = "";

describe("FEATURED WORKOUTS", () => {
  describe("GET /featuredWorkouts", () => {
    test("200: should respond with an array of featured workouts", () => {
      return request(app)
        .get("/api/featuredWorkouts")
        .expect(200)
        .then(({ body }) => {
          const { featuredWorkouts } = body;

          featuredWorkout1Id = featuredWorkouts[0]._id;

          featuredWorkouts.forEach((workout) => {
            expect(workout).toHaveProperty("_id", expect.any(String));
            expect(workout).toHaveProperty("title", expect.any(String));
            expect(workout).toHaveProperty("author", expect.any(String));
            expect(workout).toHaveProperty("body", expect.any(Array));
            expect(workout).toHaveProperty("createdAt", expect.any(String));
            expect(workout).toHaveProperty("__v", expect.any(Number));
          });
        });
    });
  });

  describe("GET /featuredWorkouts/:id", () => {
    test("200: should respond with a specific featured workout", () => {
      return request(app)
        .get(`/api/featuredWorkouts/${featuredWorkout1Id}`)
        .expect(200)
        .then(({ body }) => {
          const { featuredWorkout } = body;
          expect(featuredWorkout._id).toBe(featuredWorkout1Id);
          expect(featuredWorkout.title).toBe("Workout 1");
          expect(featuredWorkout.body).toEqual(["Workout 1 description"]);
          expect(featuredWorkout.author).toBe("user1");
        });
    });
    test("400: should respond Bad Request if given invalid id", () => {
      return request(app)
        .get("/api/featuredWorkouts/abc1234")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
    test("404: should respond Not Found if featuredWorkout does not exist", () => {
      return request(app)
        .get("/api/featuredWorkouts/abcd12345678901234567890")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not Found");
        });
    });
  });

  describe("POST /featuredWorkouts", () => {
    test("201: should add a new featured workout to database", () => {
      const featuredWorkoutToAdd = {
        title: "Workout 6",
        createdAt: new Date().toString(),
        body: ["Workout 6 description"],
        author: "user7",
      };
      return request(app)
        .post("/api/featuredWorkouts")
        .send(featuredWorkoutToAdd)
        .expect(201)
        .then(({ body }) => {
          const { newFeaturedWorkout } = body;
          expect(newFeaturedWorkout).toMatchObject({
            ...featuredWorkoutToAdd,
            _id: expect.any(String),
            __v: expect.any(Number),
          });
        });
    });
    test("400: should respond with Bad Request and error details if posting a featured workout with invalid data ", () => {
      const invalidFeaturedWorkout = {
        title: 6,
        body: 12345,
        author: 12123,
      };
      return request(app)
        .post("/api/featuredWorkouts")
        .send(invalidFeaturedWorkout)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
          expect(body).toHaveProperty("details", expect.any(String));
        });
    });
  });
});
