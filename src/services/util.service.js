var { URL } = require('../config/constants');
var request = require('request-promise')
module.exports = {
	randomURL:()=>{
		try{
			var randString = Math.random().toString(36).substring(2, 5) +"-"+ Math.random().toString(36).substring(2, 7);
			return randString;
		}
		catch(error){
			throw error
		}
	},
	externalAPIHit: async (link)=>{
		try{
			let response = await request({
				uri: 'http://api.linkpreview.net/',
				qs: {
					key: '5dc150edb9b6cba368424b735e1761bc78ea814268bc3',
					q: link
				}
			})
			return JSON.parse( response );
		}
		catch(error){
			if(error.statusCode){
				return null
			}
			throw error
		}
	},
	generateOTP: ()=>{
		return Math.floor(1000 + Math.random() * 9000).toString()
	}
}