const { User } = require('../models/User');

const verifySession = (request, response, next) => {
  const refreshToken = request.header('x-refresh-token');
  const _id = request.header('_id');

  User.findByIdAndToken(_id, refreshToken).then((user) => {
    if (!user) {
      return Promise.reject({
        'error': 'User not found. Make sure that the refresh token and user id are valid'
      })
    }

    request.user_id = user._id;
    request.userObject = user;
    request.refreshToken = refreshToken;

    let isSessionValid = false;

    user.sessions.forEach((session) => {
        if (session.token === refreshToken) {
            // check if the session has expired
            if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                // refresh token has not expired
                isSessionValid = true;
            }
        }
    });

    if (isSessionValid) {
        next();
    } else {
        return Promise.reject({
            'error': 'Refresh token has expired or the session is invalid'
        })
    }
  }).catch((err) => {
    response.status(403).send(err);
  })
}

module.exports = verifySession;