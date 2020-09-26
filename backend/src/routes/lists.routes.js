const express = require('express');
const routesLists = express.Router();

const isAuthenticate = require('../middlewares/ensureAuthenticated');

const ListController = require('../controller/ListController');

// Only authenticated
routesLists.use(isAuthenticate);

/*
 * GET /list
 * Purpose: Get all list
 */
routesLists.get('/lists', ListController.all);

/*
 * POST /list
 * Purpose: Create a list
 */
routesLists.post('/lists', ListController.create);

/*
 * PATCH /list/:id
 * Purpose: Update a specified list
 */
routesLists.patch('/lists/:id', ListController.update);

/*
 * DELETE /lists/:listId
 * Purpose: Delete a list
 */
routesLists.delete('/lists/:listId', ListController.delete);

module.exports = routesLists;