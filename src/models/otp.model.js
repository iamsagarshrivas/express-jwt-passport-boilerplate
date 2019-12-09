var { Schema, model } = require('mongoose');

var otpSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: true
	},
	otp:{
		type: String,
		required: true
	}
},{
	timestamps: true
})

otpSchema.index({createdAt: 1},{expireAfterSeconds: 600});

module.exports = model('otp', otpSchema);

