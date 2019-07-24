const UserRoutes = require('../routes/User');

const express = require('express');

const routes = express.Router();

routes.use(UserRoutes);

module.exports = routes;