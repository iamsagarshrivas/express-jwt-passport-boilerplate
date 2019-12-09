var { UserModel, OTPModel } = require('../../models/index')
var { generateOTP } = require('../../services/util.service')
var bcrypt = require('bcrypt')
var jwt = require('../../middleware/jwt')

module.exports = {
	createNewUser: async ({ email, password }) => {
		try {
			let user = await UserModel.findOne({ email: email })
			if (user) {
				throw new Error('Email already exists');
			} else {
				var newUser = new UserModel({
					email,
					password
				})
				let result = await newUser.save();
				return result;
			}
		} catch (error) {
			throw error
		}
	},
	findUser: async ({ email, password }) => {
		try {
			let user = await UserModel.findOne({ email: email });
			if (!user) {
				throw new Error('User does not exists!');
			}
			else {
				let isMatched = await bcrypt.compare(password, user.password);
				if (isMatched) {
					const payload = {
						id: user._id,
						email: user.email,
					}
					let token = await jwt.sign(payload)
					if (token)
						return token;
				}
				else {
					throw new Error('Incorrect password');
				}

			}
		} catch (error) {
			throw error
		}
	},

	changePassword: async ({ email }) => {
		try {
			let user = await UserModel.findOne({ email: email });
			if (!user) {
				throw new Error('User does not exists!')
			} else {
				let otpExists = await OTPModel.findOne({ user_id: user._id });
				if (!otpExists) {
					let newOTP = new OTPModel({
						user_id: user._id,
						otp: generateOTP()
					})
					await newOTP.save()
					return user
				}
			}
		} catch (error) {
			throw error
		}
	},

	validateOTP: async ({ user_id, otp }) => {
		try {
			let otpObj = await OTPModel.findOne({ user_id: user_id });
			if (!otpObj) {
				throw new Error('OTP Expired!')
			} else {
				if (otpObj.otp === otp){
					await otpObj.remove()
					return true
				}
				else{
					return false
				}
			}
		} catch (error) {
			throw error
		}
	}
}