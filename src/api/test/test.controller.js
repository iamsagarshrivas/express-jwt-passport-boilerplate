module.exports = {
	getSomeData: async (req, res)=>{
		res.json({aa:"aaa", user: req.user});
	}
}