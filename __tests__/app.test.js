const app = require("../app");
const testUsers = require('../data/testData/testUsers')
const mongoose = require('mongoose');
const {seed} = require('../data/seed');
const request = require("supertest");

beforeAll(async () => {
    return seed(testUsers);
  });
  
  afterAll(() => {
    mongoose.connection.close();
  });