var router = require('express').Router();
var user = require('./user');
var test = require('./test');
var { token } = require('../middleware/passport')

router.get('/',(req,res)=>res.send('hello world'))
router.use('/api/auth',user);
router.use('/api/test',token({required: false}), test)
module.exports = router;