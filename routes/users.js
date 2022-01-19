let express = require('express');
let router = express.Router();
const { User } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');


const Sequelize = require('sequelize');

// Async handler for routes
function asyncHandler(cb){
	return async(req, res, next) => {
		try {
			await cb(req, res, next)
		} catch(error){
			res.status(500).send(error);       
		}
	}
}

// Get authenticated user  
router.get("/", authenticateUser, asyncHandler( async (req, res) => {
	const user = req.currentUser;
	res.status(200);
	res.json({
		firstName: user.firstName,
		lastName: user.lastName,
		emailAddress: user.emailAddress
	});
}));

// Create a new user
router.post("/", asyncHandler( async (req, res) => {
	try {
		await User.create(req.body);
		res.status(201).location("/").json({ "message": "Account successfully created."}).end();
		
	} catch (error) {
		console.log('Error:', error.name)
		if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
			const errors = error.errors.map( err => err.message);
			res.status(400).json({errors});	
		} else {
			throw error;
		}
	}
}));




module.exports = router;