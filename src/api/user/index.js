var router = require('express').Router();
var { forgotPassword, login, signup, validateOTP } = require('./user.controller')
var { middleware: body } = require('bodymen');

router.post('/login', body({ email: { type: String, required: true }, password: { type: String, required: true } }), login)
router.post('/signup', body({ email: { type: String, required: true }, password: { type: String, required: true } }), signup)
router.post('/forgot-password', body({ email: { type: String, required: true } }), forgotPassword)
router.post('/validate-otp', body({ user_id: { type: String, required: true }, otp:{ type:String, required: true} }), validateOTP)

module.exports = router;