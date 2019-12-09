var { createNewUser, findUser, changePassword, validateOTP } = require("./user.service");
module.exports = {
	login: async ({ body }, res) => {
		try {
			var token = await findUser(body)
			if (token) {
				res.json({
					error: false,
					token: `${token}`
				})
			}
		} catch (error) {
			console.log('error:', error);
			res.json({
				error: true,
				message: error.toString() || "Something went wrong"
			})
		}
	},

	signup: async ({ body }, res) => {
		try {
			let result = await createNewUser(body);
			res.json({
				error: false,
				result
			})
		} catch (error) {
			res.json({
				error: true,
				message: error.toString() || "Something went wrong"
			})
		}
	},

	forgotPassword: async ({ body }, res) => {
		try {
			var result = await changePassword(body);
			if(result._id){
				res.json({
					error: false,
					user_id: result._id
				})
			}
			else{
				throw new Error();
			}
		} catch (error) {
			res.json({
				error: true,
				message: error.toString() ||"Something went wrong"
			})
		}
	},
	
	validateOTP: async ({ body }, res) =>{
		try {
			// res.json(body);
			let verified = await validateOTP(body);
			if(!verified){
				throw new Error('OTP not valid')
			}
			else{
				res.json({
					error: false,
					message: 'OTP verified'
				})
			}
		} catch (error) {
			res.json({
				error: true,
				message: error.toString() ||"Something went wrong"
			})			
		}
	}
}