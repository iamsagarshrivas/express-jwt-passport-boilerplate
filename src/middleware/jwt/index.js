var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var { jwtSecret } = require('../../config');

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

module.exports = {

	sign: ({id, email}, options, method = jwtSign) =>
		method({ id, email }, jwtSecret, { expiresIn: 3600 * 5 }),

	signSync: (id, options) => sign(id, options, jwt.sign),

	verify: (token) => jwtVerify(token, jwtSecret)
}
