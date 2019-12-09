var router = require('express').Router();
var { getSomeData } = require('./test.controller');

router.get('/somedata', getSomeData)

module.exports = router;