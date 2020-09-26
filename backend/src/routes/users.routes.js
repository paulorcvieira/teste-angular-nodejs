const express = require('express');
const routesUsers = express.Router();

const verifySession = require('../middlewares/ensureVerifyRefreshToken');
const isAuthenticate = require('../middlewares/ensureAuthenticated');

const UserController = require('../controller/UserController');

/*
 * POST /users
 * Purpose: Sign up
 */
routesUsers.post('/users', UserController.create);

/*
 * POST /login
 * Purpose: Login
 */
routesUsers.post('/login', UserController.login);

/**
 * GET /me/
 * Purpose: generates and returns an access token
 */
routesUsers.get('/me', verifySession, UserController.me);

// Only authenticated
routesUsers.use(isAuthenticate);

/*
 * GET /users
 * Purpose: List users with pagination
 */
routesUsers.get('/users', UserController.all);

/*
 * GET /user/:user_id
 * Purpose: List a specified user
 */
routesUsers.get('/user/:user_id', UserController.one);

/*
 * GET /search
 * Purpose: Search a specified user
 */
routesUsers.get('/search', UserController.search);

/*
 * GET /filter
 * Purpose: Filter users by name
 */
routesUsers.get('/filter', UserController.filter);

/*
 * PATCH /user/:user_id
 * Purpose: Update a specified user
 */
routesUsers.patch('/user/:userId', UserController.update);

/*
 * DELETE /user/:user_id
 * Purpose: Delete a specified user
 */
routesUsers.delete('/user/:user_id', UserController.delete);


module.exports = routesUsers;