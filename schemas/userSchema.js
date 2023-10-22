const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
    username: {
      type: String,
      required: true,
    }
  });
  
  const User = mongoose.model("Users", userSchema);
  
  module.exports = { User };