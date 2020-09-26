const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('./database/mongoose');


/* MIDDLEWARE */

server.use(cors());
server.use(bodyParser.json());

server.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  response.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );

  next();
});

const routes = require('./routes');
server.use('/', routes);



server. listen(3333, () => {
  console.log('Server is listening on port 3333');
});
