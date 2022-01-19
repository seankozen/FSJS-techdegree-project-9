let express = require('express');
let router = express.Router();
const { User, Course } = require('../models');
const Sequelize = require('sequelize');
const user = require('../models/user');
const { authenticateUser } = require('../middleware/auth-user');

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


// Get all courses and the users associated with them 
router.get("/", asyncHandler( async (req, res) => {
	const courses = await Course.findAll({
        attributes: {exclude: ['createdAt', 'updateAt']},
		include: [
			{
				model: User,
				attributes: ['firstName', 'lastName', 'emailAddress'],
			}
		]
	});
	res.json({courses}).status(200);  
}));

// Gets specific course with the associated user
router.get('/:id', asyncHandler( async(req, res) => {
	const course = await Course.findByPk(req.params.id, {
		attributes: {exclude: ['createdAt', 'updateAt']},
		include: [
			{
				model: User,
				attributes: ['firstName', 'lastName', 'emailAddress'],
			}
		]
	});

	if (course) {
		res.status(200).json({course});
	} else {
		res.status(404).json({message: "Course does not exist."})
	}
}));


// Create new course with user authentication
router.post('/:id', authenticateUser, asyncHandler( async(req, res) => {
	try {
		const user = req.currentUser;
		const course = await Course.findByPk(req.params.id);

	} catch (error) {



	}

}));

// Updates a course and includes user authentication  
router.put('/:id', authenticateUser, asyncHandler( async(req, res) => {
	try {
		

	} catch (error) {



	}

}));

// Deletes a course and includes user authentication  
router.delete('/:id', authenticateUser, asyncHandler( async(req, res) => {
	

}));


module.exports = router;