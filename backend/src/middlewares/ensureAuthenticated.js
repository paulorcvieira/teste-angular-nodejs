const jwt = require('jsonwebtoken');

const { User } = require('../models/User');

const isAuthenticate = (request, response, next) => {
  const token = request.header('x-access-token');

  jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
    if (err) {
      response.status(401).send(err);
    } else {
      request.user_id = decoded._id;
      next();
    }
  });
}

module.exports = isAuthenticate;