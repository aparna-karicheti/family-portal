const User = require('../models/User');

const Resident = require('../models/Resident');

const Family = require('../models/Family');

const JWT = require('jsonwebtoken');

const jwtOptions = {
  secret: '@we$0MeP$oj3ct',
  expiresIn: '1d'
};

const bcrypt = require('bcryptjs');

const async = require('async');

module.exports = {
  createUser: (req, res) => {
    async.waterfall([createUser, createProfile], (err, results) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }

      return res.json(results);
    });

    function createUser(next) {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      user
        .save()
        .then(newUser => {
          console.log('User saved');
          return next(null, newUser);
        })
        .catch(err => {
          console.log('There is an error!', err);
          return next(null, err);
        });
    }

    function createProfile(newUser, next) {
      switch (newUser.role) {
        default:
          let resident = new Resident({
            name: newUser.name,
            userId: newUser._id,
            address: req.body.address
          });

          resident
            .save()
            .then(newResident => {
              console.log(newResident);
              return next(null, newResident);
            })
            .catch(err => {
              console.log(err);
              return next(null, err);
            });

          break;

        case 'Family Member':
          let family = new Family({
            name: req.body.name,
            resident: req.body.residentId,
            address: req.body.address,
            relationship: req.body.relationship
          });

          family
            .save()
            .then(newFamily => {
              // Update resident with familymembers ID
              Resident.findByIdAndUpdate(
                {
                  _id: req.body.residentId
                },
                {
                  $push: {
                    familyMembers: newFamily._id
                  }
                }
              )
                .then(updatedResident => {
                  console.log('New family was saved and resident updated!');

                  return res.json(newFamily);
                })

                .catch(err => {
                  return next(null, err);
                });
            })
            .catch(err => {
              console.log(err);
              return res.json(err);
            });

          break;
      }
    }
  },

  deleteUser: (req, res) => {
    User.findByIdAndDelete({
      _id: req.params.userId
    })
      .then(deletedUser => {
        console.log(deletedUser);
        return res.json({
          message: 'User deleted successfully',
          user: deletedUser
        });
      })
      .catch(err => {
        console.log('There is an error!', err);
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
          message: 'User updated successfully',
          user: updatedUser
        });
      })
      .catch(err => {
        console.log('There is an error!', err);
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
        console.log('There is an error!', err);
        return res.json(err);
      });
  },

  userLogin: (req, res) => {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (!user) {
        console.log('No user found!');
        return res.status(404).json('No User Found');
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          (compareErr, matched) => {
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

                  let jwtToken = JWT.sign(
                    { user: authenticatedUser._id },
                    jwtOptions.secret,
                    {
                      expiresIn: jwtOptions.expiresIn
                    }
                  );

                  let loggedInUser = {
                    user: authenticatedUser,
                    token: jwtToken
                  };

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
  }
};