const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String
  },

  email: {
    type: String
  },

  password: {
    type: String,
    min: [6],
    max: [10]
  },

  lastLogin: {
    type: Date
  }
});

UserSchema.pre("save", function(next) {
  var user = this; // new User(req.body);

  user.email = user.email.toLowerCase();

  // only hash the password if modified or a new user
  if (!user.isModified("password")) {
    return next();
  }

  // generate a salt value to encrypt our password
  bcrypt.genSalt(10, function(saltErr, salt) {
    if (saltErr) {
      console.error(saltErr);
      return next(saltErr);
    }
    console.info("SALT GENERATED", salt);

    // hashing this bad boy!
    bcrypt.hash(user.password, salt, function(hashErr, hashedPassword) {
      if (hashErr) {
        console.error(hashErr);
        return next(hashErr);
      }
      // override the plain text password with the hashed one.
      user.password = hashedPassword;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
