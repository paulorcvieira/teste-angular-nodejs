const express = require('express');
const routesTasks = express.Router();

const isAuthenticate = require('../middlewares/ensureAuthenticated');

const TaskController = require('../controller/TaskController');

// Only authenticated
routesTasks.use(isAuthenticate);

/*
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list
 */
routesTasks.get('/lists/:listId/tasks', TaskController.all);

/*
 * GET /tasks
 * Purpose: Get all tasks of a specific user
 */
routesTasks.get('/tasks', TaskController.user);

/*
 * GET /lists/:listId/tasks
 * Purpose: Get a specific task
 */
routesTasks.get('/tasks/:taskId', TaskController.one);

/*
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in specific list
 */
routesTasks.post('/lists/:listId/tasks', TaskController.create);

/*
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update a specified task in list
 */
routesTasks.patch('/lists/:listId/tasks/:taskId', TaskController.update);

/*
 * DELETE /lists/:listId/tasks/tasks/:taskId
 * Purpose: Update a specified task
 */
routesTasks.delete('/lists/:listId/tasks/:taskId', TaskController.delete);

module.exports = routesTasks;