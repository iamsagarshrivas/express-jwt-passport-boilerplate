const http = require('http');
const { port, apiRoot, ip, mongo, seed, env } = require('./config');
const express = require('./middleware/express');
const mongoose = require('./middleware/mongoose');
const session = require('express-session');//require('./middleware/express-session');
const api = require('./api');

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

// if(seed){
//   require('./config/seed').seedDb();
// }

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
});

module.exports = app;