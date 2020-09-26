const express = require('express');
const routes = express();

const usersRoutes = require('./users.routes');
const listsRoutes = require('./lists.routes');
const tasksRoutes = require('./tasks.routes');

routes.use('/', usersRoutes);
routes.use('/', listsRoutes);
routes.use('/', tasksRoutes);

module.exports = routes;