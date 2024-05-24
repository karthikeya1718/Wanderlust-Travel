const mongoose = require("mongoose");
const schema = mongoose.Schema;
const passportlocalmongoose = require("passport-local-mongoose");

const userschema = new schema({
  email: {
    type: String,
    required: true,
  },
});

//! passport-local-mongoose will automatically generates a username and password without defining them in userschema.
userschema.plugin(passportlocalmongoose);

const User = mongoose.model("User", userschema);

module.exports = User;
