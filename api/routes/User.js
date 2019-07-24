const express = require('express');

const User = require('../controllers/User');

const router = express.Router();

router.route('/users/:userId')
.get(User.getUser)
.put(User.updateUser)
.delete(User.deleteUser);

router.post('/users', User.createUser);

router.post('/users/login', User.userLogin);

module.exports = router;