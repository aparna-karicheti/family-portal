const User = require("../models/User");

const JWT = require('jsonwebtoken');

const jwtOptions = {
  secret: '@we$0MeP$oj3ct',
  expiresIn: "1d"
};

const bcrypt = require("bcryptjs");

module.exports = {
  createUser: (req, res) => {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    user
      .save()
      .then(newUser => {
        console.log("User saved");
        return res.json(newUser);
      })
      .catch(err => {
        console.log("There is an error!", err);
        return res.json(err);
      });
  },

  deleteUser: (req, res) => {
    User.findByIdAndDelete({
      _id: req.params.userId
    })
      .then(deletedUser => {
        console.log(deletedUser);
        return res.json({
          message: "User deleted successfully",
          user: deletedUser
        });
      })
      .catch(err => {
        console.log("There is an error!", err);
        return res.json(err);
      });
  },

  updateUser: (req, res) => {
    User.findByIdAndUpdate(
      {
        _id: req.params.userId
      },
      {
        $set: {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email
        }
      },
      {
        new: true
      }
    )
      .then(updatedUser => {
        console.log(updatedUser);
        return res.json({
          message: "User updated successfully",
          user: updatedUser
        });
      })
      .catch(err => {
        console.log("There is an error!", err);
        return res.json(err);
      });
  },

  getUser: (req, res) => {
    User.findById({
      _id: req.params.userId
    })
      .then(user => {
        console.log(user);
        return res.json(user);
      })
      .catch(err => {
        console.log("There is an error!", err);
        return res.json(err);
      });
  },

  userLogin: (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          console.log('No user found!');
          return res.status(404).json('No User Found');
        } else {
          bcrypt.compare(req.body.password, user.password, (compareErr, matched) => {
              if (compareErr) {
                console.log('compareErr error:', compareErr);
                return res.json(compareErr);
              } else if (!matched) {
                console.log('Password mismatch!');
                return res.status(401).json('Invalid username or password');
              } else {
                user.lastLogin = Date.now();
                user
                  .save()
                  .then(savedUser => {
                    let authenticatedUser = savedUser.toObject();

                    delete authenticatedUser.password;

                    let jwtToken = JWT.sign({user: authenticatedUser._id}, jwtOptions.secret, {
                      expiresIn: jwtOptions.expiresIn
                    });

                    let loggedInUser = { user: authenticatedUser, token: jwtToken };

                    console.log('Login success!', loggedInUser);        

                    return res.json(loggedInUser);
                  })
                  .catch(err => {
                    console.log('There was error logging in!', err);
                    return res.json(err);
                  });
              }
            }
          );
        }
      });
  },
};
