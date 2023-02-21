const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");

api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

test("Add a user to database", async () => {
  let newUser = {
    name: "Richard",
    username: "ric",
    password: "578",
  };
  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const users = await api.get("/api/users");
  expect(users.body.map((user) => user.name)).toContain("Richard");
});

test("Invalid username detected", async () => {
  let newUser = {
    name: "Richard",
    username: "ri",
    password: "578",
  };
  await api.post("/api/users").send(newUser).expect(400);
});

test("Invalid password detected", async () => {
  let newUser = {
    name: "Richard",
    username: "ric",
    password: "5",
  };
  await api.post("/api/users").send(newUser).expect(400);
});

test("Username must be unique", async () => {
  let newUser = {
    name: "Mike",
    username: "mike",
    password: "578",
  };
  await api.post("/api/users").send(newUser).expect(201);
  let newestUser = {
    name: "Michael",
    username: "mike",
    password: "999",
  };
  await api.post("/api/users").send(newestUser).expect(400);
});
