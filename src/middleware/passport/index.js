const passport = require('passport');
const { Schema } = require('bodymen');
const { BasicStrategy } = require('passport-http');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { jwtSecret, masterKey } = require('../../config');
const { UserModel } = require('../../models');
// const { userSchema } = require('../../models/user.model')

passport.use('password', new BasicStrategy((email, password, done) => {
	const userSchema = new Schema({ email: schema.tree.email, password: schema.tree.password })

	userSchema.validate({ email, password }, (err) => {
		if (err) done(err)
	})

	UserModel.findOne({ email: email, isActive: true }).populate('role').then((user) => {
		if (!user) {
			done(true)
			return null
		}
		return user.authenticate(password, user.password).then((user) => {
			done(null, user)
			return null
		}).catch(done)
	})
}))

passport.use('master', new BearerStrategy((token, done) => {
	if (token === masterKey) {
		done(null, {})
	} else {
		done(null, false)
	}
}))

passport.use('token', new JwtStrategy({
	secretOrKey: jwtSecret,
	jwtFromRequest: ExtractJwt.fromExtractors([
		ExtractJwt.fromUrlQueryParameter('access_token'),
		ExtractJwt.fromBodyField('access_token'),
		ExtractJwt.fromAuthHeaderWithScheme('Bearer')
	])
}, ({ id }, done) => {
	UserModel.findById(id).then((user) => {
		done(null, user)
		return null
	}).catch(done)
}))

module.exports = {
	password: () => (req, res, next) =>
		passport.authenticate('password', { session: false }, (err, user, info) => {
			if (err && err.param) {
				return res.status(400).json(err)
			} else if (err || !user) {
				return res.status(200).json({ success: false, message: 'Invalid user details.' })
			}
			req.logIn(user, { session: false }, (err) => {
				if (err) return res.status(401).end()
				next()
			})
		})(req, res, next),

	master: () =>
		passport.authenticate('master', { session: false }),

	token: ({ required, roles = UserModel.roles } = {}) => (req, res, next) =>
		passport.authenticate('token', { session: false }, (err, user, info) => {
			if (err || (required && !user)) {
				return res.status(401).end()
			}
			req.logIn(user, { session: false }, (err) => {
				if (err) return res.status(401).end()
				next()
			})
		})(req, res, next)
}