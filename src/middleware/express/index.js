const express = require('express')
const forceSSL = require('express-force-ssl')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session');
const { errorHandler: queryErrorHandler } = require('querymen')
const { errorHandler: bodyErrorHandler } = require('bodymen')
const { env, uploadPath } = require('../../config')
const fileUpload = require('express-fileupload')

module.exports = (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true
    })
    app.use(forceSSL)
  }

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }
  app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
