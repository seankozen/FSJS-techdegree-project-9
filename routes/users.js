let express = require('express');
let router = express.Router();
const { User } = require('../models');
const Sequelize = require('sequelize');




function asyncHandler(cb){
	return async(req, res, next) => {
		try {
			await cb(req, res, next)
		} catch(error){
			res.status(500).send(error);       
		}
	}
}

// setup a friendly greeting for the root route
/* router.get('/', (req, res) => {
	res.json({
	  message: 'Welcome to the REST API project! Users Route.',
	});
  });
 */
 
 
router.get("/", asyncHandler( async (req, res) => {
	let users = await User.findAll({
		attributes: [
			'firstName',
			'lastName',
			'emailAddress',
			'password'
		]	
	});
	res.json({users});  

}));

router.post("/", asyncHandler( async (req, res) => {
	try {
		await User.create(req.body);
		res.status(201).json({ "message": "Account successfully created."}).end();
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