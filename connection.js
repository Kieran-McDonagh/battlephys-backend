const ENV = process.env.NODE_ENV || "development";
require("dotenv").config();
const uri =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

module.exports = uri;
